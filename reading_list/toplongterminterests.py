#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import json
import sys, os
# import time
from datetime import datetime


filter = ['Issues', 'General, Theory', 'Research Methods', 'Applications', 'Communities, Networks']
CUTOFF = 13
INTERVAL = 90


def convertToDate(timestamp):
  return datetime.utcfromtimestamp(timestamp).strftime('%Y-%m-%d %H:%M:%S')


with open('readlist-full.json') as f:
  data = json.load(f)

docs = data['documents']

for d in docs:
  d['keywords'] = d['keywords'].split(" > ")
  d['datetime'] = convertToDate(d['modified'])

docs.sort(key=lambda x: x['modified']) # reverse=True

# for d in docs[0:2]:
#   print(d)
#   print('===')

times = []
for d in docs:
  times.append(d['modified'])

mindatestamp = min(times)
print("Start:", convertToDate(mindatestamp))
maxdatestamp = max(times)
print("End:", convertToDate(maxdatestamp))
print("---")

# manual binning
_DAYS = 24 * 60 * 60
intv = INTERVAL * _DAYS
bindocs = {}
for tstamp in range(mindatestamp, maxdatestamp + intv, intv):
  for d in docs:
    # identify the bin
    if d['modified'] <= tstamp:
      continue
    if d['modified'] > tstamp + intv:
      continue
    # filling the bin
    for kw in d['keywords']:
      try:
        # if tstamp not in bindocs[kw]:
        bindocs[kw].append(tstamp)
      except:
        # first time filling this bin
        bindocs[kw] = [ tstamp ]

# print(bindocs)


# thanks, ChatGPT!
def get_top_longest_lists(d, n):
  """
  Returns the top N longest lists from the given dictionary d, along with their corresponding keys.
  """
  # Sort the dictionary by the length of the value lists in descending order
  sorted_dict = sorted(d.items(), key=lambda x: len(x[1]), reverse=True)
  # Take the top N items
  top_n = sorted_dict[:n]
  # Return the keys and values of the top N items as a list of tuples
  return [(k, v) for k, v in top_n if k not in filter]


top_lists = get_top_longest_lists(bindocs, CUTOFF)

legend = {}
s = 97
i = 0
for interest in top_lists:
  print(interest[0], ":", len(interest[1]))
  legend[chr(s + i)] = interest[0]
  i += 1
print("---")

invertedlegend = dict(zip(legend.values(), legend.keys()))

# re-format data for recharts graph
# e.g., [{name: 'a', value: 12}]
timeline = {}
for interest in top_lists:
  name = interest[0]
  key = invertedlegend[name]
  for ts in interest[1]:
    try:
      o = timeline[ts]
      try:
        o[key] += 1
      except:
        o[key] = 1
      timeline[ts] = o
    except:
      timeline[ts] = {key: 1}
outdata = []
for ts in timeline.keys():
  obj = timeline[ts]
  obj['t'] = ts
  outdata.append(obj)
# fill missing keys with null
keys = legend.keys()
for i in range(len(outdata)):
  o = outdata[i]
  for k in keys:
    if not k in o:
      outdata[i][k] = None

# print(timeline)
output = {
  'legend': legend,
  'data': outdata,
  'start': mindatestamp,
  'end': maxdatestamp,
}

with open('topkeyword-timeline.json', 'w') as f:
  json.dump(output, f)

