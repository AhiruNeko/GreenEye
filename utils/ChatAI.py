import asyncio
import json
import httpx
from typing import Optional


async def chat_ai(prompt: str, config_path: str = "./ai_config.json") -> Optional[str]:
    """异步调用 HKBU GenAI 平台 GPT API 并返回回复文本"""
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            config = json.load(f)
        api_key = config["api_key"]
        endpoint = config["endpoint"]
        model = config["model"]
        api_version = config["api_version"]
    except Exception as e:
        return "Error loading config: " + str(e)

    # ✅ 正确的 URL（注意包含 /api/v0/rest）
    url = f"{endpoint}{model}/chat/completions?api-version={api_version}"

    headers = {
        "Content-Type": "application/json",
        "api-key": api_key
    }

    payload = {
        "messages": [{"role": "user", "content": prompt}]
    }

    try:
        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(url, headers=headers, json=payload)

        if response.status_code == 200:
            result = response.json()
            return result["choices"][0]["message"]["content"]
        else:
            return f"Call failed: {response.status_code} - {response.text}"

    except Exception as e:
        return "Request exception: " + str(e)


async def test():
    result = await chat_ai("hello")
    print(result)


if __name__ == "__main__":
    asyncio.run(test())
