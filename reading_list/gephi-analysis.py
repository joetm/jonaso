#!/usr/bin/env python3
# encoding=utf8

import json
import sqlite3
import time
import csv
from nameparser import HumanName
# import urllib.parse


# not needed in python 3
# # from importlib import reload
# reload(sys)  
# sys.setdefaultencoding('utf8')


def normalizeName(name):
    name = HumanName(name) # unicode(name, 'utf-8')
    # return (name.first, name.last)
    return "%s %s" % (name.first, name.last)


# def main():
print("Producing gephi files...")

# edges
edges = open('gephi-edges.csv', 'w', newline='')
edgewriter = csv.writer(edges, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

# nodes
nodes = open('gephi-nodes.csv', 'w', newline='')
nodewriter = csv.writer(nodes, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

# write header
edgewriter.writerow(['id', 'title', 'Source', 'Target', 'Weight'])
nodewriter.writerow(['id', 'Label'])

with open('readlist-full.json') as json_file:
    data = json.load(json_file)
    e = 1
    n = 1
    for d in data['documents']:
        print('title: %s' % d['title'])
        if len(d['authors']) == 0:
            print('skipping (no authors)')
            continue
        if len(d['authors']) == 1:
            # edgewriter.writerow([e, d['title'], normalizeName(d['authors'][0])])
            a = normalizeName(d['authors'][0])
            nodewriter.writerow([a, a])
        else:
            firstauthor = normalizeName(d['authors'].pop(0))
            nodewriter.writerow([firstauthor, firstauthor])
            for author in d['authors']:
                edgewriter.writerow([e, d['title'], firstauthor, normalizeName(author), d['priority']])
                n = n + 1
                a = normalizeName(author)
                nodewriter.writerow([a, a])
        e = e + 1
        n = n + 1

edges.close()
nodes.close()


# if __name__ == "__main__":
#     main()

