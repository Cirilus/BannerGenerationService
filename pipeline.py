import torch

from constants import SYSTEM_PROMPT, USER_PROMPT_WITH_TEMPLATE
from main import llm


def llama3_pipeline(extra_content: str, content: str, width: int, height: int) -> dict:
    try:
        llm.add_message("system", SYSTEM_PROMPT)
        llm.add_message(
            "user",
            USER_PROMPT_WITH_TEMPLATE.format(
                content=content,
                extra_content=extra_content,
                image_size=f"{width}x{height}",
            ),
        )
        answer = llm.inference(add_answer_to_chat=True, need_parse_json=True)
        llm.add_message("assistant", answer)
        llm.clean_chat()
        torch.cuda.empty_cache()
        return answer
    except (ValueError, RuntimeError) as e:
        print(f"Ошибка: {e}")