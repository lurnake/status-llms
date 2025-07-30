# Status LLMs

A research project by [Joona Heino](https://x.com/joonaheino) that explores what leading AI models perceive as high-status.

This project interviews frontier LLMs with empty system prompts to understand what activities and objects they consider high-status. We test across different temperatures to see how creativity affects status perception.

## Running the Project

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
