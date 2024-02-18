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
from CustomMetadataLoader import CustomLoader
from fnmatch import fnmatch
from tqdm import tqdm
# import hashlib
from ListLoader import ListLoader


# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]


BATCH_SIZE = 500
USE_COMPRESSION = True

IS_PROD = True
if IS_PROD:
    folder1 = './text_extra/'
    folder2 = './text/'
else:
    folder1 = './testing/test1/'
    folder2 = './testing/test2/'


CACHE_FOLDER = './cache_embeddings'


def split_list(lst, batch_size=500):
    return [lst[i:i + batch_size] for i in range(0, len(lst), batch_size)]


# Function to process documents from a directory
def batch_ingest(directory, text_splitter, embeddings, db, batch_size=500):
    num_batch_docs = 0
    num_batch_chunks = 0

    items = []
    for path, subdirs, files in os.walk(directory, followlinks=False):
        for name in files:
            if name.endswith('.txt'):
                fullpath = os.path.join(path, name)
                items.append(fullpath)

    batches = split_list(items, batch_size)

    batch_num = 0
    for batch in batches:
        batch_num += 1

        print(f'loading batch {batch_num}/{len(batches)}...')
        loader = ListLoader(batch, show_progress=True)
        documents = loader.load()

        # custom ingest for caching embedding API calls
        print('ingesting batch...')
        for document in tqdm(documents):
            doc_meta = document.metadata
            source = doc_meta['source']
            cache_id = source.replace('/', '_').replace('.txt', '.json.gz')
            cache_path = os.path.join(CACHE_FOLDER, cache_id)
            if os.path.exists(cache_path):
                if USE_COMPRESSION:
                    text_embeddings = compress_json.load(cache_path)
                else:
                    with open(cache_path, 'r') as f: text_embeddings = json.load(f)
            else:
                chunks = text_splitter.split_documents([document]) # Split each document into chunks
                chunk_txts = [ str(chunk.page_content) for chunk in chunks ]
                # chunk_metas = [ chunk.metadata for chunk in chunks ]
                chunk_embeds = embeddings.embed_documents(chunk_txts)
                text_embeddings = list(zip(chunk_txts, chunk_embeds))
                # save cache
                if USE_COMPRESSION:
                    compress_json.dump(text_embeddings, cache_path)
                else:
                    with open(cache_path, 'w') as f: json.dump(text_embeddings, f)
            if not len(text_embeddings): continue
            # store embeddings in vectorstore
            db.add_embeddings(text_embeddings) # TODO: , metadatas=chunk_metas
            # db.add_texts(chunk_txts, metadatas=chunk_metas)
            num_batch_chunks += len(text_embeddings)
            num_batch_docs += 1

        # save batch progress
        db.save_local("faiss_index")

    return (num_batch_docs, num_batch_chunks)


# https://api.python.langchain.com/en/latest/embeddings/langchain_openai.embeddings.base.OpenAIEmbeddings.html
# embeddings = OpenAIEmbeddings(disallowed_special=())
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
chunks = text_splitter.split_documents(extra_docs)
num_extra_chunks = len(chunks)
print(f"{num_extra_chunks} extra chunks")

# ----
# docs
# ----
# loader = DirectoryLoader('./text/', glob="**/*.txt", show_progress=True)
# docs = loader.load()
# num_docs = len(docs)
# print(f"{num_docs} PDF documents")
# text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
# chunks2 = text_splitter.split_documents(docs)
# num_chunks = len(chunks2)

# chunks = chunks1 + chunks2
# num_chunks = len(chunks)

# print(f"{num_chunks} chunks")


# ingest chunks
db = FAISS.from_documents(chunks, embeddings)
db.save_local("faiss_index")

del chunks
del loader

# ----
# docs
# ----
num_docs = 0
num_chunks = 0
print("Processing docs")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
num_docs, num_chunks = batch_ingest(folder2, text_splitter, embeddings, db, batch_size=BATCH_SIZE)


stats = {
    "total": num_docs + num_extra_docs,
    "docs": num_docs,
    "extra_docs": num_extra_docs,
    "chunks": num_chunks + num_extra_chunks,
    "modified": int(time.time())
}
with open('stats.json', 'w') as f:
    json.dump(stats, f)

