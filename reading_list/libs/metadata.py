#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import requests
import os
# import csv


# curl -v -H "Content-type: application/pdf" --data-binary @paper.pdf "http://scienceparse.allenai.org/v1"
# SERVERURL = 'http://localhost:8080/v1'
# SERVERURL_REMOTE = 'http://192.168.0.53:8080/v1'


# example of unrecognized document:
    # "('id', 'SP:b919b0662fcdc3a4e79bb98b30a29678538faf90')",
    # "('abstractText', 'This SIG examines ...')",
    # "('year', 2012)",
    # "('sections', [{''}]",
    # ('authors', [{'name': 'Celine Latulipe', 'affiliations': []}])",
    # "('references', [{'


def log():
    # log the skipped document
    # filter for csv storage
    if 'sections' in rawdata:
        del rawdata['sections']
    if 'references' in rawdata:
        del rawdata['references']
    missed = {}
    defaults = {
        'filename': filename,
        'id': '',
        'title': '',
        'abstractText': '',
        'year': '',
        'authors': '',
    }
    # overwrite where necessary
    missed.update(defaults)
    missed.update(rawdata)
    # log the unrecognized entry
    with open('unrecognized.csv', 'a') as csvfile:
        unrecogWriter = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        unrecogWriter.writerow(missed.items()) # ([rawdata[k] for k in rawdata.keys()])



def extractMetadata(fullpath):
    files = {'upload_file': open(fullpath,'rb')}
    headers = {'Content-type': 'application/pdf'}
    # params = {'skipFields': 'references,sections'}

    # remote or locally?
    # skipFields=references,sections
    if 'IPADDRESS' in os.environ:
        SERVERURL = 'http://%s:8080/v1?skipFields=references,sections' % os.environ['IPADDRESS']
    else: # fallback to localhost
        SERVERURL = 'http://localhost:8080/v1?skipFields=references,sections'

    r = requests.post(SERVERURL, files=files, headers=headers) # , data=params

    if r.status_code == 200:

        path, filename = os.path.split(fullpath)

        skip = False
        recog = True

        rawdata = r.json()

        # skip conditions
        # if 'id' not in rawdata or rawdata['id'] == 'empty':
            # skip = True # return False
        # if not 'title' in rawdata:
        #     skip = True # return False

        # should have a title, but okay without one (using filename instead)
        try:
            title = rawdata['title']
        except KeyError:
            # unrecognized title: use filename instead
            title = os.path.splitext(filename)[0].strip('!-')
            recog = False
        try:
            if title.endswith('Wikipedia') and not rawdata['authors']:
                rawdata['authors'] = [{'name': 'Wikipedia'}]
        except:
            pass

        # skip conditions:
        # - must have authors
        # if not 'authors' in rawdata:
        #     skip == True

        # skip this document?
        # if skip == True:
        #     # log(rawdata)
        #     return False

        try:
            authors = [] if not rawdata['authors'] else [x['name'] for x in rawdata['authors']]
        except:
            authors = []

        # sanitize
        if not 'year' in rawdata:
            rawdata['year'] = "N/A"
        # if not 'authors' in rawdata:
        #     rawdata['authors'] = False
        metadata = {
            # 'id': rawdata['id'],
            'title': title,
            'year': rawdata['year'],
            'authors': authors,
            'filename': filename,
            'recog': int(recog),
            'modified': int(os.path.getmtime(fullpath)),
            # 'created': int(os.path.getctime(fullpath)),
            # 'abstractText': rawdata['abstractText'],
            # 'sections': rawdata['sections'],
            # 'references': rawdata['references'],
        }
        print(rawdata['id'], ' - ', metadata['title'])

        return metadata
    else:
        return False

