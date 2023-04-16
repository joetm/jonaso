#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os
import sys
from fnmatch import fnmatch
import libs.anotations.pdfannots as pdfannots

# the folders to search for
BASEPATHS = [
#    "/home/jonas/RESEARCH/Literatur/",
#    "/home/jonas/RESEARCH/2-OULU/Courses/",
#    "/home/jonas/RESEARCH/2-OULU/Funding/",
#    "/home/jonas/RESEARCH/Academic Working/",
#    "/home/jonas/RESEARCH/Misc/",
#    "/home/jonas/RESEARCH/Papers/7-Accepted/",
    "/home/jonas/RESEARCH/Papers/9-Others/",
]
PATTERN = "[\!|\-]*.pdf"


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
documents = []

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
        print(name)

        with open(fullpath, 'rb') as f:
          doc = pdfannots.process_file(f)
          remove_hyphens = False
          annots = [annot_to_dict(doc, a, remove_hyphens) for a in doc.iter_annots()]
          print(annots)


