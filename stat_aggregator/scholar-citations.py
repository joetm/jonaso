#!/usr/bin/env python3

import os
import re
import json
import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


SCHOLAR_ID = 'ucO_QYQAAAAJ'

URL = f'https://scholar.google.com/citations?user={SCHOLAR_ID}&hl=en'

ua = UserAgent(platforms='desktop')
useragent = ua.random
headers = {
#   'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36',
  'User-Agent': useragent,
  # 'Referer': 'https://new.precisionconference.com/user/login',
  # 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}

with open('scholar_cookie.txt', encoding='utf-8') as f: cookie = f.read().strip()

# def open_browser_firefox(url):
#     print('Fetching publication citations from Google Scholar...')
#     profile_dir = os.path.expanduser("~/snap/firefox/common/selenium-profile")
#     os.makedirs(profile_dir, exist_ok=True)
#     opts = Options()
#     opts.add_argument("-profile")    # critical for Snap
#     opts.add_argument(profile_dir)   # critical for Snap
#     opts.binary_location="/snap/bin/firefox"                        # Snap path
#     svc = Service("/usr/local/bin/geckodriver")                       # your geckodriver path
#     opts.headless = True  # Enable headless mode
#     opts.add_argument("--headless")  # Ensures headless is added as an argument
#     opts.add_argument("--disable-gpu")  # This can help on some platforms
#     opts.add_argument("--no-sandbox")  # This parameter is often necessary on Linux environments
#     opts.add_argument("--disable-dev-shm-usage")  # Overcomes limited resource problems
#     driver = webdriver.Firefox(service=svc, options=opts)
#     driver.get(url)
#     # click the more link until the bitter end
#     while True:
#         more_link = driver.find_element(By.ID, "gsc_bpf_more")
#         if more_link.get_attribute('disabled') is not None:
#             break
#         current_row_count = len(driver.find_elements(By.XPATH, "//table[@id='gsc_a_t']/tbody/tr"))
#         more_link.click()
#         # Wait until the number of rows in the table increases
#         WebDriverWait(driver, 10).until(
#             lambda d: len(d.find_elements(By.XPATH, "//table[@id='gsc_a_t']/tbody/tr")) > current_row_count
#         )
#     # now return table
#     tbody = driver.find_element(By.ID, "gsc_a_b")
#     return tbody.get_attribute('outerHTML')

def open_browser_libre(url):
    print('Fetching publication citations from Google Scholar...')
    opts = Options()
    opts.binary_location = "/usr/bin/librewolf"  # adjust if installed elsewhere
    svc = Service("/usr/local/bin/geckodriver")
    opts.add_argument("--headless")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")

    # anti-detection settings
    opts.set_preference("dom.webdriver.enabled", False)
    opts.set_preference("useAutomationExtension", False)
    opts.set_preference("general.useragent.override", "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0")
    opts.set_preference("privacy.resistFingerprinting", False)  # LibreWolf has this on by default, which ironically is a fingerprint
    opts.set_preference("webgl.disabled", False)
    opts.set_preference("media.peerconnection.enabled", True)

    driver = webdriver.Firefox(service=svc, options=opts)

    driver.get("https://scholar.google.com")

    # Parse and set each cookie
    for pair in cookie.split('; '):
        name, _, value = pair.partition('=')
        driver.add_cookie({"name": name.strip(), "value": value.strip(), "domain": ".google.com"})

    # Remove the webdriver flag from navigator
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    driver.get(url)

    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.ID, "gsc_bpf_more"))
    )
    while True:
        more_link = driver.find_element(By.ID, "gsc_bpf_more")
        if more_link.get_attribute('disabled') is not None:
            break
        current_row_count = len(driver.find_elements(By.XPATH, "//table[@id='gsc_a_t']/tbody/tr"))
        more_link.click()
        WebDriverWait(driver, 10).until(
            lambda d: len(d.find_elements(By.XPATH, "//table[@id='gsc_a_t']/tbody/tr")) > current_row_count
        )
    tbody = driver.find_element(By.ID, "gsc_a_b")
    html = tbody.get_attribute('outerHTML')
    driver.quit()
    return html


pub_table_html = open_browser_libre(URL)
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
