#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json

with open('influencer.json') as f:
	influencers = json.load(f)

allauthors = []

for prio in influencers.keys():
	if int(prio) > 0:
		for author in influencers[prio]:
			author['priority'] = int(prio)
			allauthors.append(author)

with open('allauthors.json', 'w') as out:
	json.dump(allauthors, out)

