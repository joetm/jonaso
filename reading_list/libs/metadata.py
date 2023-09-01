#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4


import requests
import os
# import subprocess
from subprocess import check_output
import json
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



# class AnnotationNotFound(Exception):
#     """Raised when annotation could not be extracted"""
#     pass


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



def extractMetadata(tmppath, origfilename, origpath):
    files = {'upload_file': open(tmppath,'rb')}
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

        path, filename = os.path.split(tmppath)

        skip = False
        recog = True
        method = ''

        title = None

        rawdata = r.json()

        # skip conditions
        # if 'id' not in rawdata or rawdata['id'] == 'empty':
            # skip = True # return False
        # if not 'title' in rawdata:
        #     skip = True # return False

        # should have a title, but okay without one. In this case, try to get title from first annotation in file, with fallback of using filename instead
        try:
            title = rawdata['title']
            method = "SP"
        except KeyError:
            # unrecognized title

            # TODO: use first annotation as title, if it exists

            try:
                # run annotation extraction
                # !!! Python2 script (poppler not available for python3)

                # print("Extracting annotations from: %s" % tmppath)

                result = check_output([
                        'python3',
                        '/var/www/academic-site/reading_list/libs/extract_annotations.py',
                        tmppath
                ])

                strResult = result.decode('utf-8').strip()

                # print(strResult)

                annotations = json.loads(strResult)

                # print(annotations)

                # doc = poppler.document_new_from_file(path, None)
                # page1 = doc.get_page(0)
                # # get the annotations
                # items = [i.annot.get_contents() for i in page1.get_annot_mapping()]
                # # filter out empty annotations
                # items = [i for i in items if i]

                if len(annotations) > 0:
                    title = annotations[0]
                    title = title.replace("\n", " ").replace("\r", "").replace("  ", " ").strip()

                method = "AT"

            except Exception as e:
                print(e)

        # uncomment to capture Wikipedia articles
        # try:
        #     if title.endswith('Wikipedia') and not rawdata['authors']:
        #         rawdata['authors'] = [{'name': 'Wikipedia'}]
        # except:
        #     pass

        # skip conditions:
        # - must have authors
        # if not 'authors' in rawdata:
        #     skip == True

        # skip this document?
        # if skip == True:
        #     # log(rawdata)
        #     return False

        # fallback: use filename as title
        if not title:
            # use filename instead
            title = os.path.splitext(origfilename)[0].strip('!-')
            method = "FI"
            recog = False


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
            'filename': origfilename.strip('!-'),
            'recog': int(recog),
            'modified': int(os.path.getmtime(origpath)),
            # 'created': int(os.path.getctime(tmppath)),
            # 'abstractText': rawdata['abstractText'],
            # 'sections': rawdata['sections'],
            # 'references': rawdata['references'],
        }

        print(rawdata['id'], ' [%s]: ' % method, metadata['title'])

        return metadata
    else:
        return False

