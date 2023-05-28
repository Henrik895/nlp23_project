FROM python:3.10

ENV MODEL_PATH=model

ENV TOKENIZER_PATH=tokenizer

WORKDIR /

COPY ./requirements.txt /requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./api.py /api.py

COPY ./model /model

COPY ./tokenizer /tokenizer

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]