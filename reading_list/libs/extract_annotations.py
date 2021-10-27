#!/usr/bin/python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4
"""
    ===========
    Annotation extraction tool
    Takes filename as argument.
    Extracts the annotations in json format
    and stores them into the same directory.
    ===========
"""

import os.path
import json
import sys
import copy

from PyPDF2 import PdfFileReader


def extract_annotations(filename):

    # see:
    # http://stackoverflow.com/a/13748949/426266
    path = os.path.realpath('%s' % filename)


    doc = PdfFileReader(open(path, "rb"))

    # docInfo = doc.getDocumentInfo()

    annotations = []

    nPages = doc.getNumPages()

    # {'/C': [1, 1, 0], '/F': 4, '/M': "D:20211027095158+03'00'", '/P': IndirectObject(16, 0), '/T': 'jonas', '/AP': {'/N': IndirectObject(275, 0)}, '/NM': 'ee5655bf-c3a4-4c4e-8b51c658f659019c', '/Rect': [171.94587, 462.18182, 245.49779, 470.55646], '/Subj': 'Highlight', '/Subtype': '/Highlight', '/Contents': ' contributing factor', '/QuadPoints': [173.60804, 470.55645, 243.83562, 470.55645, 173.60804, 462.18183, 243.83562, 462.18183], '/CreationDate': "D:20211027095158+03'00'"}

    # process annotations
    for i in range(nPages) :
        page0 = doc.getPage(i)
        try :
            for annot in page0['/Annots']:
                subtype = annot.getObject()['/Subtype']
                if subtype == "/Highlight":
                    highlight = annot.getObject()['/Contents']
                    # some annotations are bytes, some are just strings
                    if isinstance(highlight, bytes):
                        highlight = highlight.decode("utf-8")
                    # clean string
                    highlight = highlight.replace("\n", " ").replace("\r", " ").replace("  ", " ").strip()
                    # skip empty annotations
                    if highlight:
                    # print(highlight)
                        annotations.append(highlight)
                # filter out empty annotations
                # if it['/AP']['/Subj'] == 'Highlight':
                #     print('')
        except Exception:
            # there are no annotations on this page
            pass


    print(json.dumps(annotations))
        # skipkeys=False,
        # ensure_ascii=True,
        # check_circular=True,
        # allow_nan=True,
        # cls=None,
        # indent=4,
        # separators=None,
        # encoding="utf-8",
        # default=None,
        # sort_keys=True



if __name__ == "__main__":

    # if len(sys.argv) != 2:
    #     print "Missing file path as argument"
    #     print "Usage: %s </filepath/filename.pdf>" % sys.argv[0]
    #     sys.exit(1)

    # # check if argument is a pdf file
    argument = sys.argv[1]
    # if not os.path.isfile(argument) and argument.endsWith('.pdf'):
    #     print "Argument must be a pdf file"
    #     sys.exit(1)

    extract_annotations(argument)
