# Status LLMs Research - Setup & Usage Guide

This project automates the collection of data from frontier AI models to understand how they perceive high-status activities and objects.

## Quick Start

### Option 1: Unified API (Recommended - Easiest Setup)

1. **Get API Key**
   ```bash
   # Sign up at https://aimlapi.com/ and get your API key
   ```

2. **Setup Environment**
   ```bash
   # Install dependencies
   pip install -r requirements.txt
   
   # Copy environment template
   cp env_template.txt .env.local
   
   # Edit .env.local and add your AI/ML API key:
   # AIMLAPI_KEY=your_actual_api_key_here
   ```

3. **Run Research**
   ```bash
   python run_status_research_unified.py
   ```

### Option 2: Individual APIs (More Control)

1. **Get Multiple API Keys**
   - OpenAI: https://platform.openai.com/api-keys
   - Anthropic: https://console.anthropic.com/
   - Google: https://aistudio.google.com/app/apikey
   - xAI: https://console.x.ai/
   - Moonshot: https://platform.moonshot.ai/
   - DeepSeek: https://platform.deepseek.com/

2. **Setup Environment**
   ```bash
   pip install -r requirements.txt
   cp env_template.txt .env.local
   # Add ALL API keys to .env.local
   ```

3. **Run Research**
   ```bash
   python run_status_research.py
   ```

## Models Tested

The research tests all of these frontier models:

- **Claude Sonnet 4** - Anthropic's latest balanced model
- **Claude Opus 4** - Anthropic's most capable model  
- **Gemini-2.5-pro** - Google's advanced reasoning model
- **Grok 4** - xAI's reasoning model with real-time data
- **GPT-4.1** - OpenAI's improved model with larger context
- **GPT-4o** - OpenAI's omni-modal model
- **GPT-o3** - OpenAI's advanced reasoning model
- **Kimi V2** - Moonshot AI's long-context model
- **DeepSeek-R1** - DeepSeek's reasoning model

## Temperature Settings

Each model is tested at 4 different temperature settings:
- **0.2** - Very focused, deterministic responses
- **0.7** - Balanced creativity and focus  
- **1.0** - More creative and varied responses
- **1.2** - Highly creative, diverse responses (many models don't' support temp values beyond 1.0)

## Output Format

Results are saved as JSON files in the `data/` directory with the naming pattern:
```
data/{model-name}_{temperature}.json
```

Each file contains:
```json
{
  "items": [
    {"name": "Private jet ownership", "type": "object", "rating": 95},
    {"name": "Attending Harvard", "type": "activity", "rating": 88}
  ]
}
```

## Research Prompt

The research uses a carefully crafted prompt that asks each model to:

1. Identify 25 high-status activities and objects
2. Rate each on a scale of 1-100 for status perception
3. Categorize each as either "activity" or "object"
4. Consider contemporary, global status perceptions
5. Return results in a structured JSON format

## Troubleshooting

### API Errors
- **Rate Limits**: The script includes delays between calls
- **Invalid Keys**: Check your API keys are correctly set in `.env.local`
- **Model Unavailable**: Some models may not be available in all regions

### Common Issues
- **JSON Parsing Errors**: Models sometimes return malformed JSON - the script will retry
- **Missing Dependencies**: Run `pip install -r requirements.txt`
- **Permission Errors**: Make sure you have write access to the `data/` directory

### API Key Issues
- **OpenAI**: Requires billing setup and credits
- **Anthropic**: May have waitlist for API access
- **Google**: Requires Google Cloud project setup
- **xAI**: Beta access may be required
- **Others**: Check respective documentation

## Cost Estimation

Approximate costs per complete run (all models, all temperatures):

**Unified API Option:**
- ~$15-30 total (varies by model availability)

**Individual APIs:**
- OpenAI: ~$5-10
- Anthropic: ~$5-10  
- Google: ~$2-5
- xAI: ~$3-8
- Others: ~$1-5 each
- **Total**: ~$20-40

## File Structure

```
status-llms/
├── prompt.md                        # Research prompt template
├── run_status_research.py           # Main script (individual APIs)
├── run_status_research_unified.py   # Unified API script
├── requirements.txt                 # Python dependencies
├── env_template.txt                 # Environment variables template
├── .env.local                       # Your API keys (create this)
├── data/                            # Output directory
│   ├── claude-sonnet-4_0.2.json
│   ├── claude-sonnet-4_0.7.json
│   └── ...
└── RESEARCH_README.md               # This file
```

## Next Steps

After running the research:

1. **Analyze Results**: Use the main project dashboard to explore the data
2. **Compare Models**: Look for patterns across different models and temperatures
3. **Extend Research**: Modify the prompt to explore other aspects of status perception

## Notes

- The research takes 30-60 minutes to complete (due to rate limiting)
- Results are automatically saved as they're generated
- The script can be interrupted and restarted - it will skip existing files
- All models are tested with the same prompt for consistency

## Support

If you encounter issues:
1. Check the logs for specific error messages
2. Verify your API keys are correct and have sufficient credits
3. Try the unified API option if individual APIs are problematic
4. Some models may require special access or be in beta

Happy researching! 🚀