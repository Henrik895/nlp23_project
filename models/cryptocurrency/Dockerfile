FROM python:3.10

ARG MODEL_PATH=model
ARG TOKENIZER_PATH=tokenizer

ENV MODEL_PATH=${MODEL_PATH}
ENV TOKENIZER_PATH=${TOKENIZER_PATH}

WORKDIR /

COPY ./requirements.txt /requirements.txt

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY ./api.py /api.py
COPY ./${MODEL_PATH} /${MODEL_PATH}
COPY ./${TOKENIZER_PATH} /${TOKENIZER_PATH}

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8001"]