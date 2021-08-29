#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import sqlite3
import time

from libs import fileReader


# the folders to search for
BASEPATHS = [
    "/home/jonas/RESEARCH/Literatur/",
    "/home/jonas/RESEARCH/2-OULU/Courses/",
    "/home/jonas/RESEARCH/2-OULU/Funding/",
    "/home/jonas/RESEARCH/Academic Working/",
    "/home/jonas/RESEARCH/Misc/"
]

PATTERN_TOREAD = "+*.pdf"


# def main():
print("Mining pdfs to read")

# establish a connection for caching
conn = sqlite3.connect('cache.db')

# try:
documents, counter, unrecognizedCounter = fileReader.parsefiles(PATTERN_TOREAD, BASEPATHS, conn)
# except ConnectionRefusedError:
# except KeyboardInterrupt:
#    pass

# sort documents
documents.sort(key=lambda x: x['filename'], reverse=False)

# write the full list
# try:
#     unrecognizedCounterPercent = unrecognizedCounter / counter
# except ZeroDivisionError:
#     unrecognizedCounterPercent = 0
# out = {
#         'modified': int(time.time()),
#         'unrecognized': unrecognizedCounter,
#         'unrecognized_percent': unrecognizedCounterPercent,
#         'documents': documents
#     }
# with open('toreadlist-full.json', 'w') as LISTFILE:
#     json.dump(out, LISTFILE, indent=4)


# latest-100
del documents[100:]

# count unrecognized in latest-100
# unrecognizedD = 0
# for d in documents:
#     if not d['title']:
#         unrecognizedD = unrecognizedD + 1

# try:
#     unrecognized_percent = unrecognizedD / len(documents)
# except ZeroDivisionError:
#     unrecognized_percent = 0

# write the latest-100 list
out = {
       'modified': int(time.time()),
        'unrecognized_overall': unrecognizedCounter,
        'unrecognized_overall_percent': round(unrecognizedCounterPercent, 2),
        # 'unrecognized': unrecognizedD,
        # 'unrecognized_percent': round(unrecognized_percent, 2),
        'documents': documents
    }
with open('toreadlist-latest.json', 'w') as LISTFILE:
    json.dump(out, LISTFILE, indent=4)


# close sqlite connection
conn.close()

# if __name__ == "__main__":
#     main()

