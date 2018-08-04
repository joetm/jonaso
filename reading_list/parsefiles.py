#!/usr/bin/env python3

import json
import os
import requests
from fnmatch import fnmatch
from operator import attrgetter


root = '/some/directory'

# the folders to search for
BASEPATHS = ["/home/jonas/OULU/Literatur/", "/home/jonas/FU/IKON/Literatur", "/home/jonas/FU/Misc/"]
# BASEPATHS = ["/home/jonas/OULU/Literatur/"]


PATTERN_TOREAD = "+*.pdf"
PATTERN_READ1 = "!*.pdf"
PATTERN_READ2 = "-*.pdf"


print("Mining pdfs")

# curl -v -H "Content-type: application/pdf" --data-binary @paper.pdf "http://scienceparse.allenai.org/v1"
SERVERURL = 'http://localhost:8080/v1'


def extractMetadata(fullpath):
    files = {'upload_file': open(fullpath,'rb')}
    headers = {'Content-type': 'application/pdf'}
    r = requests.post(SERVERURL, files=files, headers=headers)

    if r.status_code == 200:
        rawdata = r.json()
        # skip conditions
        if 'id' not in rawdata or rawdata['id'] == 'empty':
            return False
        if not 'title' in rawdata:
            return False
        # sanitize
        if not 'year' in rawdata:
            rawdata['year'] = "N/A"
        if not 'authors' in rawdata:
            rawdata['authors'] = False
        metadata = {
            'id': rawdata['id'],
            'title': rawdata['title'],
            'year': rawdata['year'],
            'authors': [] if not rawdata['authors'] else [x['name'] for x in rawdata['authors']],
            'modified': int(os.path.getmtime(fullpath)),
            'created': int(os.path.getctime(fullpath)),
            # 'abstractText': rawdata['abstractText'],
            # 'references': rawdata['references'],
        }
        print(metadata['id'], ' - ', metadata['title'])

        return metadata
    else:
        return False


# reading list
# with open('readinglist.json', 'w') as LISTFILE:
#     documents = []

#     for root in BASEPATHS:
#         for path, subdirs, files in os.walk(root):
#             for name in files:
#                 if fnmatch(name, PATTERN_TOREAD):
#                     keywords = path.replace(root, '').replace('/',' > ')
#                     fullpath = "%s/%s" % (path, name)
#                     metadata = extractMetadata(fullpath)
#                     if not metadata:
#                         continue
#                     metadata['keywords'] = keywords
#                     metadata['priority'] = 1
#                     documents.append(metadata)

#     json.dump(documents, LISTFILE, indent=4)

# read list
with open('readlist.json', 'w') as LISTFILE:
    documents = []

    for root in BASEPATHS:
        for path, subdirs, files in os.walk(root):
            for name in files:
                if fnmatch(name, PATTERN_READ1) or fnmatch(name, PATTERN_READ2):
                    keywords = path.replace(root, '').replace('/',' > ')
                    fullpath = "%s/%s" % (path, name)
                    metadata = extractMetadata(fullpath)
                    if not metadata:
                        continue
                    metadata['keywords'] = keywords
                    metadata['priority'] = 0 if name.startswith('-') else 1
                    documents.append(metadata)


    # sort by modified data
    documents.sort(key = attrgetter('modified'), reverse = True)

    json.dump(documents, LISTFILE, indent=4)
