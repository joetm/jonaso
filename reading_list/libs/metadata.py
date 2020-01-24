#!/usr/bin/env python3

import requests
import os


# curl -v -H "Content-type: application/pdf" --data-binary @paper.pdf "http://scienceparse.allenai.org/v1"
SERVERURL = 'http://localhost:8080/v1'


def extractMetadata(fullpath):
    files = {'upload_file': open(fullpath,'rb')}
    headers = {'Content-type': 'application/pdf'}
    r = requests.post(SERVERURL, files=files, headers=headers)

    if r.status_code == 200:

        path, filename = os.path.split(fullpath)

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
            'filename': filename,
            'modified': int(os.path.getmtime(fullpath)),
            # 'created': int(os.path.getctime(fullpath)),
            # 'abstractText': rawdata['abstractText'],
            # 'references': rawdata['references'],
        }
        print(rawdata['id'], ' - ', metadata['title'])

        return metadata
    else:
        return False

