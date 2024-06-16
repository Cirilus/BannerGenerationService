from typing import List

from PIL import Image

from constants import COLORS
from main import GenerateImage
from util import draw_text_and_logo_on_image, overlay_svg_on_image

genImage = GenerateImage()


def result_pipeline_llm(
    content: str, json_data: dict, width: int, height: int, law_text: str
) -> List[Image]:
    logo_image = generate_photo_pipeline(content=content)
    result_banner = []
    for color in COLORS:
        background = overlay_svg_on_image(
            background_color=color, sample=(width, height)
        )
        banner = draw_text_and_logo_on_image(
            background=background,
            logo=logo_image,
            json_data=json_data,
            law_text=law_text,
        )
        result_banner.append(banner)
    return result_banner


def generate_photo_pipeline(content: str):
    prompt = genImage.init_style(content)
    logo_image = genImage.gen_logo(prompt)
    return logo_image
