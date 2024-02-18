#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os

from dotenv import load_dotenv
load_dotenv()
# os.environ["OPENAI_API_KEY"]

# Uncomment the following line if you need to initialize FAISS with no AVX2 optimization
# os.environ['FAISS_NO_AVX2'] = '1'

# from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
# from langchain_core.prompts.prompt import PromptTemplate
# from langchain_core.runnables import RunnableParallel
# from langchain_core.output_parsers.string import StrOutputParser
# from langchain.chains import LLMChain
from langchain_openai import OpenAI
from langchain_openai import OpenAIEmbeddings
# from langchain_openai import ChatOpenAI


model = OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0.0, max_tokens=500)

question = "What are the difficulties of moderating twitch communities?"

embeddings = OpenAIEmbeddings()
db = FAISS.load_local("faiss_index", embeddings)
# retriever = db.as_retriever(search_kwargs={"k": 10})

docs = db.similarity_search_with_score(question)
# docs = retriever.get_relevant_documents(query)

context = "\n\n".join( [ d[0].page_content for d in docs ] )

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

