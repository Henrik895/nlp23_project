from transformers import pipeline
from pydantic import BaseModel
import os
import random

from fastapi import FastAPI

app = FastAPI()

class RequestBody(BaseModel):
    text: str


def complete(text):
    model_path = os.getenv('MODEL_PATH', "model")
    tokenizer_path = os.getenv('TOKENIZER_PATH', "tokenizer")
    generator = pipeline('text-generation', model=model_path, tokenizer=tokenizer_path)
    results = generator(text, max_length = 150, num_return_sequences=5)
    id = random.randint(0, 4) # 4 is inc
    return results[id]['generated_text']


@app.post("/")
def complete_text(body: RequestBody):
    return {"text": complete(body.text)}