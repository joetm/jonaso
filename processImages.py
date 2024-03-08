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
outroot = 'public'
chunkspath = 'public/artworks/json'

try:
  os.makedirs(chunkspath)
except FileExistsError:
  pass



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

      # cache check - skip if file already exists
      if not os.path.isfile(webpoutpath):
        im400 = im.resize((width,height))
        try:
          os.makedirs(os.path.dirname(outpath))
        except FileExistsError:
          pass
        im400.save(webpoutpath, "webp")

      # encode e.g. spaces and hashtags in filename
      webpoutpath = urllib.parse.quote(webpoutpath)
      print(webpoutpath)

      # remove 'public/' from output path
      webpoutpath = webpoutpath.split('/')[1:]
      # encode e.g. hashtags and spaces
      webpoutpath = "https://www.jonaso.de/" + "/".join(webpoutpath)

      convertedimgs.append((webpoutpath, width, height, average_color))

    # write json with webp
    json.dump(convertedimgs, open(os.path.join(outroot, 'artworks', 'json',  f'webp-{cat}.json'), 'w'))

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
      json.dump(outbatch, open(os.path.join(chunkspath, f'webp-{cat}-{k}.json'), 'w'))
      k += 1


shutil.rmtree('artworks-json', ignore_errors=True)


