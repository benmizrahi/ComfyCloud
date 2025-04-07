FROM python:3.9

WORKDIR /usr/src/app

RUN pip install comfy-cli

RUN comfy --skip-prompt --here install --cpu 

RUN comfy node install comfyui-google-storage
RUN comfy node install https://github.com/ShmuelRonen/ComfyUI-Gemini_Flash_2.0_Exp.git
RUN comfy node install https://github.com/ShmuelRonen/ComfyUI_pixtral_large.git
RUN comfy node install https://github.com/CY-CHENYUE/ComfyUI-Gemini-API.git

# CMD ["comfy", "launch", "--", "--cpu", "--listen", "0.0.0.0"]

CMD ['python', 'main.py']