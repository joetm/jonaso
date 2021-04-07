#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import sqlite3
import time

from libs import fileReader


# the folders to search for
BASEPATHS = [
    "/home/jonas/FIZ/Literatur/",
    "/home/jonas/OULU/Literatur/",
    "/home/jonas/OULU/Courses/",
    "/home/jonas/OULU/Funding/",
    "/home/jonas/FU/IKON/Literatur/",
    "/home/jonas/FU/Academic Working/",
    "/home/jonas/FU/ID+LAB/Literatur/",
    "/home/jonas/FU/IKON/Ontologies",
    "/home/jonas/FU/Misc/"
]

PATTERN_READ = "[\!|\-]*.pdf"



# def main():
print("Mining pdfs")

# establish a connection for caching
conn = sqlite3.connect('cache.db')


documents, counter, unrecognizedCounter = fileReader.parsefiles(PATTERN_READ, BASEPATHS, conn)


# write the full list
if counter == 0:
    unrecognizedCounterPercent = 0
else:
    unrecognizedCounterPercent = unrecognizedCounter / counter
out = {
        'modified': int(time.time()),
        'unrecognized': unrecognizedCounter,
        'unrecognized_percent': unrecognizedCounterPercent,
        'documents': documents
    }
with open('readlist-full.json', 'w') as LISTFILE:
    json.dump(out, LISTFILE, indent=4)


# latest-100
del documents[100:]

# count unrecognized in latest-100
unrecognizedD = 0
for d in documents:
    if not d['title']:
        unrecognizedD = unrecognizedD + 1

# write the latest-100 list
out = {
       'modified': int(time.time()),
        'unrecognized_overall': unrecognizedCounter,
        'unrecognized_overall_percent': round(unrecognizedCounterPercent, 2),
        'unrecognized': unrecognizedD,
        'unrecognized_percent': round(unrecognizedD / len(documents), 2),
        'documents': documents
    }
with open('readlist-latest.json', 'w') as LISTFILE:
    json.dump(out, LISTFILE, indent=4)


# close sqlite connection
conn.close()

# if __name__ == "__main__":
#     main()

