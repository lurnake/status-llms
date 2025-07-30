#!/usr/bin/env python3
"""
Status LLMs Research Script - Comprehensive AI Model Analysis

This script calls multiple AI models to get their perspective on high-status 
activities and objects in contemporary society across different temperature settings.

🚀 QUICK START:
1. Copy env_template.txt to .env.local
2. Add your API keys to .env.local 
3. Install dependencies: pip install -r requirements.txt
4. Run: python run_status_research.py

📊 SUPPORTED MODELS:
✅ Claude Sonnet 4 & Opus 4 (temps: 0.2, 0.7, 1.0)
✅ Gemini 2.5 Pro (temps: 0.2, 0.7, 1.0, 1.2)
✅ Grok-4 (temps: 0.2, 0.7, 1.0, 1.2)
✅ Kimi K2 (temps: 0.2, 0.7, 1.0)
✅ DeepSeek R1 (temps: 0.2, 0.7, 1.0, 1.2)
✅ GPT-4.1 & GPT-4o (temps: 0.2, 0.7, 1.0, 1.2)
❌ GPT-o3 (requires OpenAI organization verification)

🔧 TEMPERATURE LIMITATIONS:
- Anthropic (Claude): Max 1.0
- Moonshot (Kimi): Max 1.0  
- Google (Gemini): Up to 1.2
- xAI (Grok): Up to 1.2
- DeepSeek: Up to 1.2
- OpenAI (GPT): Up to 1.2

⚡ The script automatically skips unsupported temperature/model combinations
📁 Results are saved to data/ directory as JSON files
"""

import os
import json
import time
import logging
from typing import Dict, Any
from dataclasses import dataclass
import openai
from anthropic import Anthropic
from google import genai
import requests

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class ModelConfig:
    name: str
    api_name: str
    provider: str
    endpoint: str = None

# Model configurations based on research
MODELS = [
    # 🤖 ANTHROPIC MODELS (Max temperature: 1.0)
    ModelConfig("claude-sonnet-4", "claude-sonnet-4-20250514", "anthropic"),
    ModelConfig("claude-opus-4", "claude-opus-4-20250514", "anthropic"),
    
    # 🌟 GOOGLE MODELS (Supports temperature: 0.2-1.2)
    ModelConfig("gemini-2.5-pro", "gemini-2.5-pro", "google"),
    
    # 🚀 XAI MODELS (Supports temperature: 0.2-1.2)
    ModelConfig("grok-4", "grok-4", "xai"),
    
    # 🌙 MOONSHOT AI MODELS (Max temperature: 1.0)
    ModelConfig("kimi-k2", "kimi-k2-0711-preview", "moonshot"),
    
    # 🧠 DEEPSEEK MODELS (Supports temperature: 0.2-1.2)
    ModelConfig("deepseek-r1", "deepseek-reasoner", "deepseek"),
    
    # 🔥 OPENAI MODELS (Supports temperature: 0.2-1.2)
    ModelConfig("gpt-4.1", "gpt-4.1", "openai"),
    ModelConfig("gpt-4o", "gpt-4o", "openai"),
    
    # ❌ UNAVAILABLE MODELS (Uncomment when you have access)
    # ModelConfig("gpt-o3", "o3", "openai"),  # Requires OpenAI org verification
    # 
    # TO ENABLE GPT-O3:
    # 1. Get your OpenAI organization verified at: https://platform.openai.com/settings/organization/general
    # 2. Uncomment the line above
    # 3. Ensure you have OPENAI_API_KEY in .env.local
    # 4. Re-run the script
]

TEMPERATURES = [0.2, 0.7, 1.0, 1.2]  # Script auto-handles model temperature limits

