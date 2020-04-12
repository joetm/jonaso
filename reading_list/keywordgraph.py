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


with open('readlist-full.json') as f:
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

for tstamp in range(mindatestamp, maxdatestamp + interval, interval):
  # print(tstamp)
  for d in docs:
    # identify the bin
    if d['modified'] <= tstamp:
      continue
    if d['modified'] > tstamp + interval:
      break
    # filling the bin
    try:
      for kw in d['keywords']:
        if kw and kw not in bindocs[tstamp]:
          bindocs[tstamp].append(kw)
    except:
      # first time filling this bin
      bindocs[tstamp] = d['keywords']

# print(bindocs)



keys = bindocs.keys()
allkeywords = []
# alldocs = []
for bin in keys:
  # 1
  # alldocs.append(bindocs[bin])
  # 2
  for kw in bindocs[bin]:
    if kw not in allkeywords:
      allkeywords.append(kw)

# print(len(allkeywords))
print("%d different keywords" % len(allkeywords))

print(bindocs)


# one hot encoding
# from numpy import argmax
# from sklearn.preprocessing import LabelEncoder
# from sklearn.preprocessing import OneHotEncoder
# # integer encode
# label_encoder = LabelEncoder()
# integer_encoded = label_encoder.fit_transform(alldocs)
# # print(integer_encoded)
# # binary encode
# onehot_encoder = OneHotEncoder(sparse=False)
# integer_encoded = integer_encoded.reshape(len(integer_encoded), 1)
# onehot_encoded = onehot_encoder.fit_transform(integer_encoded)
# print(onehot_encoded)
# invert first example
# inverted = label_encoder.inverse_transform([argmax(onehot_encoded[0, :])])
# print(inverted)


with open('keyword-timeline.json', 'w') as LISTFILE:
  json.dump(bindocs, LISTFILE, indent=4)

