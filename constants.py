negative_prompt = "text(deformed iris, deformed pupils, text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, UnrealisticDream"
extra_prompt = (
    " RAW photo, subject, 8k uhd, dslr, soft lighting, high quality, film grain"
)
num_inference_steps = 20
height = 600
width = 600
pathSD = "models/realisticVisionV60B1_v51HyperVAE.safetensors"
lora_path = "lora/FedorBondarchuk.safetensors"
output_path = "output/"
fonts_path = "fonts/Manrope-Regular.ttf"
logo_output = "output/logoSd.png"

prompt_list = {
    "Реалистичный": {
        "Потребительский кредит": "Hyper-realistic depiction of a bag overflowing with money, various currencies, and gold coins, next to a watch showing the time, cinematic composition, trending on Artstation.  Ultrarealistic, HDR, 8K",
        "Автомобильный кредит": "Realistic painting of a beautiful modern car with a glossy blue finish, filling the entire frame. The car is set against a sunny day in a vibrant cityscape, with reflections of contemporary buildings and a clear blue sky on its surface. The scene is enhanced with a cinematic color palette, emphasizing the blue theme and the car's sleek design, trending on Artstation. Ultrarealistic, HDR, 8K",
        "Кредит под залог недвижимости": "Hyper-realistic depiction of a real estate loan agreement on a desk, surrounded by house keys, a small model house, and a pen, cinematic composition, trending on Artstation.  Ultrarealistic, HDR, 8K",
        "Кредитная карта": "High-quality, hyper-realistic depiction of a blue credit card with an intricate blue and orange gas flame pattern, featuring no text or numbers, cinematic composition, trending on Artstation.Ultrarealistic, HDR, 8K",
        "Премиальная дебетовая карта": "High-quality, hyper-realistic depiction of a gold debit card with a lot of money stay around it, cinematic composition, trending on Artstation.Ultrarealistic, HDR, 8K",
        "Ипотека": "High-quality, hyper-realistic depiction of a large, One beautiful house with its own yard, featuring a swimming pool and a BBQ area, surrounded by lush greenery, cinematic composition, trending on Artstation.  Ultrarealistic, HDR, 8K"},
    "Мультик": {
        "Потребительский кредит": "Cartoon image of a bag overflowing with money, various currencies, and gold coins, next to a clock showing the time. The scene is vibrant and colorful, with exaggerated features and expressive details, reminiscent of a Disney animation. Cinematic composition, popular on Artstation. Disney, HDR, 8K",
        "Автомобильный кредит": "Cartoon style illustration of a bright blue car with big, expressive eyes and a friendly smile, set against a colorful and whimsical background. The car has a shiny, smooth finish and vibrant shades of blue, designed to appeal to young children. The setting includes playful elements like balloons, clouds, and a sunny sky. Cinematic composition, high quality, suitable for kids.",
        "Кредит под залог недвижимости": "Cartoon style illustration of a real estate loan agreement on a desk, Disney style. The desk is surrounded by house keys, a small model of a house, and a pen. The scene is colorful and whimsical, with a playful and friendly atmosphere. The loan agreement has clear, readable text, and the objects are detailed with smooth, shiny finishes. Cinematic composition, high quality, suitable for a wide audience. Cartoon.",
        "Кредитная карта": "Cartoon style illustration of a blue credit card featuring an intricate blue-orange pattern of a gas flame, Disney style. The credit card is devoid of text and numbers, set against a vibrant, playful background. The scene has a whimsical and friendly atmosphere, with smooth, shiny finishes and bright colors designed to appeal to children. Cinematic composition, high quality, trending on Artstation. Suitable for a children's photo, cartoon.",
        "Премиальная дебетовая карта": "Cartoon style, hyperrealistic image of a black debit card surrounded by piles of colorful money, Disney style. The debit card has a sleek, shiny finish and is set against a playful, vibrant background filled with whimsical elements like sparkling stars and animated coins. The scene is designed to appeal to children with bright colors and friendly visuals. Cinematic composition, high quality, suitable for children.",
        "Ипотека": "Cartoon style illustration of a very beautiful fairy-tale orphanage, designed in Disney style. The orphanage features whimsical architecture with turrets, colorful roofs, and charming details. The scene is vibrant and magical, with lush greenery, flowers, and a bright blue sky. Children are happily playing around the orphanage, adding a sense of joy and enchantment. The overall atmosphere is warm and inviting, with a touch of fantasy. Cinematic composition, high quality, suitable for children."
    },
    "Искусство": {
        "Потребительский кредит": "Masterful painting in the style of Van Gogh, depicting a bag overflowing with money, various currencies, and gold coins, next to a clock showing the time. The scene features Van Gogh’s signature swirling patterns and vibrant color palette, with expressive brushstrokes bringing the bag, money, and clock to life. The composition is dynamic and richly textured, creating a sense of movement and energy. HDR, 8K resolution, trending on Artstation.",
        "Автомобильный кредит": "An artistic format painting in the style of Van Gogh, depicting a old car. The machine is brought to life with Van Gogh's signature swirling patterns and vibrant colors, blending seamlessly into a richly textured background. The dynamic brushstrokes and expressive style capture the essence of movement and energy, emphasizing the intricate details and unique design of the machine. The overall composition is vivid and cohesive, creating a visually captivating image. HDR, 8K resolution, painting, fine art, in the style of Van Gogh.",
        "Кредит под залог недвижимости": "An artistic format painting in the style of Van Gogh, depicting a loan agreement for the purchase of real estate on a desk. The desk features a small model of a house, house keys, and a pen, all rendered with Van Gogh's signature swirling patterns and vibrant colors. The loan agreement has clear, readable text, blending seamlessly into the textured, dynamic background. The scene is colorful and quirky, with a playful and friendly atmosphere. The objects are detailed with a smooth, shiny finish, capturing the essence of Van Gogh's expressive style. Cinematic composition, high quality, suitable for a wide audience. HDR, 8K resolution, painting, fine art, in the style of Van Gogh.",
        "Кредитная карта": "An artistic format painting in the style of Van Gogh, depicting a credit  card with a sea theme. The  credit  card is adorned with swirling patterns and vibrant colors reminiscent of Van Gogh's expressive brushstrokes, capturing the essence of waves and ocean currents.  credit  card The background complements the theme with a textured, dynamic portrayal of the sea, blending seamlessly with the card's design.  credit  card The overall scene is lively and vivid, evoking a sense of movement and energy. HDR, 8K resolution, painting, fine art, in the style of Van Gogh.",
        "Премиальная дебетовая карта": "An artistic format painting in the style of Van Gogh, depicting a woman's hands holding a credit card. The card is adorned with a crown, symbolizing kings, wealth, and gold, and features Van Gogh's signature swirling patterns and vibrant colors. In the background, a man wearing a crown stands, embodying the essence of royalty and opulence. The scene is richly textured and dynamic, with expressive brushstrokes creating a sense of movement and energy. The overall composition is vivid and lively, capturing themes of luxury and grandeur. HDR, 8K resolution, painting, fine art, in the style of Van Gogh.",
        "Ипотека": "An artistic format painting in the style of Van Gogh, depicting a manor with its flower garden. The manor is illustrated with Van Gogh's signature swirling patterns and vibrant colors, highlighting its architectural elegance. The flower garden surrounding the manor is painted with expressive brushstrokes, showcasing a variety of colorful blooms in rich, dynamic textures. The background seamlessly blends with the foreground, creating a cohesive and lively scene. The overall composition is vivid and enchanting, exuding a sense of beauty and sophistication. HDR, 8K resolution, painting, fine art, in the style of Van Gogh."
    },
    "Аниме": {
        "Потребительский кредит": "Anime style illustration in the style of Hayao Miyazaki, depicting an abundance of wealth with lots of money, gold, and bags of money. The scene features detailed, whimsical elements characteristic of Miyazaki's work, with piles of gold coins and neatly stacked bills overflowing from burlap bags. The background showcases a magical, enchanting setting with soft, warm lighting, enhancing the sense of opulence and fantasy. The composition is intricate and lively, capturing the playful yet rich artistry of Miyazaki. Cinematic composition, high quality, suitable for a wide audience.",
        "Автомобильный кредит": "Anime style illustration in the style of Hayao Miyazaki, depicting an anime blue car driving around a vibrant city. The car is sleek and detailed, moving through streets lined with cherry blossom (sakura) trees in full bloom. Petals float gently in the air, adding a touch of whimsy and beauty to the scene. The cityscape features Miyazaki's signature intricate architecture, with buildings and bustling streets bathed in warm, soft lighting. The overall composition is dynamic and enchanting, capturing the lively and magical essence of Miyazaki's work. Cinematic composition, high quality, suitable for a wide audience.",
        "Кредит под залог недвижимости": "Anime style illustration in the style of Hayao Miyazaki, depicting a close-up of a table. On the table, there is a piece of paper and a pen with an ink bottle, all rendered with intricate, whimsical details. Beside the paper, there is a small, charming house, seemingly crafted from the same ink. The scene is bathed in soft, warm lighting, with delicate, playful elements capturing the enchanting and magical essence of Miyazaki's work. The background is richly textured and subtly blends into the foreground, creating a cohesive and lively composition. Cinematic composition, high quality, suitable for a wide audience.",
        "Кредитная карта": "Anime style illustration in the style of Hayao Miyazaki, depicting a close-up of a credit card adorned with sakura and flowers. The  credit card features intricate, whimsical details with vibrant colors and delicate cherry blossoms in full bloom. The flowers are rendered with Miyazaki's signature attention to detail, creating a sense of enchantment and beauty. The background is softly lit and textured, enhancing the magical and serene atmosphere.   credit card The overall composition is visually captivating and elegant, capturing the essence of Miyazaki's art. Cinematic composition, high quality, suitable for a wide audience.",
        "Премиальная дебетовая карта": "Anime style illustration in the style of Hayao Miyazaki, depicting a close-up of a large, rich credit card adorned with designs inspired by palaces and emperors. The credit card features intricate, ornate patterns with luxurious colors, showcasing elements of elegant palace architecture and imperial symbols. The details are rendered with Miyazaki's signature attention to detail, creating a sense of opulence and grandeur. credit card The background is softly lit and richly textured, enhancing the regal and majestic atmosphere. The overall composition is visually captivating and sophisticated, capturing the essence of Miyazaki's art. Cinematic composition, high quality, suitable for a wide audience.",
        "Ипотека": "Anime style illustration ikn the style of Hayao Miyazaki, depicting a rich and elegant house surrounded by cherry blossoms. The house features intricate architectural details with a sense of opulence and charm. The garden is in full bloom with delicate cherry blossoms, their petals gently floating in the air. The scene is bathed in soft, warm lighting, creating an enchanting and serene atmosphere. The background is richly textured with lush greenery and whimsical elements characteristic of Miyazaki's work. The overall composition is visually captivating and magical, capturing the essence of Miyazaki's art. Cinematic composition, high quality, suitable for a wide audience."
    },
    "Звезды": {
        "Потребительский кредит": "<lora:FedorBondarchuk:0.7>Man bondarchuk, Ultrarealistic, HDR, 8K.",
        "Автомобильный кредит": "<lora:FedorBondarchuk:0.7>Man bondarchuk, Ultrarealistic, HDR, 8K.",
        "Кредит под залог недвижимости": "<lora:FedorBondarchuk:0.7> Manbondarchuk, Ultrarealistic, HDR, 8K.",
        "Кредитная карта": "<lora:FedorBondarchuk:0.7> Man bondarchuk, Ultrarealistic, HDR, 8K.",
        "Премиальная дебетовая карта": "<lora:FedorBondarchuk:0.7> Man bondarchuk, Ultrarealistic, HDR, 8K.",
        "Ипотека": "<lora:FedorBondarchuk:0.7>Man bondarchuk. Ultrarealistic, HDR, 8K."}
}

# num_sample
SAMPLES = {
    "mobile": {
        "size": (384, 624),
    },
    "large": {
        "size": (2048, 1500),
    },
    "standart": {
        "size": (1024, 724),
    },
    "small": {
        "size": (512, 256),
    },
    "square": {
        "size": (1024, 1024),
    },
}

COLORS = [(242, 242, 242), (2, 105, 182)]
