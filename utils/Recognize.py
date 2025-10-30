# https://universe.roboflow.com/dk-ipu4r/vegetable-classification-t6t4d/model/1

from PIL import Image
import os
import tempfile
from inference_sdk import InferenceHTTPClient
import asyncio


async def recognize_async(image_pil: Image.Image) -> dict:
    client = InferenceHTTPClient(
        api_url="https://serverless.roboflow.com",
        api_key="G1F1T8rZDpAB5gRrJa13"
    )
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        temp_path = tmp.name
        image_pil.save(temp_path, format="JPEG")
    try:
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None,
            lambda: client.infer(temp_path, model_id="vegetable-classification-t6t4d/1")
        )
        return result["top"]
    finally:
        os.remove(temp_path)


def recognize(image_pil: Image.Image) -> dict:
    client = InferenceHTTPClient(
        api_url="https://serverless.roboflow.com",
        api_key="G1F1T8rZDpAB5gRrJa13"
    )
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        temp_path = tmp.name
        image_pil.save(temp_path, format="JPEG")

    try:
        result = client.infer(temp_path, model_id="vegetable-classification-t6t4d/1")
        return result["top"]
    finally:
        os.remove(temp_path)


def test():
    pil_image = Image.open("../52788.jpg").convert("RGB")
    result = recognize(pil_image)
    print(result)


if __name__ == "__main__":
    test()
