#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import os
import sys
from fnmatch import fnmatch
import hashlib
import time
import subprocess

from libs import metadata


# BUF_SIZE is totally arbitrary
# read stuff in 64kb chunks -> 65536
BUF_SIZE = 131072


def parsefiles(PATTERN, BASEPATHS, conn):
    # read list
    documents = []

    counter = 0
    unrecognizedCounter = 0

    c = conn.cursor()

    print(PATTERN)

    for root in BASEPATHS:
        for path, subdirs, files in os.walk(root, followlinks=False):
            for name in files:

                fullpath = os.path.join(path, name)

                # skip symlinks
                if os.path.islink(fullpath):
                    continue

                if fnmatch(name, PATTERN):

                    counter = counter + 1

                    sha1 = hashlib.sha1()

                    # calculate hash
                    with open(fullpath, 'rb') as f:
                        while True:
                            data = f.read(BUF_SIZE)
                            if not data:
                                break
                            # md5.update(data)
                            sha1.update(data)

                    # print("SHA1: {0}".format(sha1.hexdigest()))
                    thehash = sha1.hexdigest()

                    print(name, thehash)

                    # check cache
                    c.execute('SELECT * FROM documents WHERE hash=?', (thehash,))
                    res = c.fetchone()
                    # is cached?
                    if res != None:
                        print ('cache hit', counter, ": ",  thehash)
                        parseJSON = json.loads(res[2])
                        if parseJSON:
                            documents.append(parseJSON)
                            if not parseJSON['title'] or not parseJSON['recog']:
                                unrecognizedCounter = unrecognizedCounter + 1
                        else:
                            unrecognizedCounter = unrecognizedCounter + 1
                        continue

                    # create a temporary pdf that holds only the title page + a few more pages
                    # this speeds up processing in science-parse
                    # but do not do this for short pdfs
                    tmpfile = './tmp.pdf'

                    num = subprocess.check_output(['qpdf', '--show-npages', tmpfile])
                    print(num)
                    import sys
                    sys.exit()

                    subprocess.run(["pdftk", fullpath, "cat", "1-5", "output", tmpfile])

                    # extract metadata
                    md = metadata.extractMetadata(tmppath=tmpfile, origfilename=name, origpath=fullpath)
                    if not md:
                        # speed up future processing for these misses
                        c.execute("INSERT INTO documents VALUES (?,?,?)", (thehash, int(time.time()), '{}'))
                        conn.commit()
                        unrecognizedCounter = unrecognizedCounter + 1
                        continue

                    # print (counter, ": ",  thehash)
                    print (counter, ": ",  name)

                    # get my keywords (not the author keywords)
                    md['keywords'] = path.replace(root, '').replace('/',' > ')

                    md['level'] = len(fullpath.replace(root, "").split("/")) - 1

                    # calculate the priority rating
                    md['priority'] = 0 if name.startswith('-') else 1
                    if md['priority'] > 0:
                        md['priority'] = len(name) - len(name.lstrip('!'))

                    # save cache
                    c.execute("INSERT INTO documents VALUES (?,?,?)", (thehash, int(time.time()), json.dumps(md, ensure_ascii=True)))
                    conn.commit()

                    if not md['title'] or not md['recog']:
                        unrecognizedCounter = unrecognizedCounter + 1

                    documents.append(md)

    # sort by modified data
    documents.sort(key=lambda x: x['modified'], reverse=True)

    print ("Unrecognized: ", unrecognizedCounter)

    return (documents, counter, unrecognizedCounter)

