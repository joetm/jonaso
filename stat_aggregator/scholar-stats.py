#!/usr/bin/env python3

import os
import re
import json
import requests
from bs4 import BeautifulSoup

URL = 'https://scholar.google.com/citations?user=ucO_QYQAAAAJ&hl=en'


with open('scholar_cookie.txt', encoding='utf-8') as f: cookie = f.read()


headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:145.0) Gecko/20100101 Firefox/145.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'DNT': '1',
    'Sec-GPC': '1',
    'Connection': 'keep-alive',
    'Cookie': cookie,
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Priority': 'u=0, i',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache',
}


s = requests.Session()

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


table = citation_box.find("table", {'id': 'gsc_rsb_st'})

c_num = table.find("td", {'class': 'gsc_rsb_std'}).text

year_info = citation_box.find("div", {'class': 'gsc_md_hist_b'})

years = year_info.findAll("span", {'class': 'gsc_g_t'})
years = [ int(y.text) for y in years ]

c_per_year = year_info.findAll("span", {'class': 'gsc_g_al'})
c_per_year = [ int(c.text) for c in c_per_year ]

# cits = dict(zip(years, c_per_year))

citations = {
    'citations': int(c_num),
    # 'years': cits,
    'years': years,
    'num': c_per_year,
}

print(citations)

# Writing JSON data
with open('./citations.json', 'w') as f:
    json.dump(citations, f, sort_keys=True) # indent=4, 

# print("Alright alright alright.")
