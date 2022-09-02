#!/usr/bin/python3
# -*- coding: utf-8 -*-

import sys
import os
import json

# fix the publisher field:
# split into howpublished and publisher

f = open('./src/bibliography/publications.json')
# f = open('./public/static/publications.json')
data = json.load(f)
f.close()

for obj in data:
	try:
		howpublished, publisher = obj['publisher'].split(";")
		howpublished = howpublished.strip()
		publisher = publisher.strip()
	except:
		continue
	obj['howpublished'] = howpublished
	obj['publisher'] = publisher

with open('./public/static/publications.json', 'w') as f:
    json.dump(data, f, indent=2, sort_keys=True)
