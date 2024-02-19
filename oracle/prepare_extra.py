#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os, sys

# from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
# from langchain_openai import OpenAIEmbeddings
from pathvalidate import sanitize_filename
from tqdm import tqdm
import hashlib

from fnmatch import fnmatch

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]

# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'


BASEPATHS = [
    "/home/jonas/RESEARCH/Literatur/",
    # "/home/jonas/RESEARCH/2-OULU/Courses/",
    # "/home/jonas/RESEARCH/2-OULU/Funding/",
    "/home/jonas/RESEARCH/Academic Working/",
    "/home/jonas/RESEARCH/Misc/",
    # "/home/jonas/RESEARCH/Papers/7-Accepted/",
    # "/home/jonas/RESEARCH/Papers/9-Others/",
]
# PATTERN = "[\!|\-]*.pdf"


# embeddings = OpenAIEmbeddings()


# pre-walk directories
# total_dirs = sum(1 for _, _, _ in os.walk(root, followlinks=False))
# total_files = 0
# for root in BASEPATHS:
#     total_files += sum(len([ f for f in files if f.endswith('.pdf') ]) for _, _, files in os.walk(root, followlinks=False))
# print(f"{total_files} papers")
# pbar = tqdm(total=total_files)


os.makedirs('./text_extra/issues', exist_ok=True)
os.makedirs('./text_extra/topics', exist_ok=True)
os.makedirs('./text_extra/applications', exist_ok=True)
os.makedirs('./text_extra/systems', exist_ok=True)


for root in BASEPATHS:
  for dirpath, subdirs, _ in os.walk(root, followlinks=False):

    parent = dirpath.split('/')[-1]
    sanitized_filename = sanitize_filename(parent.replace(" ", "_"))

    # --------------
    # === ISSUES ===
    # --------------
    if 'Issues' in subdirs:
      # get the issues
      issues_path = os.path.join(dirpath, 'Issues')
      issues = next(os.walk(issues_path, followlinks=False))[1] # Gets the immediate subdirectories
      # issues = [ i.split('/')[-1] for i in subdirs ]
      # print('Issues:', dirpath)
      if len(issues):
        issuelist = "- " + "\n- ".join([ i for i in issues if i != '__pycache__' ])
        doc_v1 = f"What are the issues with {parent}?\n"
        doc_v1 += f"{issuelist}"
        print(doc_v1)
        print()
        doc_v2 = f"What are the challenges of {parent}?\n"
        doc_v2 += f"{issuelist}"
        if sanitized_filename:
          with open(f'./text_extra/issues/{sanitized_filename}_v1.txt', 'w') as f:
            f.write(doc_v1)
          with open(f'./text_extra/issues/{sanitized_filename}_v2.txt', 'w') as f:
            f.write(doc_v2)

    # --------------------
    # === APPLICATIONS ===
    # --------------------
    if 'Applications' in subdirs:
      # get the issues
      app_path = os.path.join(dirpath, 'Applications')
      applications = next(os.walk(app_path, followlinks=False))[1] # Gets the immediate subdirectories
      # issues = [ i.split('/')[-1] for i in subdirs ]
      # print('Issues:', dirpath)
      if len(applications):
        applist = "- " + "\n- ".join([ i for i in applications if i != '__pycache__' ])
        doc = f"What are applications of {parent}?\n"
        doc += f"{applist}"
        print(doc)
        print()
        if sanitized_filename:
          with open(f'./text_extra/applications/{sanitized_filename}.txt', 'w') as f:
            f.write(doc)

    # ---------------
    # === SYSTEMS ===
    # ---------------
    sub_ids = []
    i = 0
    for sub in subdirs:
      if ('Systems' in sub) or ('Libraries' in sub) or ('Tools' in sub):
        sub_ids.append(i)
      i += 1
    if len(sub_ids):
      systems = []
      for id in sub_ids:
        systems_path = os.path.join(dirpath, subdirs[id])
        sub_systems = next(os.walk(systems_path, followlinks=False))[1] # Gets the immediate subdirectories
        systems.extend(sub_systems)

      if len(systems):
        doc = f"What are systems, libraries, tools for {parent}?\n"
        systemlist = "- " + "\n- ".join([ s for s in systems if s != '__pycache__' ])
        doc += f"{systemlist}"
        print(doc)
        print()
        if sanitized_filename:
          with open(f'./text_extra/systems/{sanitized_filename}.txt', 'w') as f:
            f.write(doc)



# BASEPATHS = [
#     "/home/jonas/RESEARCH/Literatur/",
#     "/home/jonas/RESEARCH/Academic Working/",
#     "/home/jonas/RESEARCH/Misc/",
# ]

# for aggregation of subdirs under different parent dirs
alltopics = {}

for root in BASEPATHS:
  for dirpath, subdirs, _ in os.walk(root, followlinks=False):

    parent = dirpath.split('/')[-1]
    if not parent: continue

    # --------------
    # === TOPICS ===
    # --------------
    topics = subdirs.copy()
    to_remove = ['Issues', 'Misc', 'General', 'General, Theory']
    for item in to_remove:
      if item in topics:
        topics.remove(item)
    if len(topics) > 1:
      try:
        alltopics[parent]['topics'].merge( topics )
        # alltopics[parent]['parents'].append( parent )
      except:
        alltopics[parent] = {'topics': topics}
        # alltopics[parent]['parents'] = [ parent ]

# save the aggregated topics
for parent in alltopics.keys():
  topics = alltopics[parent]['topics']
  sanitized_filename = sanitize_filename(parent.replace(" ", "_"))
  # parents = alltopics[parent]['parents']
  # doc = f"What are topics in {parent}?\n"
  doc = f"{parent}:\n"
  topiclist = "- " + "\n- ".join([ t for t in topics if t != '__pycache__' ])
  doc += f"{topiclist}"
  print(doc)
  print()
  if sanitized_filename:
    with open(f'./text_extra/topics/{sanitized_filename}.txt', 'w') as f:
      f.write(doc)

