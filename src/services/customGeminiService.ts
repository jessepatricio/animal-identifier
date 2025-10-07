import { AnimalInfo, IdentificationResult } from '../types';
import { imageToBase64, getImageMimeType, validateImageSize, resizeImageIfNeeded } from '../utils/imageUtils';
import { GEMINI_CONFIG, ANIMAL_IDENTIFICATION_PROMPT } from '../config/gemini';

class CustomGeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    if (!GEMINI_CONFIG.API_KEY || GEMINI_CONFIG.API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error('Please set your Gemini API key in src/config/gemini.ts');
    }
    this.apiKey = GEMINI_CONFIG.API_KEY;
  }

  /**
   * Validate and prepare image for API call
   */
  private async prepareImage(imageUri: string): Promise<{ base64: string; mimeType: string }> {
    console.log('Preparing image for API call...');
    
    // Resize image if needed to ensure it's under 20MB
    const resizedImageUri = await resizeImageIfNeeded(imageUri);
    console.log('Image resizing completed, using URI:', resizedImageUri);
    
    // Try to validate image size after resizing, but don't fail if validation fails
    try {
      const isValidSize = await validateImageSize(resizedImageUri);
      if (!isValidSize) {
        console.warn('Image may still be too large, but proceeding with API call');
      } else {
        console.log('✅ Image size validation passed');
      }
    } catch (validationError) {
      console.warn('Size validation failed, but proceeding with API call:', validationError);
    }

    // Convert to base64
    const base64 = await imageToBase64(resizedImageUri);
    
    // Get MIME type
    const mimeType = getImageMimeType(resizedImageUri);
    
    return { base64, mimeType };
  }

  /**
   * Identify animal from image using Gemini API with custom endpoint
   */
  async identifyAnimal(imageUri: string): Promise<IdentificationResult> {
    try {
      console.log('Starting animal identification with custom Gemini service...');
      
      // Prepare image for API
      const { base64, mimeType } = await this.prepareImage(imageUri);
      
      // Prepare the request payload
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: ANIMAL_IDENTIFICATION_PROMPT
              },
              {
                inlineData: {
                  data: base64,
                  mimeType: mimeType
                }
              }
            ]
          }
        ],
        generationConfig: GEMINI_CONFIG.GENERATION_CONFIG,
        safetySettings: GEMINI_CONFIG.SAFETY_SETTINGS
      };

      // Make the API call
      const response = await fetch(
        `${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Gemini API response:', data);

      // Extract text from response
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('No text content in API response');
      }

      // Parse the JSON response
      let parsedResponse;
      try {
        // Clean the response text (remove markdown formatting if present)
        const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsedResponse = JSON.parse(cleanText);
      } catch (parseError) {
        console.error('Error parsing Gemini response:', parseError);
        throw new Error('Invalid response format from Gemini API');
      }

      // Check for error response
      if (parsedResponse.error) {
        throw new Error(parsedResponse.error);
      }

      // Validate and format the response
      if (!parsedResponse.animal || !parsedResponse.confidence) {
        throw new Error('Invalid response structure from Gemini API');
      }

      // Generate unique IDs for the animals
      const primaryAnimal: AnimalInfo = {
        id: this.generateId(),
        ...parsedResponse.animal,
      };

      const alternativeMatches: AnimalInfo[] = (parsedResponse.alternativeMatches || []).map((alt: any) => ({
        id: this.generateId(),
        ...alt,
      }));

      const identificationResult: IdentificationResult = {
        confidence: parsedResponse.confidence / 100, // Convert percentage to decimal
        animal: primaryAnimal,
        alternativeMatches: alternativeMatches.length > 0 ? alternativeMatches : undefined,
      };

      console.log('Animal identification completed:', identificationResult);
      return identificationResult;

    } catch (error) {
      console.error('Error in custom Gemini animal identification:', error);
      
      // Return a fallback response
      return {
        confidence: 0,
        animal: {
          id: this.generateId(),
          name: 'Unknown Animal',
          scientificName: 'Unknown',
          description: 'Unable to identify the animal in the image.',
          habitat: 'Unknown',
          diet: 'Unknown',
          size: 'Unknown',
          lifespan: 'Unknown',
          category: 'other',
        },
      };
    }
  }

  /**
   * Generate a unique ID for animals
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Test the API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: 'Hello, can you respond with "API connection successful"?'
              }
            ]
          }
        ],
        generationConfig: GEMINI_CONFIG.GENERATION_CONFIG,
        safetySettings: GEMINI_CONFIG.SAFETY_SETTINGS
      };

      const response = await fetch(
        `${this.baseUrl}/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API test failed:', response.status, errorText);
        return false;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('Custom Gemini API test response:', text);
      return text && text.toLowerCase().includes('successful');
    } catch (error) {
      console.error('Custom Gemini API connection test failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const customGeminiService = new CustomGeminiService();
export default customGeminiService;
