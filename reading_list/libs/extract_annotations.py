#!/usr/bin/python2.7
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

import poppler, os.path
import json
import sys


def extract_annotations(filename):

    # see:
    # http://stackoverflow.com/a/13748949/426266
    path = 'file://%s' % os.path.realpath('%s' % filename)
    doc = poppler.document_new_from_file(path, None)
    pages = [doc.get_page(i) for i in range(doc.get_n_pages())]


    annotations = []

    # process annotations
    for page_no, page in enumerate(pages):
        # get the annotations
        items = [i.annot.get_contents() for i in page.get_annot_mapping()]
        # filter out empty annotations
        items = [i for i in items if i]
        # print "page: %s comments: %s " % (page_no + 1, items)
        for it in items:
            # clean string
            it = it.replace("\n", "").replace("\r", "").strip()
            # write to file
            annotations.append([page_no + 1, it])

    json.dumps(annotations,
        skipkeys=False,
        ensure_ascii=True,
        check_circular=True,
        allow_nan=True,
        cls=None,
        indent=4,
        separators=None,
        encoding="utf-8",
        default=None,
        sort_keys=True
    )



if __name__ == "__main__":

    if len(sys.argv) != 2:
        print "Missing file path as argument"
        print "Usage: %s </filepath/filename.pdf>" % sys.argv[0]
        sys.exit(1)

    # check if argument is a pdf file
    argument = sys.argv[1]
    if not os.path.isfile(argument) and argument.endsWith('.pdf'):
        print "Argument must be a pdf file"
        sys.exit(1)

    extract_annotations(argument)
