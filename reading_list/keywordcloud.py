#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import sys, os
import requests
# import time
import hashlib
from datetime import datetime
import networkx as nx
import matplotlib.pyplot as plt


# import numpy as np
# import pandas as pd

DAYS = 24 * 60 * 60


def convertToDate(timestamp):
  return datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')


with open('readlist-full.json', 'r') as f:
  data = json.load(f)

docs = data['documents']

for d in docs:
  d['keywords'] = d['keywords'].split(" > ")
  d['datetime'] = convertToDate(d['modified'])

docs.sort(key=lambda x: x['modified']) # reverse=True

# print(docs[0])

times = []
for d in docs:
  times.append(d['modified'])

mindatestamp = min(times)
print("Start:", convertToDate(mindatestamp))

maxdatestamp = max(times)
print("End:", convertToDate(maxdatestamp))

print("---")

# manual binning
interval = 30 * DAYS
bindocs = {}

# for tstamp in range(mindatestamp, maxdatestamp + interval, interval):
#   # print(tstamp)
#   for d in docs:
#     # identify the bin
#     if d['modified'] <= tstamp:
#       continue
#     if d['modified'] > tstamp + interval:
#       break
#     # filling the bin
#     if tstamp not in bindocs:
#       bindocs[tstamp] = {}
#     for kw in d['keywords']:
#       if kw == "":
#         continue
#       if kw not in bindocs[tstamp]:
#         bindocs[tstamp][kw] = 1
#       else:
#         bindocs[tstamp][kw] = bindocs[tstamp][kw] + 1 

# # print(bindocs)

# out = {
#   "interval": int(interval / DAYS),
#   "words": bindocs
# }

# with open('keyword-cloud.json', 'w') as LISTFILE:
#   json.dump(out, LISTFILE, indent=4)


# all, irregardless of priority
for d in docs:
  for kw in d['keywords']:
    if kw == "":
      continue
    if kw not in bindocs:
      bindocs[kw] = 1
    else:
      bindocs[kw] = bindocs[kw] + 1 
with open('keyword-cloud-full.json', 'w') as LISTFILE:
  json.dump(bindocs, LISTFILE, indent=4)


# only priority 1--3
for d in [x for x in docs if x['priority'] > 0]:
  for kw in d['keywords']:
    if kw == "":
      continue
    if kw not in bindocs:
      bindocs[kw] = 1
    else:
      bindocs[kw] = bindocs[kw] + 1 

reformatted = []
for w in bindocs.keys():
  reformatted.append({'text': w, 'value': bindocs[w]})

with open('keyword-cloud-priority.json', 'w') as LISTFILE:
  json.dump(reformatted, LISTFILE, indent=4)

