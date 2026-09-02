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


class ScholarBlocked(RuntimeError):
    """Google served an anti-bot / rate-limit page instead of the profile."""


def parse_citations(html):
    """Parse a Scholar profile page into the citations dict.

    Raises ScholarBlocked if the page is Google's "unusual traffic" wall
    rather than a profile page.
    """
    soup = BeautifulSoup(html, "html.parser")

    citation_box = soup.find('div', {'id': 'gsc_rsb_cit'})
    if citation_box is None:
        if 'unusual traffic' in html or '/sorry/index' in html:
            raise ScholarBlocked(
                "Google blocked this request ('unusual traffic' page). "
                "The block is per-IP and expires once automated requests stop; "
                "retry later or from a different network.")
        raise ScholarBlocked(
            "Citation box (div#gsc_rsb_cit) not found - page layout changed "
            "or the profile is unavailable.")

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


def scrape_with_chrome_cookies(scholar_profile):
    """Scrape Scholar by borrowing cookies from the system Chrome browser."""
    scholar_url = f'https://scholar.google.com/citations?user={scholar_profile}&hl=en'
    print(f"Scraping {scholar_url} (Chrome cookies)...")

    cj = browser_cookie3.chrome(domain_name=".google.com")
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
    }

    response = requests.get(scholar_url, headers=headers, cookies=cj, timeout=15)

    if response.status_code == 429 or '/sorry/' in response.url:
        raise ScholarBlocked(
            f"Google rate-limited this IP (HTTP {response.status_code}, "
            f"redirected to {response.url.split('?')[0]}). The block expires "
            "shortly after automated requests stop; retry later or from a "
            "different network.")
    response.raise_for_status()

    return parse_citations(response.text)


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
    try:
        res = run(args.scholar_profile, force_local=args.local)
    except ScholarBlocked as e:
        print(f"ERROR: {e}", file=sys.stderr)
        print("Keeping the existing citations.json unchanged.", file=sys.stderr)
        return 1
    print(res)

    # Writing JSON data
    with open('./citations.json', 'w') as f: json.dump(res, f, sort_keys=True) # indent=4, 
    return 0


if __name__ == "__main__":
    sys.exit(main())
