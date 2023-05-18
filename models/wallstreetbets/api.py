from transformers import pipeline
from pydantic import BaseModel
import random

from fastapi import FastAPI

app = FastAPI()

class RequestBody(BaseModel):
    text: str

def complete(text):
   generator = pipeline('text-generation', model='model_2000', tokenizer='tokenizer')
   results = generator(text, max_length = 150, num_return_sequences=10)
   id = random.randint(0, 9)
   return results[id]['generated_text']

@app.post("/")
def complete_text(body: RequestBody):
    completed_text = complete(body.text)
    return {"text": completed_text}