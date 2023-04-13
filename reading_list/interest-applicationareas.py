#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import sys, os
# import time
from datetime import datetime



def convertToDate(timestamp):
  return datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')


with open('readlist-full.json') as f:
  data = json.load(f)

docs = data['documents']

for d in docs:
  d['keywords'] = d['keywords'].split(" > ")
  d['datetime'] = convertToDate(d['modified'])

docs.sort(key=lambda x: x['modified']) # reverse=True

times = []
for d in docs:
  times.append(d['modified'])

mindatestamp = min(times)
print("Start:", convertToDate(mindatestamp))
maxdatestamp = max(times)
print("End:", convertToDate(maxdatestamp))
print("---")

print(f"{len(docs)} docs before filtering applications")
docs = list(filter(lambda doc: doc['keywords'] and 'Applications' in doc['keywords'], docs))
docs = list(filter(lambda doc: doc['priority'] > 0, docs))
print(f"{len(docs)} docs after filtering applications")

def to_camel_case(s):
    words = s.split(' ')
    return ' '.join(word.capitalize() for word in words)

def split_list_at_element(lst, element):
  lst = [ x.lower() for x in lst ]
  element = element.lower()
  if element in lst:
      index = lst.index(element)
      # return lst[:index], lst[index + 1:]
      return lst[index + 1:]
  else:
      return None

appdocs = []
for doc in docs:
  applications = split_list_at_element(doc['keywords'], 'Applications')
  if applications:
    doc['applications'] = applications
    del doc['filename']
    appdocs.append(doc)


applications = {}
for doc in appdocs:
  id = to_camel_case(doc['keywords'][0] + ' > ' + doc['applications'][0])
  del doc['applications']
  applications.setdefault(id, []).append(doc)


# print(applications)


with open('interest-applicationareas.json', 'w') as f:
  json.dump(applications, f)

