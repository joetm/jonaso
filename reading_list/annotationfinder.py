#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os
import sys
import time
import json
import shutil
import sqlite3
import hashlib
import subprocess
from fnmatch import fnmatch
import libs.anotations.pdfannots as pdfannots


annotationsTODOfile = 'annotations-todo.txt'

# the folders to search for
BASEPATHS = [
    "/home/jonas/RESEARCH/Literatur/",
    "/home/jonas/RESEARCH/2-OULU/Courses/",
    "/home/jonas/RESEARCH/2-OULU/Funding/",
    "/home/jonas/RESEARCH/Academic Working/",
    "/home/jonas/RESEARCH/Misc/",
    "/home/jonas/RESEARCH/Papers/7-Accepted/",
     "/home/jonas/RESEARCH/Papers/9-Others/",
]

# both - and !
# PATTERN = "[\!|\-]*.pdf"
# only !
PATTERN = "[\!]*.pdf"


# BUF_SIZE is totally arbitrary
# read stuff in 64kb chunks -> 65536
BUF_SIZE = 131072


# caching
conn = sqlite3.connect('annotations.db')
c = conn.cursor()
# check if this is the first run
c.execute(''' SELECT count(name) FROM sqlite_master WHERE type='table' AND name='documents' ''')
#if the count is 1, then table exists
if c.fetchone()[0] != 1:
  # first-time setup
  c.execute('''CREATE TABLE documents (hash text PRIMARY KEY, parse_date integer, num text, filepath text)''')
  conn.commit()
  # -----------------


# reset output file
open(annotationsTODOfile, 'w').close()


def annot_to_dict(
    doc,
    annot,
    remove_hyphens: bool
):
    """Convert an annotation to a dictionary representation suitable for JSON encoding."""
    assert annot.pos
    result = {
        "type": annot.subtype.name,
        "page": annot.pos.page.pageno + 1,
        "start_xy": (annot.pos.x, annot.pos.y),
    }
    outline = doc.nearest_outline(annot.pos)
    if outline:
        result["prior_outline"] = outline.title
    if annot.text:
        result['text'] = annot.gettext(remove_hyphens)
    if annot.contents:
        result['contents'] = annot.contents
    if annot.author:
        result['author'] = annot.author
    if annot.created:
        result['created'] = annot.created.strftime('%Y-%m-%dT%H:%M:%S')
    return result



# read list
unannotated_documents = []

counter = 0
unrecognizedCounter = 0


for root in BASEPATHS:
  print(root)
  print("===")
  for path, subdirs, files in os.walk(root, followlinks=False):
    for name in files:
      fullpath = os.path.join(path, name)
      # skip symlinks
      if os.path.islink(fullpath):
        continue

      if fnmatch(name, PATTERN):
        counter = counter + 1

        # calculate hash
        sha1 = hashlib.sha1()
        with open(fullpath, 'rb') as f:
            while True:
                data = f.read(BUF_SIZE)
                if not data:
                    break
                # md5.update(data)
                sha1.update(data)
        # print("SHA1: {0}".format(sha1.hexdigest()))
        thehash = sha1.hexdigest()

        # check cache
        # c.execute('SELECT * FROM documents WHERE hash=? AND filepath=?', (thehash, fullpath))
        c.execute('SELECT * FROM documents WHERE hash=?', (thehash,))
        res = c.fetchone()
        # is cached?
        if res != None:
          print (f"{counter}: cache hit: {name}")
          # continue
          numannots = int(res[2])
          if not numannots:
            annots = []
          else:
            annots = ['P'] * numannots # just some fake data to indificate the number of annotations
        else:
          # don't run this on all pages, just the first 5 pages
          tmpfile = './tmp.pdf'
          CUTOFF = 5
          shutil.copy(fullpath, tmpfile)

          try:
            numpages = subprocess.check_output(['qpdf', '--show-npages', tmpfile], stderr=subprocess.STDOUT)
            numpages = int(numpages.strip())
            if numpages and numpages > CUTOFF:
              # fallback (1)
              try:
                subprocess.run(["pdftk", fullpath, "cat", f"1-{CUTOFF}", "output", tmpfile], stderr=subprocess.STDOUT)
              except subprocess.CalledProcessError as e:
                # fallback (2)
                print(f"pdftk error: {e.output}")
                shutil.copy(fullpath, tmpfile)
          except subprocess.CalledProcessError as e:
            print(f"qpdf error: {e.output}")

          with open(tmpfile, 'rb') as f:
            try:
              doc = pdfannots.process_file(f)
              remove_hyphens = False
              annots = [annot_to_dict(doc, a, remove_hyphens) for a in doc.iter_annots()]
            except AssertionError:
              annots = []

          # save cache
          c.execute("INSERT INTO documents VALUES (?,?,?,?)", (thehash, int(time.time()), len(annots), fullpath))
          conn.commit()

        if len(annots):
          print(f"{counter}: {name}: FOUND")
        if annots == []:
          print(f"{counter}: {name}: 404!")
          unannotated_documents.append(fullpath)
          with open(annotationsTODOfile, 'a') as annoutout:
            annoutout.write(f"{fullpath}\n")


print("===")
print(f"Done. {len(unannotated_documents)} unannotated documents")

# OUTPUT = 'Unannotated Documents\n===\n' + '\n'.join(unannotated_documents)
# OUTPUT = '\n'.join(unannotated_documents)

conn.close()
