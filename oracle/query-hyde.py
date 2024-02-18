#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os, sys

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]

# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'

# from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_core.prompts.prompt import PromptTemplate
from langchain_core.runnables import RunnableParallel
from langchain_core.output_parsers.string import StrOutputParser
from langchain.chains import LLMChain
from langchain_openai import OpenAI
from langchain_openai import OpenAIEmbeddings
# from langchain_openai import ChatOpenAI


model = OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0.0, max_tokens=500)

question = "What are the difficulties of moderating twitch communities?"

# hyde
hyde_prompt = f"""Please write a passage to answer the question 
Question: {question}
Passage:"""
hyde_doc = model.invoke(hyde_prompt)
# print(hyde_doc)

embeddings = OpenAIEmbeddings()
db = FAISS.load_local("chi_faiss_index", embeddings)
# retriever = db.as_retriever(search_kwargs={"k": 10})

# hyde_docs = db.similarity_search_with_score(hyde_doc)
# hyde_context = [ d[0].page_content for d in hyde_docs ]
# hyde_context = "\n\n".join(hyde_context)

# prompt_with_hyde = f"""Answer the question based only on the following context: 

# {hyde_context}

# Question: {question}
# """
# print(prompt_with_hyde)

docs = db.similarity_search_with_score(question)
# docs = retriever.get_relevant_documents(query)

context = [ d[0].page_content for d in docs ]
context = "\n\n".join(context)

prompt = f"""Answer the question based only on the following context: 

{context}

Question: {question}
"""
print(prompt)

print('')
print('===')
print('')

answer = model.invoke(prompt)
print(answer)
