import torch
from datasets import Dataset
from transformers import (AutoModelForCausalLM, AutoTokenizer, DataCollatorForLanguageModeling,
                          TrainingArguments, Trainer, BitsAndBytesConfig)
import time


datasets = [
           "antiwork-subreddit.json",
           "million-reddit-answers.json",
           "reddit-climate-change.json",
           "reddit-irl.json",
           "combined.json",
]

checkpoints = [
  #  ("EleutherAI/gpt-neo-125m", [50000, 100000]), # checkpoint and [amounts]
  #  ("EleutherAI/gpt-neo-1.3B", [10000, 50000, 100000]),
  #  ("EleutherAI/gpt-neo-2.7B", [10000, 25000]),
  #  ("EleutherAI/gpt-j-6b", [10000, 25000]),
  #  ("mosaicml/mpt-7b", [5000, 10000]),
  #  ("decapoda-research/llama-7b-hf", [5000, 10000]),
    ("gpt2", [10000, 50000]),
]

def tokenize_function(examples):
     
    if tokenizer.eos_token is None:
        tokenizer.eos_token = "<EOS>"
        print("<EOS> token added")
    if tokenizer.bos_token is None:
        tokenizer.bos_token = "<BOS>"
        print("<BOS> token added")
    if tokenizer.pad_token is None:
        tokenizer.pad_token = "<PAD>"
        print("<PAD> token added")
    return tokenizer(examples["comments"], padding="max_length", truncation=True, add_special_tokens=True)


if __name__ == '__main__':
    _tokenizer = None
    for checkpoint, amounts in checkpoints:
        print(f"Training {checkpoint}")
        try:
            tokenizer = AutoTokenizer.from_pretrained(checkpoint, trust_remote_code=True, use_fast=True)
            _tokenizer = tokenizer
            if tokenizer.pad_token is None:
                tokenizer.pad_token = "<PAD>"
                print("<PAD> token added")
        except Exception as e:
            print(e)
            tokenizer = _tokenizer

        data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)
        training_args = TrainingArguments("training", max_steps=300,  auto_find_batch_size=True)

        for dataset in datasets:
            name = dataset.split(".")[0]
            tokenized_datasets = Dataset.from_json(dataset)
            tokenized_datasets = tokenized_datasets.map(tokenize_function, batched=True, remove_columns=["comments"])

            for amount in amounts:
                base_name = f"{name}{amount}_redditGPT_{checkpoint}"
                _tokenized = tokenized_datasets.select(range(amount))
                model = AutoModelForCausalLM.from_pretrained(checkpoint, trust_remote_code=True) #device_map='auto', quantization_config=BitsAndBytesConfig(load_in_8bit=True, llm_int8_threshold=200.0, load_in_8bit_fp32_cpu_offload=True))
                # Initialize the Trainer
                start_time = time.time()
                print(f"Initializing trainer for {base_name}")
                trainer = Trainer(
                    model=model,
                    args=training_args,
                    train_dataset=_tokenized,
                    data_collator=data_collator,
                    tokenizer=tokenizer,
                )
                print("Training...")
                trainer.train()
                print(f"Training took {time.time() - start_time} seconds")
                #tokenizer.save_pretrained(f"tokenizer/{base_name}_tokenizer")
                trainer.save_model(f"model/{base_name}_model")
                print("Finished saving model...")
                # print(f"Saving tokenizer...")
                model = None
                trainer = None
                torch.cuda.empty_cache()
                time.sleep(60) 
                # tokenizer.save_pretrained(f"tokenizer/{base_name}_tokenizer")
