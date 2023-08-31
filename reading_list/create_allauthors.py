#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
from collections import defaultdict
import datetime

# Define the current year
today = datetime.date.today()
current_year = today.year


with open('influencer.json') as f:
	influencers = json.load(f)

# decay factor (between 0 and 1)
# The Decay Factor is a constant between 0 and 1. A decay factor close to 1 means the weight drops off very slowly for older papers, whereas a decay factor close to 0 means it drops off very quickly.
decay_factor = 0.5

recency_dict = defaultdict(float)

allauthors = []

for prio in influencers.keys():
	if int(prio) > 0:
		for author in influencers[prio]:
			author['priority'] = int(prio)

			years = [ datetime.datetime.fromtimestamp(ts).year for ts in author['modified'] ]

			del author['modified']

			author['recency'] = 0

			for year in years:
				author['recency'] += author['priority'] * (decay_factor ** (current_year - year))	        

			author['recency'] = round(author['recency'], 2)

			allauthors.append(author)

with open('allauthors.json', 'w') as out:
	json.dump(allauthors, out)

