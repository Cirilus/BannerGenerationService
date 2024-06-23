from main import GenerateImage
from util import draw_text_and_logo_on_image, overlay_svg_on_image, draw_text_and_logo_on_image_without_text
from constants import COLORS

genImage = GenerateImage()


def result_pipeline_llm(content: str, json_data: dict, width: int, height: int, law_text: str, photo_style: str):
    logo_image = generate_photo_pipeline(content=content, photo_style=photo_style)
    result_banner = []
    for color in COLORS:
        background = overlay_svg_on_image(
            background_color=color,
            sample=(width, height),
        )
        #banner_without_text = draw_text_and_logo_on_image_without_text(background=background, logo=logo_image)
        banner = draw_text_and_logo_on_image(
            background=background,
            logo=logo_image,
            json_data=json_data,
            law_text=law_text,
        )
        result_banner.append(banner)
    return result_banner


def generate_photo_pipeline(content: str, photo_style: str):
    prompt = genImage.init_style(content=content, photo_style=photo_style)
    logo_image = genImage.gen_logo(prompt)
    return logo_image

texts = "При сумме кредита от 1,5 млн руб. оформление возможно с суммированием основного и дополнительного доходов на предоставлении 2-НДФЛ. При сумме кредита от 3 млн руб. допуск возможен без первого взноса. Базовая ставка – 5,6%. При сумме кредита от 1 млн руб. срок 12–84 месяцев, ставка 5,9%. При сумме кредита от 1,5 млн руб. и подтвержденном доходе ставка 5,6%, срок 12–60 месяцев, сумма кредита – 3 млн руб., ставка 5,6%."

json_data = {'service': 'Ипотека', 'background_color': [2, 105, 182], 'logo': {'coordinates': {'x': 450, 'y': 300, 'width': 350, 'height': 350}}, 'texts': [{'text': 'Получите ключи от вашего дома с нами!', 'coordinates': {'x': 50, 'y': 150}, 'style': {'font-size': 34, 'color': '#f2f2f2'}}, {'text': 'Ипотека без комиссии, используйте нашу поддержку!', 'coordinates': {'x': 50, 'y': 250}, 'style': {'font-size': 30, 'color': '#f2f2f2'}}, {'text': 'Ипотека без халтури, только результат!', 'coordinates': {'x': 50, 'y': 350}, 'style': {'font-size': 30, 'color': '#f2f2f2'}}]}

result_pipeline_llm(
    content=json_data["service"], json_data=json_data, width=800, height=700, law_text=texts, photo_style="Реалистичный"
)

#