from transformers import GPT2Tokenizer, GPT2LMHeadModel
from pydantic import BaseModel
import os

from fastapi import FastAPI

app = FastAPI()

class RequestBody(BaseModel):
    text: str


def complete(text):
    model_path = os.getenv('MODEL_PATH', "model")
    tokenizer_path = os.getenv('TOKENIZER_PATH', "tokenizer")

    tokenizer = GPT2Tokenizer.from_pretrained(tokenizer_path)
    tokenizer.pad_token = tokenizer.eos_token
    model = GPT2LMHeadModel.from_pretrained(model_path, pad_token_id=tokenizer.eos_token_id)

    input_ids = tokenizer.encode(text, return_tensors='pt')
    output = model.generate(input_ids, do_sample=True, max_length=250, top_p=0.90, top_k=15)[0]
    completed_text = tokenizer.decode(output, skip_special_tokens=True)
    return completed_text


@app.post("/")
def complete_text(body: RequestBody):
    return {"text": complete(body.text)}