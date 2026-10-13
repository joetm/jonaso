#!/usr/bin/python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

"""Scholar scraper v2: uses system Chrome cookies instead of cookie.txt.

Requires: pip install requests beautifulsoup4 browser-cookie3
"""

import os
import sys
import json
import argparse
import requests
import browser_cookie3
from bs4 import BeautifulSoup
from datetime import datetime, timedelta


BASEDIR = os.path.join(os.path.dirname(os.path.realpath(__file__)))

USER_AGENT = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)

# with open('scholar_cookie.txt', encoding='utf-8') as f: cookie = f.read()


def scrape_with_chrome_cookies(scholar_profile):
    """Scrape Scholar by borrowing cookies from the system Chrome browser."""
    scholar_url = f'https://scholar.google.com/citations?user={scholar_profile}&hl=en'
    print(f"Scraping {scholar_url} (Chrome cookies)...")

    cj = browser_cookie3.chrome(domain_name=".google.com")
    # headers = {
    # 'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:145.0) Gecko/20100101 Firefox/145.0',
    #     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    #     'Accept-Language': 'en-US,en;q=0.5',
    #     'Accept-Encoding': 'gzip, deflate, br, zstd',
    #     'DNT': '1',
    #     'Sec-GPC': '1',
    #     'Connection': 'keep-alive',
    #     'Cookie': cookie,
    #     'Upgrade-Insecure-Requests': '1',
    #     'Sec-Fetch-Dest': 'document',
    #     'Sec-Fetch-Mode': 'navigate',
    #     'Sec-Fetch-Site': 'none',
    #     'Sec-Fetch-User': '?1',
    #     'Priority': 'u=0, i',
    #     'Pragma': 'no-cache',
    #     'Cache-Control': 'no-cache',
    # }
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }

    response = requests.get(scholar_url, headers=headers, cookies=cj, timeout=15)
    soup = BeautifulSoup(response.text, "html.parser")

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

    return citations


def build_parser():
    p = argparse.ArgumentParser()
    p.add_argument("-s", "--scholarid", dest="scholar_profile")
    p.add_argument("--local", action="store_true",
                   help="Force local scraping, bypass VPS proxy")
    return p

def run(scholar_profile, force_local=False):
  # Local scraping via Chrome cookies
  if not scholar_profile: scholar_profile = 'ucO_QYQAAAAJ'
  res = scrape_with_chrome_cookies(scholar_profile)
  return res

def main(argv=None):
    args = build_parser().parse_args(argv)
    res = run(args.scholar_profile, force_local=args.local)
    print(res)

    # Writing JSON data
    with open('./citations.json', 'w') as f: json.dump(res, f, sort_keys=True) # indent=4, 


if __name__ == "__main__":
    main()
