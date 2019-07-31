#!/usr/bin/env python3

import json
import os
import requests
import time
import sqlite3
import hashlib
from fnmatch import fnmatch

# BUF_SIZE is totally arbitrary
# read stuff in 64kb chunks -> 65536
BUF_SIZE = 131072

# the folders to search for
BASEPATHS = [
    "/home/jonas/OULU/Literatur/",
    "/home/jonas/OULU/Courses/",
    "/home/jonas/FU/IKON/Literatur/",
    "/home/jonas/FU/Academic Working/",
    "/home/jonas/FU/ID+LAB/Literatur/",
    "/home/jonas/FU/Misc/"
]

PATTERN_TOREAD = "\+*.pdf"
PATTERN_READ = "[\!|\-]*.pdf"

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


# def main():
print("Mining pdfs")

# establish a connection for caching
conn = sqlite3.connect('cache.db')
c = conn.cursor()

# read list
documents = []

counter = 0
unrecognizedCounter = 0
for root in BASEPATHS:
    for path, subdirs, files in os.walk(root):
        for name in files:
            if fnmatch(name, PATTERN_READ):

                counter = counter + 1

                sha1 = hashlib.sha1()

                fullpath = os.path.join(path, name)

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

                # cache check
                c.execute('SELECT * FROM documents WHERE hash=?', (thehash,))
                res = c.fetchone()

                # cached?
                if res != None:
                    print ('cache hit', counter, ": ",  thehash)
                    parseJSON = json.loads(res[2])
                    if parseJSON:
                        documents.append(parseJSON)
                        if not parseJSON['title']:
                            unrecognizedCounter = unrecognizedCounter + 1
                    else:
                        unrecognizedCounter = unrecognizedCounter + 1
                    continue

                metadata = extractMetadata(fullpath)
                if not metadata:
                    # speed up future processing for these misses
                    c.execute("INSERT INTO documents VALUES (?,?,?)", (thehash, int(time.time()), '{}'))
                    conn.commit()
                    unrecognizedCounter = unrecognizedCounter + 1
                    continue

                print (counter, ": ",  thehash)

                # get my keywords (not the author keywords)
                keywords = path.replace(root, '').replace('/',' > ')
                metadata['keywords'] = keywords

                # calculate the priority rating
                metadata['priority'] = 0 if name.startswith('-') else 1
                if metadata['priority'] > 0:
                    metadata['priority'] = len(name) - len(name.lstrip('!'))

                # save cache
                c.execute("INSERT INTO documents VALUES (?,?,?)", (thehash, int(time.time()), json.dumps(metadata, ensure_ascii=True)))
                conn.commit()

                documents.append(metadata)

                if not metadata['title']:
                    unrecognizedCounter = unrecognizedCounter + 1

# sort by modified data
documents.sort(key=lambda x: x['modified'], reverse=True)

print ("Unrecognized: ", unrecognizedCounter)

# write the full list
unrecognizedCounterPercent = unrecognizedCounter / len(documents)
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
        'unrecognized_overall_percent': unrecognizedCounterPercent,
        'unrecognized': unrecognizedD,
        'unrecognized_percent': unrecognizedD / len(documents),
        'documents': documents
    }
with open('readlist-latest.json', 'w') as LISTFILE:
    json.dump(out, LISTFILE, indent=4)

# close sqlite connection
conn.close()

# if __name__ == "__main__":
#     main()

