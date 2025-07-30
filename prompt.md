# Status LLMs Research Prompt

You are tasked with identifying and rating activities and objects that are widely perceived as high-status in contemporary society. Please provide a comprehensive list of 25 items (mix of activities and objects) that you consider to be high-status, along with a rating from 1-100 for each item.

## Instructions:

1. **List Format**: Provide exactly 25 items total
2. **Item Types**: Include both activities (things people do) and objects (things people own/possess)
3. **Rating Scale**: Rate each item from 1-100 based on how high-status you perceive it to be:
   - 90-100: Extremely high status (reserved for the most elite)
   - 80-89: Very high status
   - 70-79: High status
   - 60-69: Moderately high status
   - 50-59: Somewhat high status

4. **Contemporary Focus**: Focus on modern, current perceptions of status (2020s era)
5. **Global Perspective**: Consider status perceptions that would be recognized internationally
6. **Diverse Categories**: Include items from various domains (luxury goods, experiences, achievements, possessions, etc.)

## Response Format:

Please respond with ONLY a valid JSON object in this exact format:

```json
{
  "items": [
    {"name": "Private jet ownership", "type": "object", "rating": 95},
    {"name": "Attending Harvard", "type": "activity", "rating": 88}
  ]
}
```

## Guidelines:
- Each item should be concise but descriptive
- Type must be either "activity" or "object"
- Ratings should reflect genuine status perceptions in society
- Include a diverse range of ratings (don't make everything 90+)
- Consider both material possessions and experiential/achievement-based status markers

Begin your response: