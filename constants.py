negative_prompt = "text (deformed iris, deformed pupils, text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, UnrealisticDream"
extra_prompt = (
    " RAW photo, subject, 8k uhd, dslr, soft lighting, high quality, film grain"
)
num_inference_steps = 20
height = 600
width = 600
pathSD = "models/realisticVisionV60B1_v51HyperVAE.safetensors"
lora_path = "lora/Animated characters.safetensors"
output_path = "output/"
fonts_path = "fonts/Manrope-Regular.ttf"
logo_output = "output/logoSd.png"

prompt_list = {
    "Потребительский кредит": "Hyper-realistic depiction of a bag overflowing with money, various currencies, and gold coins, next to a watch showing the time, cinematic composition, trending on Artstation.  Ultrarealistic, HDR, 8K",
    "Автомобильный кредит": "Realistic painting of a beautiful modern car with a glossy blue finish, filling the entire frame. The car is set against a sunny day in a vibrant cityscape, with reflections of contemporary buildings and a clear blue sky on its surface. The scene is enhanced with a cinematic color palette, emphasizing the blue theme and the car's sleek design, trending on Artstation. Ultrarealistic, HDR, 8K",
    "Кредит под залог недвижимости": "Hyper-realistic depiction of a real estate loan agreement on a desk, surrounded by house keys, a small model house, and a pen, cinematic composition, trending on Artstation.  Ultrarealistic, HDR, 8K",
    "Кредитная карта": "High-quality, hyper-realistic depiction of a blue credit card with an intricate blue and orange gas flame pattern, featuring no text or numbers, cinematic composition, trending on Artstation.Ultrarealistic, HDR, 8K",
    "Премиальная дебетовая карта": "High-quality, hyper-realistic depiction of a gold debit card with a lot of money stay around it, cinematic composition, trending on Artstation.Ultrarealistic, HDR, 8K",
    "Ипотека": "High-quality, hyper-realistic depiction of a large, beautiful two-story house with its own yard, featuring a swimming pool and a BBQ area, surrounded by lush greenery, cinematic composition, trending on Artstation.  Ultrarealistic, HDR, 8K",
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