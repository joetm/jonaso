#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os, sys

# from langchain.text_splitter import CharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings
from CustomMetadataLoader import CustomLoader
from tqdm import tqdm

from fnmatch import fnmatch

# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]


# Function to process documents from a directory
def process_documents(directory, glob_pattern, text_splitter, embeddings, db):
    loader = DirectoryLoader(directory, glob=glob_pattern, show_progress=True)
    documents = loader.load()
    for document in documents:
        # Split each document into chunks
        chunks = text_splitter.split_documents([document])
        # Generate embeddings for the chunks and add them to the FAISS index
        for chunk in chunks:
            embedding = embeddings.embed_text(chunk)
            db.add_embeddings([embedding])


loader = DirectoryLoader('./text_extra/', glob="**/*.txt", show_progress=True)
documents = loader.load()
print(f"{len(documents)} extra documents")

embeddings = OpenAIEmbeddings()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000000, chunk_overlap=0)
chunks = text_splitter.split_documents(documents)
print(f"{len(chunks)} chunks")

db = FAISS.from_documents(chunks, embeddings)
# db.save_local("faiss_index")

# text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
# process_documents('./text/', "**/*.txt", text_splitter, embeddings, db)
# process_documents('./text_extra/', "**/*.txt", text_splitter, embeddings, db)

db.save_local("faiss_index")
