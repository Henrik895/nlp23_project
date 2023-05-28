# Models

The model and tokenizer files for each model can be created by running the provided notebooks (notebooks are usually created in Colab, but they can be easily converted for running locally).

It is possible to run models straight from the .py file or as a container.

## Run api.py

Make sure that the folder, where api.py is located, has the model and tokenizer folders with files that are created when model is saved. If the folder names of the model and tokenizer and not respectively `model` and `tokenizer` then specify the real names as environment variables:

```
export MODEL_PATH=something
export TOKENIZER_PATH=something_2
```

Run the api with `uvicorn api:app --host 0.0.0.0 --port 8000`.

## Container

Make sure that the folder, where api.py is located, has the model and tokenizer folders with files that are created when saving the model.
If the folder names are different then specify them in the ARG variables in the beginning of the Dockerfile.

Run `docker build -t api .` in the same folder where the Dockerfile is located to build the container and start the api with `docker run -p8000:8000 api` command.

## Check

To check whether the api is working you can open a new terminal and type `curl -XPOST http://localhost:8000 -H 'Content-Type: application/json' -d '{"text": "Start of a sentence "}'`. It should not take more than a couple of seconds to create a response.


