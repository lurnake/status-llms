# Status LLMs

A research project by [Joona Heino](https://x.com/joonaheino) that explores what leading AI models perceive as high-status.

This project interviews frontier LLMs with empty system prompts to understand what activities and objects they consider high-status. We test across different temperatures to see how creativity affects status perception.

## 🚀 Quick Start

### Option 1: View Dashboard (Pre-collected Data)
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the site:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Collect Fresh Data
1. **Set up Python environment:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure API keys:**
   ```bash
   cp env_template.txt .env.local
   # Add your API keys to .env.local
   ```

3. **Run data collection:**
   ```bash
   python run_status_research.py
   ```

## 📊 Supported AI Models

| Model | Provider | Temp Range | Status |
|-------|----------|------------|--------|
| Claude Sonnet 4 | Anthropic | 0.2-1.0 | ✅ Working |
| Claude Opus 4 | Anthropic | 0.2-1.0 | ✅ Working |
| Gemini 2.5 Pro | Google | 0.2-1.2 | ✅ Working |
| Grok-4 | xAI | 0.2-1.2 | ✅ Working |
| Kimi K2 | Moonshot AI | 0.2-1.0 | ✅ Working |
| DeepSeek R1 | DeepSeek | 0.2-1.2 | ✅ Working |
| GPT-4.1 | OpenAI | 0.2-1.2 | ✅ Working |
| GPT-4o | OpenAI | 0.2-1.2 | ✅ Working |
| GPT-o3 | OpenAI | 0.2-1.2 | ❌ Requires org verification |

### 🔧 Known Limitations

- **Temperature Limits**: Some models don't support temperatures above 1.0
- **GPT-o3 Access**: Requires OpenAI organization verification (may be added later)
- **Rate Limiting**: Free tier APIs have request limits (script handles this automatically)
- **API Costs**: Running all models will consume API credits

## Adding Data

To add new data, place your JSON files in the `/data` directory, following this naming convention:

`{model-name}_{temperature}.json`

For example: `gpt-4o_1.0.json`

The JSON files should have the following structure:

```json
{
  "items": [
    {"name": "Private jet ownership", "type": "object", "rating": 92},
    {"name": "Attending Harvard", "type": "activity", "rating": 88}
  ]
}
```
