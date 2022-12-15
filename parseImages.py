#!/usr/bin/env python3

import os, sys
import json

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
    mod_date = os.path.getmtime(img_path)
    try:
      images[cat] = [img_path, mod_date]
    except:
      images[cat].append( [img_path, mod_date] )

for cat in images.keys():
  print(images[cat])
  # sort by modification date
  images[cat].sort(key=lambda x: int(x[1]), reverse=True)
  sys.exit()
  # drop the dates
  images[cat] = [ x[0] for x in images[cat] ]

  print(f"{cat}: {len(images[cat])} artworks")

  outfile = f'artworks/json/{cat}.json'
  with open(outfile, 'w') as f:
    json.dump(images, f)
    print(f"Written {outfile}.")


