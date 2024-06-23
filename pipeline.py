import torch

from constants import COLORS
from main import GenerateImage
from util import draw_text_and_logo_on_image, overlay_svg_on_image, draw_text_and_logo_on_image_without_text

genImage = GenerateImage()


def result_pipeline_llm(content: str, json_data: dict, width: int, height: int, law_text: str, photo_style: str):
    logo_image = generate_photo_pipeline(content=content, photo_style=photo_style)
    result_banner = []
    for color in COLORS:
        background = overlay_svg_on_image(
            background_color=color,
            sample=(width, height),
        )
        banner = draw_text_and_logo_on_image(
            background=background,
            logo=logo_image,
            json_data=json_data,
            law_text=law_text,
        )
        result_banner.append(banner)
    torch.cuda.empty_cache()
    return result_banner


def result_pipeline_llm_without_text(content: str, width: int, height: int, photo_style: str):
    logo_image = generate_photo_pipeline(content=content, photo_style=photo_style)
    result_banner = []
    for color in COLORS:
        background = overlay_svg_on_image(
            background_color=color,
            sample=(width, height),
        )
        banner = draw_text_and_logo_on_image_without_text(
            background=background,
            logo=logo_image,
        )
        result_banner.append(banner)

    torch.cuda.empty_cache()
    return result_banner


def generate_photo_pipeline(content: str, photo_style: str):
    prompt = genImage.init_style(content=content, photo_style=photo_style)
    logo_image = genImage.gen_logo(prompt)
    torch.cuda.empty_cache()
    return logo_image
