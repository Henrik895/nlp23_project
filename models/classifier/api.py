from transformers import pipeline
from pydantic import BaseModel
import os
import random

from fastapi import FastAPI

app = FastAPI()

class RequestBody(BaseModel):
    text: str


labels = {
    'LABEL_0': 'cryptocurrency',
    'LABEL_1': 'me_irl',
    'LABEL_2': 'wallstreetbets',
    'LABEL_3': 'antiwork',
    'LABEL_4': 'other'
}


def transform_result(result):
    label = labels[result['label']]
    prob = round(result['score'] * 100, 1)
    return label, prob


def classify(text):
    model_path = os.getenv('MODEL_PATH', "model")
    tokenizer_path = os.getenv('TOKENIZER_PATH', "tokenizer")
    classifier = pipeline('text-classification', model=model_path, tokenizer=tokenizer_path)
    result = classifier(text)[0]
    return transform_result(result)


@app.post("/")
def complete_text(body: RequestBody):
    label, confidence = classify(body.text)
    return {"label": label, "confidence": confidence}