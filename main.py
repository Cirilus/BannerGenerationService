from constants import MODEL_PATH
from model import LLama3Quantized
from schemas import ModelKwargs

kwargs = ModelKwargs(
    temperature=0.7,
    top_k=30,
    top_p=0.9,
    max_tokens=8192,
    repeat_penalty=1.1,
)
llm = LLama3Quantized()
llm.load_model(MODEL_PATH, kwargs)
