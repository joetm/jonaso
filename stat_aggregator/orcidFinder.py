#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Query orcid with paper titles to find orcid ID
"""

# Sample url:
# https://orcid.org/orcid-search/search?searchQuery=%22Crowdsourcing%20Treatments%20for%20Low%20Back%20Pain%22


import os, sys
import json
import urllib.parse
from bs4 import BeautifulSoup

import random

from nameparser import HumanName

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class Breaker(Exception):
    pass


BASE_URL = 'https://orcid.org/orcid-search/search?searchQuery='


def main():

  author_file = '../reading_list/allauthors.json'
  with open(author_file, 'r') as f:
    authors = json.load(f)

  random.shuffle(authors)

  FILTERPRIO = 3

  authors = [a for a in authors if a['priority'] >= FILTERPRIO]

  total = len(authors)
  progress = 0

  print(f"{total} authors with prio {FILTERPRIO}")

  for author in authors:

    progress += 1

    # skip low prio authors
    if author['priority'] < FILTERPRIO:
      continue

    print(f"{progress}/{total}")

    uid = author['id']

    # check cache
    cached_id = f"../reading_list/orcids/{uid}.json"
    if os.path.exists(cached_id):
      print(f"Cached: {author['name']}, {author['id']}")
      continue # skip

    try:

      print(f"Querying: {author['name']}")

      # name = HumanName(unicode(sys.argv[1], 'utf-8'))
      n = HumanName(str(author['name']).encode('utf-8'))
      target_first = n.first
      target_last = n.last

      # get the author's publications
      pub_file = f'../reading_list/influencers/{uid}.json'
      with open(pub_file, 'r') as f:
        authordata = json.load(f)
        docs = authordata['docs']
      pubs = []
      for pub in docs:
        pubs.append(pub['title'])

      # bomb-query orcid until the author is found

      for title in pubs:

        print(f"Checking: {title}")

        title = urllib.parse.quote_plus(title)

        URL = f"{BASE_URL}%22{title}%22"
        # print(f'Requesting: {URL}')

        options = Options()
        # options.headless = True
        options.add_argument("-headless")
        driver = webdriver.Firefox(options=options) # executable_path=r'C:\Utility\BrowserDrivers\geckodriver.exe'
        driver.get(URL)

        try:
            element = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "orcid-id-column"))
            )
        except:
          # print("- Publication not found")
          # this publication was not found
          continue

        html = driver.page_source
        driver.quit()

        # Cache the page
        # with open('./orcid.html', 'w') as f:
        #   f.write(html)

        # load cached
        # with open('./orcid.html', 'r') as f:
        #   html = f.read()

        soup = BeautifulSoup(html, 'html.parser')

        try:
          orcid_rows = soup.find_all("td", {"class": "orcid-id-column"})
        except:
            print('orcid_rows not found')
            continue

        # authors found in the table on the page
        authors = []

        for td in orcid_rows:
          tr = td.findParent()
          orcidid = tr.findAll('td')[0].find('a').renderContents().strip()
          firstname = tr.findAll('td')[1].renderContents().strip()
          lastname = tr.findAll('td')[2].renderContents().strip()
          othernames = tr.findAll('td')[3].renderContents().strip()
          affiliations = tr.findAll('td')[4].renderContents().strip()

          if firstname.lower() == target_first.encode('UTF-8').lower() and lastname.lower() == target_last.encode('UTF-8').lower():
            print(f"Author found!\t{firstname} {lastname} {othernames} {affiliations} {orcidid}")

            # save author data
            d = {
              'orcidid': orcidid.decode('UTF-8'),
              'affiliations': affiliations.decode('UTF-8'),
            }
            with open(cached_id, 'w') as x:
              json.dump(d, x)

            # write the orcidid directly to the authordata in influencers folder
            authordata['orcid'] = orcidid.decode('UTF-8')
            authordata['affiliations'] = affiliations.decode('UTF-8')
            with open(pub_file, 'w') as f:
              json.dump(authordata, f)

            # break out of all for loops
            raise Breaker


    except Breaker:
      # print('breaker success')
      # sys.exit()
      continue



if __name__ == '__main__':
	main()
