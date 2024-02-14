#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os, sys

# from langchain.text_splitter import CharacterTextSplitter
from tqdm import tqdm
import textract
import hashlib
from fnmatch import fnmatch

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]

# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'


BASEPATHS = [
    "/home/jonas/RESEARCH/Literatur/",
    "/home/jonas/RESEARCH/2-OULU/Courses/",
    "/home/jonas/RESEARCH/2-OULU/Funding/",
    "/home/jonas/RESEARCH/Academic Working/",
    "/home/jonas/RESEARCH/Misc/",
    "/home/jonas/RESEARCH/Papers/7-Accepted/",
    "/home/jonas/RESEARCH/Papers/9-Others/",
]
# PATTERN = "[\!|\-]*.pdf"



priorities = {
    '1': 0,
    '2': 0,
    '3': 0,
}


# pre-walk directories
# total_dirs = sum(1 for _, _, _ in os.walk(root, followlinks=False))
total_files = 0
for root in BASEPATHS:
    total_files += sum(len([ f for f in files if f.endswith('.pdf') ]) for _, _, files in os.walk(root, followlinks=False))
print(f"{total_files} papers")
pbar = tqdm(total=total_files)


for root in BASEPATHS:
  for path, subdirs, files in os.walk(root, followlinks=False):
    for name in files:
      fullpath = os.path.join(path, name)

      if not name.endswith('.pdf'):
        continue

      # skip symlinks
      if os.path.islink(fullpath):
        pbar.update(1)
        continue

      # if not fnmatch(name, PATTERN):
      #   pbar.update(1)
      #   continue

      if not name.startswith('!'):
        pbar.update(1)
        continue

      # calculate the priority rating
      priority = 0 if name.startswith('-') else 1
      priority_prefix = ''
      if priority == 0:
        priority_prefix = "-"
      if priority > 0:
        priority = len(name) - len(name.lstrip('!'))
        if priority > 3: priority = 3
        priority_prefix = "!" * priority

      priorities[str(priority)] += 1

      sha1 = hashlib.sha1()
      sha1.update(fullpath.encode('utf-8'))
      thehash = sha1.hexdigest()

      # cache check
      cachepath = f'./text/{priority_prefix}{thehash}.txt'
      if os.path.exists(cachepath):
        pbar.update(1)
        continue

      full_text = textract.process(fullpath)

      full_text = full_text.decode('utf-8')
      full_text = full_text.replace("\\n", "\n")

      # remove references section
      last_index = full_text.lower().rfind('references')
      if last_index != -1: text = full_text[:last_index]
      else: text = full_text

      with open(cachepath, 'w') as f:
        f.write(text)

      pbar.update(1)

pbar.close()

print('Priorities:', priorities)
