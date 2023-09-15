#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
from collections import defaultdict
from datetime import datetime

today = datetime.now()


with open('influencer.json') as f:
	influencers = json.load(f)

# decay factor (between 0 and 1)
# The Decay Factor is a constant between 0 and 1. A decay factor close to 1 means the weight drops off very slowly for older papers, whereas a decay factor close to 0 means it drops off very quickly.
decay_factor = 0.8

recency_dict = defaultdict(float)

allauthors = []

for prio in influencers.keys():
	if int(prio) > 0:
		for author in influencers[prio]:
			author['priority'] = int(prio)

			modified_dates = [ datetime.fromtimestamp(ts) for ts in author['modified'] ]

			del author['modified']

			author['recency'] = 0

			for modified_date in modified_dates:
				delta = today - modified_date
				months_difference = delta.days / 30.44  # Average number of days in a month
				author['recency'] += 100 * author['priority'] * (decay_factor ** (months_difference))	        

			author['recency'] = round(author['recency'], 2)
			# author['recency'] = float("{:.2f}".format(author['recency']))

			allauthors.append(author)

with open('allauthors.json', 'w') as out:
	json.dump(allauthors, out)

