from diffusers import StableDiffusionPipeline, EulerDiscreteScheduler
from constants import (
    negative_prompt,
    num_inference_steps,
    height,
    width,
    pathSD,
    lora_path,
    prompt_list,
)


class GenerateImage:
    def __init__(self):
        self.model_path = pathSD
        self.lora_path = lora_path
        self.pipeSD = StableDiffusionPipeline.from_single_file(
            self.model_path,
            local_files_only=True,
            force_download=False,
            token=False,
            use_safetensors=True,
        ).to("cuda")
        self.pipeSD.scheduler = EulerDiscreteScheduler.from_config(
            self.pipeSD.scheduler.config
        )

    def init_style(self, content: str, need_lora: bool = False):
        service_info = prompt_list.get(content, "Информация об услуге не найдена")
        if need_lora:
            self.pipeSD.load_lora_weights(lora_path)
        return service_info

    def gen_logo(self, prompt):
        image = self.pipeSD(
            prompt=prompt,
            negative_prompt=negative_prompt,
            guidance_scale=5.0,
            clip_skip=2,
            num_inference_steps=num_inference_steps,
            height=height,
            ross_attention_kwargs={"scale": 0.7},
            width=width,
        ).images[0]
        return image
