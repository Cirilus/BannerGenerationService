mak.PHONY: up
up:
	poetry run uvicorn app:app --reload --port 8000

download_models:
	mkdir -p models && cd models && wget -O realisticVisionV60B1_v51HyperVAE.safetensors https://civitai.com/api/download/models/501240?type=Model&format=SafeTensor&size=full&fp=fp16