def get_max_temperature(provider: str) -> float:
    """Get the maximum supported temperature for each model provider"""
    provider_temp_limits = {
        "anthropic": 1.0,    # Claude models max at 1.0
        "moonshot": 1.0,     # Kimi models max at 1.0
        "google": 1.2,       # Gemini supports up to 1.2
        "xai": 1.2,          # Grok supports up to 1.2
        "deepseek": 1.2,     # DeepSeek supports up to 1.2
        "openai": 1.2,       # GPT models support up to 1.2
    }
    return provider_temp_limits.get(provider, 1.0)

def should_skip_temperature(provider: str, temperature: float) -> bool:
    """Check if we should skip this temperature for this provider"""
    max_temp = get_max_temperature(provider)
    return temperature > max_temp

def load_prompt() -> str:
    """Load the research prompt from file"""
    try:
        with open('prompt.md', 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract the prompt after "Begin your response:"
            start_marker = "Begin your response:"
            if start_marker in content:
                return content.split(start_marker)[0] + start_marker
            return content
    except FileNotFoundError:
        logger.error("prompt.md file not found")
        raise

def ensure_data_directory():
    """Create data directory if it doesn't exist"""
    os.makedirs('data', exist_ok=True)

def call_openai_model(model_name: str, prompt: str, temperature: float) -> str:
    """Call OpenAI models"""
    client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    response = client.chat.completions.create(
        model=model_name,
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        max_tokens=2000
    )
    return response.choices[0].message.content

def call_anthropic_model(model_name: str, prompt: str, temperature: float) -> str:
    """Call Anthropic models"""
    client = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    
    # Clamp temperature to Anthropic's maximum of 1.0
    clamped_temp = min(temperature, 1.0)
    
    response = client.messages.create(
        model=model_name,
        max_tokens=2000,
        temperature=clamped_temp,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text

def call_google_model(model_name: str, prompt: str, temperature: float) -> str:
    """Call Google models using new google-genai library"""
    from google.genai import types
    
    # Create client (it automatically picks up GEMINI_API_KEY from environment)
    client = genai.Client()
    
    logger.info(f"Calling Google model {model_name} with temp {temperature}")
    
    # Configure generation settings 
    # Note: Gemini 2.5 Pro requires thinking mode, Flash can have it disabled
    if "pro" in model_name.lower():
        # Pro models require thinking mode
        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=4000  # Increased for thinking + response
            # No thinking_config for Pro models - they require thinking mode
        )
        logger.info("Using thinking mode for Pro model")
    else:
        # Flash models can disable thinking for speed
        config = types.GenerateContentConfig(
            temperature=temperature,
            max_output_tokens=2000,
            thinking_config=types.ThinkingConfig(thinking_budget=0)
        )
        logger.info("Disabled thinking mode for Flash model")
    
    response = client.models.generate_content(
        model=model_name,
        contents=prompt,
        config=config
    )
    
    response_text = response.text
    logger.info(f"Raw Google response length: {len(response_text)}")
    logger.info(f"Raw Google response preview: {response_text[:200]}...")
    
    # Handle markdown-wrapped JSON from Gemini
    original_text = response_text
    if '```json' in response_text:
        # Extract JSON from markdown code blocks
        import re
        json_match = re.search(r'```json\s*({.*?})\s*```', response_text, re.DOTALL)
        if json_match:
            response_text = json_match.group(1)
            logger.info("Extracted JSON from ```json``` blocks")
    elif '```' in response_text:
        # Handle plain code blocks
        import re
        json_match = re.search(r'```\s*({.*?})\s*```', response_text, re.DOTALL)
        if json_match:
            response_text = json_match.group(1)
            logger.info("Extracted JSON from ``` blocks")
    
    logger.info(f"Final response for parsing: {response_text[:200]}...")
    return response_text

def call_xai_model(model_name: str, prompt: str, temperature: float) -> str:
    """Call xAI models using OpenAI client"""
    from openai import OpenAI
    
    client = OpenAI(
        api_key=os.getenv('GROK_API_KEY'),
        base_url="https://api.x.ai/v1",
    )
    
    # Add delay to handle rate limiting
    time.sleep(3)
    
    response = client.chat.completions.create(
        model=model_name,
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        max_tokens=2000
    )
    return response.choices[0].message.content

def call_moonshot_model(model_name: str, prompt: str, temperature: float) -> str:
    """Call Moonshot AI models - Free tier: 6 RPM limit"""
    headers = {
        "Authorization": f"Bearer {os.getenv('MOONSHOT_API_KEY')}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": model_name,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
        "max_tokens": 2000
    }
    
    logger.info(f"Calling Moonshot API with model: {model_name}")
    logger.info(f"Free tier rate limit: 6 RPM (waiting 12 seconds between requests)")
    
    # Free tier limit: 6 RPM = 1 request every 10 seconds minimum
    # Using 12 seconds to be safe
    time.sleep(12)
    
    try:
        response = requests.post("https://api.moonshot.ai/v1/chat/completions",
                               headers=headers, json=data, timeout=90)
        
        logger.info(f"Moonshot response status: {response.status_code}")
        
        if response.status_code == 403:
            logger.error("Moonshot 403 Forbidden - possible API key issue or model access")
            logger.error(f"Response: {response.text}")
        elif response.status_code == 429:
            logger.error("Moonshot rate limit exceeded - need longer delays")
            logger.error(f"Response: {response.text}")
            
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"]
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Moonshot API request failed: {e}")
        raise

def call_deepseek_model(model_name: str, prompt: str, temperature: float) -> str:
    """Call DeepSeek models"""
    headers = {
        "Authorization": f"Bearer {os.getenv('DEEPSEEK_API_KEY')}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": model_name,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
        "max_tokens": 6000  # Further increased for reasoning model at higher temperature
    }
    
    logger.info(f"Calling DeepSeek API with model: {model_name}")
    logger.info(f"Request data: {data}")
    
    try:
        response = requests.post("https://api.deepseek.com/v1/chat/completions",
                               headers=headers, json=data, timeout=180)  # 3 minutes for reasoning model
        
        logger.info(f"DeepSeek response status: {response.status_code}")
        logger.info(f"DeepSeek response headers: {dict(response.headers)}")
        
        if response.status_code != 200:
            logger.error(f"DeepSeek API error response: {response.text}")
            
        response.raise_for_status()
        result = response.json()
        logger.info(f"DeepSeek response: {result}")
        
        # DeepSeek reasoning model puts JSON in content, reasoning in reasoning_content
        message = result["choices"][0]["message"]
        logger.info("Using content field from DeepSeek response (JSON is there, not in reasoning_content)")
        return message["content"]
        
    except requests.exceptions.Timeout:
        logger.error("DeepSeek API request timed out after 180 seconds (reasoning model takes longer)")
        raise
    except requests.exceptions.RequestException as e:
        logger.error(f"DeepSeek API request failed: {e}")
        raise

def call_model(config: ModelConfig, prompt: str, temperature: float) -> str:
    """Route to the appropriate API based on provider"""
    logger.info("Calling %s (temp: %s)", config.name, temperature)
    
    try:
        if config.provider == "openai":
            return call_openai_model(config.api_name, prompt, temperature)
        elif config.provider == "anthropic":
            return call_anthropic_model(config.api_name, prompt, temperature)
        elif config.provider == "google":
            return call_google_model(config.api_name, prompt, temperature)
        elif config.provider == "xai":
            return call_xai_model(config.api_name, prompt, temperature)
        elif config.provider == "moonshot":
            return call_moonshot_model(config.api_name, prompt, temperature)
        elif config.provider == "deepseek":
            return call_deepseek_model(config.api_name, prompt, temperature)
        else:
            raise ValueError(f"Unknown provider: {config.provider}")
    except Exception as e:
        logger.error("Error calling %s: %s", config.name, e)
        raise

def parse_response(response: str) -> Dict[str, Any]:
    """Parse the model response and extract JSON"""
    try:
        # Try to find JSON in the response
        start = response.find('{')
        end = response.rfind('}') + 1
        
        if start == -1 or end == 0:
            raise ValueError("No JSON found in response")
        
        json_str = response[start:end]
        data = json.loads(json_str)
        
        # Validate the structure
        if "items" not in data:
            raise ValueError("Missing 'items' key in response")
        
        for item in data["items"]:
            if not all(key in item for key in ["name", "type", "rating"]):
                raise ValueError("Item missing required keys")
            
            if item["type"] not in ["activity", "object"]:
                raise ValueError(f"Invalid type: {item['type']}")
            
            if not isinstance(item["rating"], (int, float)) or not 1 <= item["rating"] <= 100:
                raise ValueError(f"Invalid rating: {item['rating']}")
        
        return data
    except (json.JSONDecodeError, ValueError) as e:
        logger.error("Failed to parse response: %s", e)
        logger.error("Response: %s...", response[:500])
        raise

def save_results(config: ModelConfig, temperature: float, data: Dict[str, Any]):
    """Save results to JSON file"""
    filename = f"data/{config.name}_{temperature}.json"
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    logger.info("Saved results to %s", filename)

def check_api_keys():
    """Check that all required API keys are available"""
    required_keys = [
        'OPENAI_API_KEY',
        'ANTHROPIC_API_KEY',
        'GEMINI_API_KEY',
        'GROK_API_KEY',
        'MOONSHOT_API_KEY',
        'DEEPSEEK_API_KEY'
    ]
    
    missing_keys = [key for key in required_keys if not os.getenv(key)]
    
    if missing_keys:
        logger.error("Missing API keys: %s", missing_keys)
        logger.error("Please add them to your .env.local file")
        return False
    
    logger.info("All API keys found")
    return True

def main():
    """Main execution function"""
    logger.info("Starting Status LLMs Research")
    
    # Check prerequisites
    if not check_api_keys():
        return
    
    ensure_data_directory()
    prompt = load_prompt()
    
    total_calls = len(MODELS) * len(TEMPERATURES)
    completed = 0
    
    logger.info("Will make %d API calls total", total_calls)
    
    for config in MODELS:
        for temperature in TEMPERATURES:
            # Check if this model supports this temperature
            if should_skip_temperature(config.provider, temperature):
                logger.info("⚠️ Skipping %s at temp %s - exceeds max temp %s", 
                           config.name, temperature, get_max_temperature(config.provider))
                completed += 1
                continue
            
            # Check if we already have this result
            filename = f"data/{config.name}_{temperature}.json"
            if os.path.exists(filename):
                logger.info("✅ Skipping %s at temp %s - already exists", config.name, temperature)
                completed += 1
                continue
                
            try:
                logger.info("🔄 Progress: %d/%d - Calling %s (%s) at temp %s", 
                           completed, total_calls, config.name, config.api_name, temperature)
                
                # Call the model
                response = call_model(config, prompt, temperature)
                
                # Parse and validate response
                data = parse_response(response)
                
                # Save results
                save_results(config, temperature, data)
                
                completed += 1
                logger.info("✅ Successfully processed %s at temp %s", config.name, temperature)
                
                # Rate limiting - longer wait for problematic providers
                if config.provider == "moonshot":
                    # Already waited 12 seconds in call_moonshot_model
                    delay = 0
                elif config.provider in ["xai", "deepseek"]:
                    delay = 5
                else:
                    delay = 2
                time.sleep(delay)
                
            except Exception as e:
                logger.error("❌ Failed to process %s at temp %s: %s", config.name, temperature, e)
                logger.error("Error type: %s", type(e).__name__)
                if hasattr(e, 'response') and hasattr(e.response, 'status_code'):
                    logger.error("HTTP Status: %s", e.response.status_code)
                continue
    
    logger.info("Research completed! Processed %d/%d successfully", completed, total_calls)
    logger.info("Results saved in the 'data' directory")

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv('.env.local')
    
    main()