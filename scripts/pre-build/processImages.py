#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Resize images and copy them to the static folder
"""

import os, sys
import json
import shutil
from PIL import Image
import numpy as np
import urllib.parse
# for getting dominany color
# from colorthief import ColorThief

IMAGECUTOFF = 100


try:
  os.makedirs('artworks-json')
except FileExistsError:
  pass


# PARSE IMAGES

root = 'artworks'
filetypes = ['png', 'jpg', 'jpeg', 'webp']

images = {}

imagecounter = {}

for path, subdirs, files in os.walk(root):
  for name in files:
    ending = name.split(".")[-1]
    if not ending in filetypes:
      continue
    cat = path.split("/")[1]
    img_path = os.path.join(path, name)
    mod_date = int(os.path.getmtime(img_path))
    try:
      images[cat].append( (img_path, mod_date) )
    except:
      images[cat] = [ (img_path, mod_date) ]


for cat in images.keys():
  # sort by modification date
  images[cat].sort(key=lambda x: int(x[1]), reverse=True)

  # only process the latest x = IMAGECUTOFF images for each category
  if IMAGECUTOFF and cat != 'redteam':
    images[cat] = images[cat][0:IMAGECUTOFF]

  outfile = f'artworks-json/{cat}.json'
  with open(outfile, 'w') as f:
    json.dump(images[cat], f)
    print(f"({len(images[cat])})\t{cat}: {outfile}")


# special processing for the latest images (because there is no folder for them)
# get latest 50 images
latest = []
for cat in images.keys():
  for img in images[cat]:
    if cat == 'redteam': continue
    latest.append(img)
latest.sort(key=lambda x: int(x[1]), reverse=True)
latest = latest[0:49]
with open(f'artworks-json/latest.json', 'w') as f:
  json.dump(latest, f)



def rgb_to_hex(r, g, b):
  return ('{:X}{:X}{:X}').format(r, g, b)


# PROCESS IMAGES

root = 'artworks-json'
filetypes = ['json']
# output goes to the astro publicDir (./static), NOT the build output (./public):
# ./public is emptied on every astro build, and `make publish` syncs the artworks
# straight from ./static so their timestamps stay stable for `aws s3 sync`
outroot = 'static'
chunkspath = 'static/artworks/json'

try:
  os.makedirs(chunkspath)
except FileExistsError:
  pass


def dump_if_changed(obj, jsonpath):
  # keep the mtime stable when the content did not change
  serialized = json.dumps(obj)
  try:
    with open(jsonpath, 'r') as f:
      if f.read() == serialized:
        return
  except OSError:
    pass
  with open(jsonpath, 'w') as f:
    f.write(serialized)


# entries from the previous run, keyed by url, so unchanged images
# do not have to be opened and measured again
manifest_cache = {}
if os.path.isdir(chunkspath):
  for fname in os.listdir(chunkspath):
    if not fname.endswith('.json'):
      continue
    try:
      olddata = json.load(open(os.path.join(chunkspath, fname), 'r'))
    except (OSError, json.JSONDecodeError):
      continue
    if isinstance(olddata, dict):
      olddata = olddata.get('items', [])
    for entry in olddata:
      if isinstance(entry, list) and len(entry) == 4:
        manifest_cache[entry[0]] = tuple(entry)



for path, subdirs, files in os.walk(root):
  imagecounter = 0
  for name in files:
    jsonfile = os.path.join(path, name)
    imgs = json.load(open(jsonfile, 'r'))
    convertedimgs = []
    for info in imgs:
      imgpath = info[0]

      if name == 'latest.json':
        cat = 'latest'
      else:
        cat = imgpath.split('/')[1]

      outpath = os.path.join(outroot, imgpath)

      webpoutpath = outpath.split('.')
      webpoutpath[-1] = "webp"
      webpoutpath = ".".join(webpoutpath)

      # remove 'static/' from output path and encode e.g. spaces and hashtags
      url = "https://www.jonaso.de/" + "/".join(urllib.parse.quote(webpoutpath).split('/')[1:])

      # cache check - skip images that were already resized and measured
      if os.path.isfile(webpoutpath) and url in manifest_cache:
        convertedimgs.append(manifest_cache[url])
        continue

      im = Image.open(imgpath)

      # resize with aspect ratio
      w, h = im.size
      ar = w/h

      width = 400
      height = int(400/ar)

      try:
        average_color_row = np.average(im, axis=0)
        average_color = np.average(average_color_row, axis=0)
        average_color = [ int(x) for x in average_color ]
        average_color = "#" + rgb_to_hex(average_color[0], average_color[1], average_color[2])
      except:
        average_color = "#" + rgb_to_hex(222, 222, 222)

      # skip the resize if the file already exists
      if not os.path.isfile(webpoutpath):
        im400 = im.resize((width,height))
        try:
          os.makedirs(os.path.dirname(outpath))
        except FileExistsError:
          pass
        im400.save(webpoutpath, "webp")
        print(webpoutpath)

      converted = (url, width, height, average_color)
      manifest_cache[url] = converted
      convertedimgs.append(converted)

    # write json with webp
    dump_if_changed(convertedimgs, os.path.join(outroot, 'artworks', 'json',  f'webp-{cat}.json'))

    chunksize = 100
    chunks = [convertedimgs[x:x+100] for x in range(0, len(convertedimgs), 100)]
    total = len(convertedimgs)

    k = 0
    for batch in chunks:
      # detect last iteration
      outbatch = {
        'total': total,
        'items': batch,
      }
      if k == len(chunks) - 1:
        outbatch['next'] = False
      else:
        outbatch['next'] = k+1
      dump_if_changed(outbatch, os.path.join(chunkspath, f'webp-{cat}-{k}.json'))
      k += 1


shutil.rmtree('artworks-json', ignore_errors=True)


