#!/usr/bin/env python3

import json
import os
import requests
import time
from fnmatch import fnmatch


root = '/some/directory'

# the folders to search for
BASEPATHS = ["/home/jonas/OULU/Literatur/", "/home/jonas/FU/IKON/Literatur/", "/home/jonas/FU/Academic Working/Methods/", "/home/jonas/FU/Misc/"]
# BASEPATHS = ["/home/jonas/OULU/Literatur/"]


PATTERN_TOREAD = "\+*.pdf"
PATTERN_READ = "[\!|\-]*.pdf"


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
            # 'id': rawdata['id'],
            'title': rawdata['title'],
            'year': rawdata['year'],
            'authors': [] if not rawdata['authors'] else [x['name'] for x in rawdata['authors']],
            'modified': int(os.path.getmtime(fullpath)),
            # 'created': int(os.path.getctime(fullpath)),
            # 'abstractText': rawdata['abstractText'],
            # 'references': rawdata['references'],
        }
        print(rawdata['id'], ' - ', metadata['title'])

        return metadata
    else:
        return False


# reading list
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
# with open('readinglist.json', 'w') as LISTFILE:
#     json.dump(documents, LISTFILE, indent=4)


# read list
documents = []

counter = 0
for root in BASEPATHS:
    for path, subdirs, files in os.walk(root):
        for name in files:
            if fnmatch(name, PATTERN_READ):
                keywords = path.replace(root, '').replace('/',' > ')
                fullpath = "%s/%s" % (path, name)
                metadata = extractMetadata(fullpath)
                if not metadata:
                    continue
                counter = counter + 1
                print (counter)
                metadata['keywords'] = keywords
                metadata['priority'] = 0 if name.startswith('-') else 1
                if metadata['priority'] > 0:
                    metadata['priority'] = len(name) - len(name.lstrip('!'))
                documents.append(metadata)

# sort by modified data
documents.sort(key=lambda x: x['modified'], reverse=True)

output = {
    'modified': int(time.time()),
    'documents': documents
}
with open('readlist-full.json', 'w') as LISTFILE:
    json.dump(output, LISTFILE, indent=4)


del documents[100:]
output = {
    'modified': int(time.time()),
    'documents': documents
}
with open('readlist-latest.json', 'w') as LISTFILE:
    json.dump(output, LISTFILE, indent=4)

