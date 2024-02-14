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

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]

# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'

loader = DirectoryLoader('./text/', glob="**/*.txt", show_progress=True)
documents_1 = loader.load()

loader = DirectoryLoader('./text_extra/', glob="**/*.txt", show_progress=True)
documents_2 = loader.load()

documents = documents_1 + documents_2
print(f"{len(documents)} documents")

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)

chunks = text_splitter.split_documents(documents)
print(f"{len(chunks)} chunks")

embeddings = OpenAIEmbeddings()

db = FAISS.from_documents(chunks, embeddings)

db.save_local("faiss_index")
