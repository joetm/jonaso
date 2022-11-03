#!/usr/bin/python3

from transformers import pipeline

# summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
summarizer = pipeline("summarization", model="t5-base", tokenizer="t5-base", framework="tf")

output = summarizer("Paris is the capital and most populous city of France, with an estimated population of 2,175,601 residents as of 2018, in an area of more than 105 square kilometres (41 square miles). The City of Paris is the centre and seat of government of the region and province of Île-de-France, or Paris Region, which has an estimated population of 12,174,880, or about 18 percent of the population of France as of 2017.",  min_length=5, max_length=25)

print(output)
## [{ "summary_text": " Paris is the capital and most populous city of France..." }]




