#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os
import sys
import json
import shutil
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
        # list_of_files = os.walk(root, followlinks=False)
        # list_of_files = [ os.path.join(f[0], f[2]) for f in list_of_files]
        # efficiency mod
        # sort by modification date and then abort once we reach the first cached result
        # list_of_files = sorted([ f[2] for f in list_of_files], key = lambda x: os.path.getmtime(x), reverse=True)
        # thisPathIsDone = False
        for path, subdirs, files in os.walk(root, followlinks=False):
            # if thisPathIsDone:
            #     break
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
                        print ('cache hit', counter, ": ",  thehash)
                        parseJSON = json.loads(res[2])
                        if parseJSON:
                            documents.append(parseJSON)
                            if not parseJSON['title'] or not parseJSON['recog']:
                                unrecognizedCounter = unrecognizedCounter + 1
                        else:
                            unrecognizedCounter = unrecognizedCounter + 1
                        # we have the cached file info, skip the parsing
                        # TODO: update filepath in DB
                        # break, since we hit the first cached result in this folder
                        # thisPathIsDone = True
                        # break
                        continue

                    print(name, thehash)

                    # create a temporary pdf that holds only the title page + a few more pages
                    # this speeds up processing in science-parse
                    # but do not do this for short pdfs
                    tmpfile = './tmp.pdf'
                    CUTOFF = 5
                    shutil.copy(fullpath, tmpfile)
                    try:
                        # print(f"qpdf --show-npages {fullpath}")
                        num = subprocess.check_output(['qpdf', '--show-npages', tmpfile], stderr=subprocess.STDOUT)
                        # sp = subprocess.Popen(f"qpdf --show-npages {fullpath}", shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                        # num = sp.stdout.read()
                        num = int(num.strip())
                        if num and num > CUTOFF:
                            try:
                                subprocess.run(["pdftk", fullpath, "cat", f"1-{CUTOFF}", "output", tmpfile], stderr=subprocess.STDOUT)
                            except subprocess.CalledProcessError as e:
                                print(f"pdftk error: {e.output}")
                                shutil.copy(fullpath, tmpfile)
                    except subprocess.CalledProcessError as e:
                        print(f"qpdf error: {e.output}")

                    # extract metadata
                    md = metadata.extractMetadata(tmppath=tmpfile, origfilename=name, origpath=fullpath)
                    # failed to get metadata?
                    if not md:
                        # speed up future processing for these misses
                        c.execute("INSERT INTO documents VALUES (?,?,?,?)", (thehash, int(time.time()), '{}', fullpath))
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
                    c.execute("INSERT INTO documents VALUES (?,?,?,?)", (thehash, int(time.time()), json.dumps(md, ensure_ascii=True), fullpath))
                    conn.commit()

                    if not md['title'] or not md['recog']:
                        unrecognizedCounter = unrecognizedCounter + 1

                    documents.append(md)

    # sort by modified data
    documents.sort(key=lambda x: x['modified'], reverse=True)

    print ("Unrecognized: ", unrecognizedCounter)

    return (documents, counter, unrecognizedCounter)

