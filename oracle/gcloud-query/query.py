#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

# import os

import json
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

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional


# device = 'cuda' if torch.cuda.is_available() else 'cpu'
# if device == 'cuda':
#     flush()  # Flush GPU memory if necessary
        

model = OpenAI(model_name="gpt-3.5-turbo-instruct", temperature=0.0, max_tokens=500)


embeddings = OpenAIEmbeddings()
db = FAISS.load_local("faiss_index", embeddings)
# retriever = db.as_retriever(search_kwargs={"k": 10})


def build_prompt(question: str, context: str, history=Optional[List[str]] = None) -> str:
    if history and len(history): history_str = "\n".join( [ "User: " + x for x in history ] )
    else: history_str = "-"
    prompt = (f"Answer the question based only on the following context:\n\n"
              f"{context}\n\n"
              f"Chat history:\n{history_str}\n\n"
              f"Question: {question}")
    return prompt



app = FastAPI()

allowed_origins = [
    "http://localhost:8000",
    "https://www.jonaso.de",
    "https://jonaso.de",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["X-Requested-With", "Content-Type"],
)

@app.get("/status")
async def get_status():
    return {"status": "running", "message": "Container is up and ready to handle requests."}


@app.get("/stats")
async def get_status():
    with open('stats.json', 'r') as f:
        data = json.load(f)
    return data


@app.get("/", response_model=None)
async def read_root():
    return "Welcome home to the Terrordome, land of the forbidden"


class API_Input(BaseModel):
    query: str
    history: List[str]
class API_Output(BaseModel):
    role: str
    msg: str

@app.post("/query")
async def ask(obj: API_Input) -> API_Output:
    # question = "What are the difficulties of moderating twitch communities?"
    question = obj.query
    history = obj?.history
    if not question:
        return {"role": "oracle", "msg": ""}

    docs = db.similarity_search_with_score(question)
    # docs = retriever.get_relevant_documents(query)
    context = "\n\n".join( [ d[0].page_content for d in docs ] )
    prompt = build_prompt(question, context, history)
    answer = model.invoke(prompt)
    answer = answer.strip()
    if answer.startswith('Answer:'):
        answer = answer.replace('Answer:', '', 1)
    answer = answer.strip()

    return {"role": "oracle", "msg": answer}
