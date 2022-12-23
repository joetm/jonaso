#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Resize images and copy them to the static folder
"""

import os, sys
import json
from PIL import Image
# for getting dominany color
# from colorthief import ColorThief


try:
  os.makedirs('artworks-json')
except FileExistsError:
  pass


# PARSE IMAGES

root = 'artworks'
filetypes = ['png', 'jpg', 'jpeg', 'webp']

images = {}

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
  #   # sort by modification date
  images[cat].sort(key=lambda x: int(x[1]), reverse=True)
  outfile = f'artworks-json/{cat}.json'
  with open(outfile, 'w') as f:
    json.dump(images[cat], f)
    print(f"({len(images[cat])})\t{cat}: {outfile}")


# get latest 50 images
latest = []
for cat in images.keys():
  for img in images[cat]:
    latest.append(img)
latest.sort(key=lambda x: int(x[1]), reverse=True)
latest = latest[0:49]
with open(f'artworks-json/latest.json', 'w') as f:
  json.dump(latest, f)



# PROCESS IMAGES

root = 'artworks-json'
filetypes = ['json']

outroot = 'public'

for path, subdirs, files in os.walk(root):
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

      # very slow!
      # color_thief = ColorThief(imgpath)
      # # get the dominant color
      # dominant_color = color_thief.get_color(quality=1)

      # resize with aspect ratio
      w, h = im.size
      ar = w/h

      width = 400
      height = int(400/ar)

      # cache check - skip if file already exists
      if not os.path.isfile(webpoutpath):
        im400 = im.resize((width,height))
        try:
          os.makedirs(os.path.dirname(outpath))
        except FileExistsError:
          pass
        im400.save(webpoutpath, "webp")
      print(webpoutpath)

      # remove 'public/' from output path
      webpoutpath = webpoutpath.split('/')[1:]
      webpoutpath = "https://www.jonaso.de/" + "/".join(webpoutpath)

      convertedimgs.append((webpoutpath, width, height))

    # write json with webp
    json.dump(convertedimgs, open(os.path.join(outroot, 'artworks',  f'webp-{cat}.json'), 'w'))
