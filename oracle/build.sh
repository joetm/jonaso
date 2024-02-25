#!/usr/bin/bash

# create repository:
# gcloud artifacts repositories create jonaso-query --repository-format=docker --location=europe-west4 --description="Docker repository for jonaso-query"

./prepare_extra.py
./prepare.py

cp -r ./faiss_index ./gcloud-query/
cp ./stats.json ./gcloud-query/

cd ./gcloud-query/

