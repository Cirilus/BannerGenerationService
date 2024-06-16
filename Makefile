mak.PHONY: up
up:
	poetry run uvicorn app:app --reload --port 8000

download_models:
	mkdir -p models && cd models && wget https://huggingface.co/IlyaGusev/saiga_mistral_7b_gguf/resolve/main/model-q8_0.gguf
