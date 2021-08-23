#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import sqlite3
import time
import sys
from requests.exceptions import ConnectionError

from libs import fileReader


# the folders to search for
BASEPATHS = [
    # "/media/jonas/Research/FIZ/Literatur/",
    # "/media/jonas/Research/FIZ/Funding/",
    "/media/jonas/Research/OULU/Literatur/",
    "/media/jonas/Research/OULU/Courses/",
    "/media/jonas/Research/OULU/Funding/",
    "/media/jonas/Research/FU/IKON/Literatur/",
    "/media/jonas/Research/FU/Academic Working/",
    "/media/jonas/Research/FU/ID+LAB/Literatur/",
    # "/media/jonas/Research/FU/IKON/Ontologies",
    "/media/jonas/Research/FU/Misc/"
]

PATTERN_READ = "[\!|\-]*.pdf"



# define Python user-defined exceptions
class Error(Exception):
    """Base class for other exceptions"""
    pass

class FilesNotFound(Error):
    """Raised when no files were found"""
    pass


# def main():
print("Mining pdfs")

# establish a connection for caching
conn = sqlite3.connect('cache.db')


try:
    documents, counter, unrecognizedCounter = fileReader.parsefiles(PATTERN_READ, BASEPATHS, conn)
    if len(documents) == 0:
        raise FilesNotFound


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
    # unrecognizedD = 0
    # for d in documents:
    #     if not d['title']:
    #         unrecognizedD = unrecognizedD + 1

    # write the latest-100 list
    out = {
           'modified': int(time.time()),
            'unrecognized_overall': unrecognizedCounter,
            'unrecognized_overall_percent': round(unrecognizedCounterPercent, 2),
            # 'unrecognized': unrecognizedD,
            # 'unrecognized_percent': round(unrecognizedD / len(documents), 2),
            'documents': documents
        }
    with open('readlist-latest.json', 'w') as LISTFILE:
        json.dump(out, LISTFILE, indent=4)


except ConnectionError:
    print("Scienceparse server is not running.")
    conn.close()
    # need to exit with a positive exit code to prevent further scripts from running
    sys.exit(1)

except Exception as e:
    print(e)
    print("Files not found. USB connected?")
    conn.close()
    # need to exit with a positive exit code to prevent further scripts from running
    sys.exit(1)


# close sqlite connection
conn.close()


# if __name__ == "__main__":
#     main()

