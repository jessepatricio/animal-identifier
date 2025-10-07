// Gemini API Configuration
export const GEMINI_CONFIG = {
  // Replace with your actual API key from Google AI Studio
  API_KEY: 'you_google_api_key_here',
  
  // Model configuration
  MODEL_NAME: 'gemini-2.5-flash',
  
  // Generation configuration
  GENERATION_CONFIG: {
    temperature: 0.4,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  },
  
  // Safety settings
  SAFETY_SETTINGS: [
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
};

// Instructions for the AI model
export const ANIMAL_IDENTIFICATION_PROMPT = `
You are an expert zoologist and animal identification specialist. Your task is to identify animals from images with high accuracy.

When analyzing an image, please provide:

1. **Primary Identification**: The most likely animal species with scientific name
2. **Confidence Level**: A percentage (0-100) indicating how confident you are
3. **Alternative Possibilities**: 2-3 other possible species if applicable
4. **Detailed Information**: For the primary identification, provide:
   - Common name
   - Scientific name
   - Brief description
   - Habitat
   - Diet
   - Size
   - Lifespan
   - Category (mammal, bird, reptile, amphibian, fish, insect, arachnid, other)

Please respond in JSON format with the following structure:
{
  "confidence": 85,
  "animal": {
    "name": "Golden Retriever",
    "scientificName": "Canis lupus familiaris",
    "description": "Brief description...",
    "habitat": "Habitat information...",
    "diet": "Diet information...",
    "size": "Size information...",
    "lifespan": "Lifespan information...",
    "category": "mammal"
  },
  "alternativeMatches": [
    {
      "name": "Labrador Retriever",
      "scientificName": "Canis lupus familiaris",
      "description": "Brief description...",
      "habitat": "Habitat information...",
      "diet": "Diet information...",
      "size": "Size information...",
      "lifespan": "Lifespan information...",
      "category": "mammal"
    }
  ]
}

If you cannot identify the animal or the image doesn't contain a clear animal, respond with:
{
  "error": "Unable to identify animal in the image",
  "confidence": 0
}
`;
