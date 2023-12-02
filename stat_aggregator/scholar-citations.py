#!/usr/bin/env python3

import os
import re
import json
import requests
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


URL = 'https://scholar.google.com/citations?user=ucO_QYQAAAAJ&hl=en'

headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36',
  # 'Referer': 'https://new.precisionconference.com/user/login',
  # 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}



def open_browser(url):
    print('Fetching publication citations from Google Scholar...')
    options = Options()
    options.headless = True  # Enable headless mode
    driver = webdriver.Firefox(options=options)
    driver.get(url)
    # click the more link until the bitter end
    while True:
        more_link = driver.find_element(By.ID, "gsc_bpf_more")
        if more_link.get_attribute('disabled') is not None:
            break
        current_row_count = len(driver.find_elements(By.XPATH, "//table[@id='gsc_a_t']/tbody/tr"))
        more_link.click()
        # Wait until the number of rows in the table increases
        WebDriverWait(driver, 10).until(
            lambda d: len(d.find_elements(By.XPATH, "//table[@id='gsc_a_t']/tbody/tr")) > current_row_count
        )
    # now return table
    tbody = driver.find_element(By.ID, "gsc_a_b")
    return tbody.get_attribute('outerHTML')


pub_table_html = open_browser(URL)
# print(pub_table_html)

soup = BeautifulSoup(pub_table_html, 'html.parser')

# Assuming 'soup' is your BeautifulSoup object
pubs = soup.select("tr.gsc_a_tr")

publications = []

for p in pubs:
    title = p.select_one("tr.gsc_a_tr td.gsc_a_t a.gsc_a_at").get_text()
    citations = p.select_one("tr.gsc_a_tr td.gsc_a_c").get_text().replace('*', '')
    year = p.select_one("tr.gsc_a_tr td.gsc_a_y").get_text()

    citations = citations if citations.strip() else "0"

    if title:
        publications.append({
            'title': title,
            'citations': citations,
            'year': year,
        })

print(publications)

# Writing JSON data
with open('./publications-citations.json', 'w') as f:
    json.dump(publications, f, sort_keys=True) # indent=4, 

# print("Alright alright alright.")
