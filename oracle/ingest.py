#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os, sys
import time
import json
import compress_json

# from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
# from CustomMetadataLoader import CustomLoader
from fnmatch import fnmatch
from tqdm import tqdm
# import hashlib
# from ListLoader import ListLoader


# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]


IS_PROD = False
if IS_PROD:
    folder1 = './text_extra/'
    folder2 = './text/'
else:
    folder1 = './testing/test1/'
    folder2 = './testing/test2/'




# https://api.python.langchain.com/en/latest/embeddings/langchain_openai.embeddings.base.OpenAIEmbeddings.html
embeddings = OpenAIEmbeddings(deployment="text-embedding-3-small", disallowed_special=()) # dimensions=256

# ----------
# extra docs
# ----------
print("Processing extra docs")
loader = DirectoryLoader(folder1, glob="**/*.txt", show_progress=True)
extra_docs = loader.load()
num_extra_docs = len(extra_docs)
print(f"{num_extra_docs} extra documents")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000000, chunk_overlap=0)
chunks1 = text_splitter.split_documents(extra_docs)
num_extra_chunks = len(chunks1)
print(f"{num_extra_chunks} extra chunks")

# ----
# docs
# ----
loader = DirectoryLoader(folder2, glob="**/*.txt", show_progress=True)
docs = loader.load()
num_docs = len(docs)
print(f"{num_docs} PDF documents")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
chunks2 = text_splitter.split_documents(docs)

chunks = chunks1 + chunks2
num_chunks = len(chunks)

# ingest chunks
db = FAISS.from_documents(chunks, embeddings)
db.save_local("faiss_index")

del chunks
del loader

# ----
# docs
# ----

stats = {
    "total": num_docs + num_extra_docs,
    "docs": num_docs,
    "extra_docs": num_extra_docs,
    "chunks": num_chunks + num_extra_chunks,
    "modified": int(time.time())
}
with open('stats.json', 'w') as f:
    json.dump(stats, f)

