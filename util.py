import base64

from PIL import ImageDraw, ImageFont
from PIL import Image
from constants import fonts_path
import cairosvg
import re
import io


def adjust_font_size(text, font, max_width):
    while font.getbbox(text)[2] > max_width:
        font_size = font.size - 1
        font = ImageFont.truetype(fonts_path, font_size)
    return font


def split_small_text_to_fit(text, font, max_width):
    lines = []
    words = text.split()
    current_line = words[0]

    for word in words[1:]:
        test_line = f"{current_line} {word}"
        if font.getbbox(test_line)[2] <= max_width:
            current_line = test_line
        else:
            lines.append(current_line)
            current_line = word

    lines.append(current_line)
    return lines


def split_text_to_fit(text, max_word):
    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        test_line = current_line + " " + word if current_line else word
        if len(test_line.split()) > max_word:
            lines.append(current_line)
            current_line = word
        else:
            current_line = test_line
    if current_line:
        lines.append(current_line)
    return lines


def draw_text_and_logo_on_image(background, json_data, logo, law_text):
    draw = ImageDraw.Draw(background)
    image_width, image_height = background.size
    max_word = 4
    add_font_size = 0
    padding_y = 0
    padding_x = 0
    if image_height <= 600:
        padding_y = -30
        padding_x = 10
        add_font_size = -7
    elif image_height < 1200:
        padding_y = 70
    else:
        padding_y = 130
        max_word = 5
        add_font_size = 20



    if background.getpixel((0, 0)) == (242, 242, 242, 255):
        color = "#0269B6"
        small_text_color = "#808080"

    else:
        color = "#f2f2f2"
        small_text_color = "#bababa"

    # Нанесение текста
    for item in json_data["texts"]:
        text = item["text"]
        coordinates = item["coordinates"]
        style = item["style"]
        x, y = int(coordinates["x"]), int(coordinates["y"]) + padding_y
        font_size = style["font-size"] + add_font_size
        text_color = color

        font = ImageFont.truetype(fonts_path, font_size)

        lines = split_text_to_fit(text, max_word)

        # Рисуем текст построчно
        for line in lines:
            # Проверяем, содержит ли строка числа
            number_match = re.search(r"\d+", line)
            if number_match:
                number_index = number_match.start()
                text_before_number = line[:number_index]
                text_after_number = line[number_index:]

                # Рисуем первую часть текста
                draw.text((x, y), text_before_number, font=font, fill=text_color)
                y += (
                    font.getbbox(text_before_number)[3]
                    - font.getbbox(text_before_number)[1]
                )

                # Увеличиваем размер шрифта для чисел и последующей части текста
                increased_font_size = font_size + 3
                increased_font = ImageFont.truetype(fonts_path, increased_font_size)
                draw.text(
                    (x-padding_x, y), text_after_number, font=increased_font, fill=text_color
                )
                y += (
                    increased_font.getbbox(text_after_number)[3]
                    - increased_font.getbbox(text_after_number)[1]
                )
            else:
                draw.text((x, y), line, font=font, fill=text_color)
                y += font.getbbox(line)[3] - font.getbbox(line)[1]

    # Добавляем маленький серый текст в левом нижнем углу
    small_font_size = int(font_size / 2.3)
    small_font = ImageFont.truetype(fonts_path, small_font_size)

    max_small_text_width = int(image_width * 0.45)
    small_text_lines = split_small_text_to_fit(
        law_text, small_font, max_small_text_width
    )

    small_text_y = image_height - 20
    for line in reversed(small_text_lines):
        line_bbox = small_font.getbbox(line)
        small_text_x = 10
        small_text_y -= line_bbox[3] - line_bbox[1]
        draw.text(
            (small_text_x, small_text_y), line, font=small_font, fill=small_text_color
        )

    # Размеры заднего фона
    bg_width, bg_height = background.size

    # Увеличиваем логотип
    logo_scale_factor = 1
    new_logo_width = int((bg_width / 2) * logo_scale_factor)
    new_logo_height = int(
        (bg_height / 2) * logo_scale_factor
    )  # Сдвиг по оси Y для создания эффекта полу овала
    logo = logo.resize((new_logo_width, new_logo_height), Image.LANCZOS)

    # Создаем маску для логотипа в виде полу овала
    mask_size = (new_logo_width, new_logo_height)
    mask = Image.new("L", mask_size, 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.pieslice([0, 0, mask_size[0] * 2, mask_size[1] * 2], 130, 300, fill=255)

    # Создаем изображение для обводки
    outline = Image.new("L", mask_size, 0)
    draw_outline = ImageDraw.Draw(outline)
    draw_outline.pieslice(
        [0, 0, mask_size[0] * 2, mask_size[1] * 2], 130, 300, outline=255, width=2
    )

    # Позиционируем логотип в нижнем правом углу, сдвигая его влево
    position = (bg_width - new_logo_width, bg_height - new_logo_height)

    # Создаем новый слой для логотипа и маски
    logo_layer = Image.new("RGBA", background.size)
    logo_layer.paste(logo, position, mask)

    # Накладываем обводку
    draw_logo_layer = ImageDraw.Draw(logo_layer)
    draw_logo_layer.bitmap(position, outline, fill=color)

    # Накладываем логотип на задний фон
    background = Image.alpha_composite(background.convert("RGBA"), logo_layer)
    background.save(f"back{color}.png", "PNG")
    return background


def draw_text_and_logo_on_image_without_text(background, logo):

    if background.getpixel((0, 0)) == (242, 242, 242, 255):
        color = "#0269B6"
    else:
        color = "#f2f2f2"


    # Размеры заднего фона
    bg_width, bg_height = background.size

    # Увеличиваем логотип
    logo_scale_factor = 1
    new_logo_width = int((bg_width / 2) * logo_scale_factor)
    new_logo_height = int(
        (bg_height / 2) * logo_scale_factor
    )  # Сдвиг по оси Y для создания эффекта полу овала
    logo = logo.resize((new_logo_width, new_logo_height), Image.LANCZOS)

    # Создаем маску для логотипа в виде полу овала
    mask_size = (new_logo_width, new_logo_height)
    mask = Image.new("L", mask_size, 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.pieslice([0, 0, mask_size[0] * 2, mask_size[1] * 2], 130, 300, fill=255)

    # Создаем изображение для обводки
    outline = Image.new("L", mask_size, 0)
    draw_outline = ImageDraw.Draw(outline)
    draw_outline.pieslice(
        [0, 0, mask_size[0] * 2, mask_size[1] * 2], 130, 300, outline=255, width=2
    )

    # Позиционируем логотип в нижнем правом углу, сдвигая его влево
    position = (bg_width - new_logo_width, bg_height - new_logo_height)

    # Создаем новый слой для логотипа и маски
    logo_layer = Image.new("RGBA", background.size)
    logo_layer.paste(logo, position, mask)

    # Накладываем обводку
    draw_logo_layer = ImageDraw.Draw(logo_layer)
    draw_logo_layer.bitmap(position, outline, fill=color)

    # Накладываем логотип на задний фон
    background = Image.alpha_composite(background.convert("RGBA"), logo_layer)
    background.save(f"back{color}.png", "PNG")
    return background

def overlay_svg_on_image(background_color, sample):
    if background_color == (242, 242, 242):
        png_data = cairosvg.svg2png(url="assets/Frame.svg")
    else:
        png_data = cairosvg.svg2png(url="assets/logo_white.svg")
    # Конвертируем SVG в PNG
    # Открываем PNG как изображение
    logo = Image.open(io.BytesIO(png_data))

    original_logo_width = 510
    original_logo_height = 106

    scale_factor = min(
        sample[0] / 2.5 / original_logo_width, sample[1] / 2.5 / original_logo_height
    )
    target_logo_width = int(original_logo_width * scale_factor)
    target_logo_height = int(original_logo_height * scale_factor)

    logo = logo.resize((target_logo_width, target_logo_height), Image.BILINEAR)

    # Вычисляем отступы
    padding_x = int(sample[0] * 0.05)
    padding_y = int(sample[1] * 0.05)

    # Вычисляем позицию логотипа
    position = (padding_x, padding_y)

    # Создаем фон
    background = Image.new("RGBA", (sample[0], sample[1]), background_color)

    # Накладываем логотип на фон
    background.paste(logo, position, logo)

    return background


def pil_image_to_bytes(image: Image) -> bytes:
    byte_stream = io.BytesIO()
    image.save(
        byte_stream, format="PNG"
    )  # You can change the format as needed (e.g., PNG, JPEG, etc.)
    image_bytes = byte_stream.getvalue()
    byte_stream.close()

    return image_bytes


def pil_image_to_base64(image: Image.Image) -> str:
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")
