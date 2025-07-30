#!/usr/bin/env python3
"""
Status LLMs Research Script - Unified API Version
Uses AI/ML API for all models with a single API key
Simpler setup but may have different model availability
"""

import os
import json
import time
import logging
from typing import Dict, Any
from dataclasses import dataclass
import requests

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@dataclass
class ModelConfig:
    name: str
    api_name: str

# Model configurations for AI/ML API
# Based on research of available models
MODELS = [
    ModelConfig("claude-sonnet-4", "anthropic/claude-4-sonnet"),
    ModelConfig("claude-opus-4", "anthropic/claude-4-opus"),
    ModelConfig("gemini-2.5-pro", "google/gemini-2.5-pro"),
    ModelConfig("grok-4", "x-ai/grok-4"),
    ModelConfig("gpt-4.1", "openai/gpt-4.1"),
    ModelConfig("gpt-4o", "openai/gpt-4o"),
    ModelConfig("gpt-o3", "openai/o3"),
    ModelConfig("kimi-v2", "moonshot/kimi-k2-instruct"),
    ModelConfig("deepseek-r1", "deepseek/deepseek-r1"),
]

TEMPERATURES = [0.2, 0.7, 1.0, 1.2]

# AI/ML API endpoint
API_BASE_URL = "https://api.aimlapi.com/v1/chat/completions"

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

def call_model_unified(model_name: str, prompt: str, temperature: float) -> str:
    """Call model through AI/ML API"""
    headers = {
        "Authorization": f"Bearer {os.getenv('AIMLAPI_KEY')}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": model_name,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": temperature,
        "max_tokens": 2000
    }
    
    response = requests.post(API_BASE_URL, headers=headers, json=data, timeout=30)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

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

def check_api_key():
    """Check that AI/ML API key is available"""
    if not os.getenv('AIMLAPI_KEY'):
        logger.error("Missing AIMLAPI_KEY environment variable")
        logger.error("Please add it to your .env.local file")
        logger.error("Get your key from: https://aimlapi.com/")
        return False
    
    logger.info("AI/ML API key found")
    return True

def test_api_connection():
    """Test API connection with a simple call"""
    try:
        logger.info("Testing API connection...")
        response = call_model_unified("openai/gpt-4o", "Hello, please respond with just 'API test successful'", 0.7)
        if "API test successful" in response:
            logger.info("API connection test passed")
            return True
        else:
            logger.warning("API connection test unclear")
            return True  # Still proceed
    except Exception as e:
        logger.error("API connection test failed: %s", e)
        return False

def main():
    """Main execution function"""
    logger.info("Starting Status LLMs Research (Unified API Version)")
    
    # Check prerequisites
    if not check_api_key():
        return
    
    if not test_api_connection():
        logger.error("Cannot proceed without working API connection")
        return
    
    ensure_data_directory()
    prompt = load_prompt()
    
    total_calls = len(MODELS) * len(TEMPERATURES)
    completed = 0
    failed = 0
    
    logger.info("Will make %d API calls total", total_calls)
    
    for config in MODELS:
        for temperature in TEMPERATURES:
            try:
                logger.info("Progress: %d/%d | Calling %s (temp: %s)", completed, total_calls, config.name, temperature)
                
                # Call the model
                response = call_model_unified(config.api_name, prompt, temperature)
                
                # Parse and validate response
                data = parse_response(response)
                
                # Save results
                save_results(config, temperature, data)
                
                completed += 1
                
                # Rate limiting - wait between calls
                time.sleep(1)
                
            except Exception as e:
                logger.error("Failed to process %s at temp %s: %s", config.name, temperature, e)
                failed += 1
                continue
    
    logger.info("Research completed!")
    logger.info("Successful: %d/%d", completed, total_calls)
    logger.info("Failed: %d/%d", failed, total_calls)
    logger.info("Results saved in the 'data' directory")

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv('.env.local')
    
    main()