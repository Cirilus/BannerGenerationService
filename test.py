from main import GenerateImage
from util import draw_text_and_logo_on_image, overlay_svg_on_image
from constants import COLORS

genImage = GenerateImage()


def result_pipeline_llm(content: str, json_data: dict, law_text: str):
    logo_image = generate_photo_pipeline(content=content)
    result_banner = []
    for color in COLORS:
        background = overlay_svg_on_image(
            background_color=color,
            sample=(json_data["image_size"][0], json_data["image_size"][1]),
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


json_data = {
    "service": "Автомобильный кредит",
    "image_size": [500, 500],
    "background_color": [242, 242, 242],
    "logo": {"coordinates": {"x": 320, "y": 300, "width": 220, "height": 220}},
    "texts": [
        {
            "text": "Получите кредит без первоначального взноса!",
            "coordinates": {"x": 50, "y": 150},
            "style": {"font-size": 30, "color": "#f2f2f2"},
        },
        {
            "text": "Процентная ставка от низких!",
            "coordinates": {"x": 50, "y": 250},
            "style": {"font-size": 28, "color": "#f2f2f2"},
        },
        {
            "text": "Снизьте свои расходы с нашим кредитом!",
            "coordinates": {"x": 50, "y": 350},
            "style": {"font-size": 28, "color": "#f2f2f2"},
        },
    ],
}
result_pipeline_llm(
    content=json_data["service"], json_data=json_data, law_text="Юридический текст"
)

#{'service': 'Автомобильный кредит', 'image_size': [620, 800], 'background_color': [242, 242, 242], 'logo': {'coordinates': {'x': 350, 'y': 400, 'width': 260, 'height': 260}}, 'texts': [{'text': 'Без первоначального взноса и низкие проценты!', 'coordinates': {'x': 50, 'y': 100}, 'style': {'font-size': 34, 'color': '#f2f2f2'}}, {'text': 'Процентная ставка от 6.8%', 'coordinates': {'x': 50, 'y': 220}, 'style': {'font-size': 30, 'color': '#f2f2f2'}}, {'text': 'Быстро оформление и без лишних вопросов!', 'coordinates': {'x': 50, 'y': 340}, 'style': {'font-size': 30, 'color': '#f2f2f2'}}]}
#{'service': 'Автомобильный кредит', 'image_size': [620, 800], 'background_color': [242, 242, 242], 'logo': {'coordinates': {'x': 320, 'y': 300, 'width': 220, 'height': 220}}, 'texts': [{'text': 'Получите кредит без первоначального взноса!', 'coordinates': {'x': 50, 'y': 150}, 'style': {'font-size': 30, 'color': '#f2f2f2'}}, {'text': 'Процентная ставка от низких!', 'coordinates': {'x': 50, 'y': 250}, 'style': {'font-size': 28, 'color': '#f2f2f2'}}, {'text': 'Снизьте свои расходы с нашим кредитом!', 'coordinates': {'x': 50, 'y': 350}, 'style': {'font-size': 28, 'color': '#f2f2f2'}}]}
