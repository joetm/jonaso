#!/usr/bin/env python3

import json
import os
import requests
import time
import sqlite3
import hashlib
from fnmatch import fnmatch

# BUF_SIZE is totally arbitrary, change for your app!
BUF_SIZE = 65536  # lets read stuff in 64kb chunks!


# caching
conn = sqlite3.connect('cache.db')
c = conn.cursor()



# -----------------
# first-time setup
# c.execute('''CREATE TABLE documents (hash text, json text)''')
# conn.commit()
# -----------------



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
                    documents.append(json.loads(res[1]))
                    continue

                keywords = path.replace(root, '').replace('/',' > ')
                metadata = extractMetadata(fullpath)
                if not metadata:
                    continue
                print (counter, ": ",  thehash)
                metadata['keywords'] = keywords
                metadata['priority'] = 0 if name.startswith('-') else 1
                if metadata['priority'] > 0:
                    metadata['priority'] = len(name) - len(name.lstrip('!'))

                # save cache
                # print("INSERT INTO documents VALUES ('%s','%s')" % (thehash, json.dumps(metadata, ensure_ascii=True)))
                c.execute("INSERT INTO documents VALUES (?,?)", (thehash, json.dumps(metadata, ensure_ascii=True)))
                conn.commit()

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


conn.close()
