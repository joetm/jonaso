#!/usr/bin/env python3

import os
import re
import json
import requests
from bs4 import BeautifulSoup

URL = 'https://scholar.google.com/citations?user=ucO_QYQAAAAJ&hl=en'


s = requests.Session()

headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36',
  # 'Referer': 'https://new.precisionconference.com/user/login',
  # 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}

# print('Fetching Google Scholar page...')
payload = {}
r1 = s.get(URL, data=payload, headers=headers)
# print("Status:", r1.status_code)

# # DEV
# # Cache the page
# with open('./scholar.html', 'w') as f:
#     f.write(r1.text)

page = r1.text

# DEV
# load cached page
# page = ''
# with open('./scholar.html', 'r') as f:
#     page = f.read()


soup = BeautifulSoup(page, 'html.parser')

try:
    citation_box = soup.find('div', {'id': 'gsc_rsb_cit'})
except:
    print('Citation box not found')


table = soup.find("table", {'id': 'gsc_rsb_st'})

c_num = table.find("td", {'class': 'gsc_rsb_std'}).text

year_info = soup.find("div", {'class': 'gsc_md_hist_b'})

years = year_info.findAll("span", {'class': 'gsc_g_t'})
years = [ int(y.text) for y in years ]

c_per_year = year_info.findAll("span", {'class': 'gsc_g_al'})
c_per_year = [ int(c.text) for c in c_per_year ]

cits = dict(zip(years, c_per_year))

citations = {
    'citations': int(c_num),
    'years': cits,
}

print(citations)

# Writing JSON data
with open('./citations.json', 'w') as f:
    json.dump(citations, f, sort_keys=True) # indent=4, 

# print("Alright alright alright.")
