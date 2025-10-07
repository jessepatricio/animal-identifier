import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { GEMINI_CONFIG, ANIMAL_IDENTIFICATION_PROMPT } from '../config/gemini';
import { AnimalInfo, IdentificationResult } from '../types';
import { imageToBase64, getImageMimeType, validateImageSize, resizeImageIfNeeded } from '../utils/imageUtils';

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!GEMINI_CONFIG.API_KEY || GEMINI_CONFIG.API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error('Please set your Gemini API key in src/config/gemini.ts');
    }

    this.genAI = new GoogleGenerativeAI(GEMINI_CONFIG.API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: GEMINI_CONFIG.MODEL_NAME,
      generationConfig: GEMINI_CONFIG.GENERATION_CONFIG,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
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
   * Identify animal from image using Gemini API
   */
  async identifyAnimal(imageUri: string): Promise<IdentificationResult> {
    try {
      console.log('Starting animal identification with Gemini...');
      
      // Prepare image for API
      const { base64, mimeType } = await this.prepareImage(imageUri);
      
      // Prepare the image part for the API
      const imagePart = {
        inlineData: {
          data: base64,
          mimeType: mimeType,
        },
      };

      // Generate content with the model
      const geminiResult = await this.model.generateContent([
        ANIMAL_IDENTIFICATION_PROMPT,
        imagePart,
      ]);

      const response = await geminiResult.response;
      const text = response.text();
      
      console.log('Gemini API response:', text);

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
      console.error('Error in Gemini animal identification:', error);
      
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
      const result = await this.model.generateContent('Hello, can you respond with "API connection successful"?');
      const response = await result.response;
      const text = response.text();
      console.log('Gemini API test response:', text);
      return text.toLowerCase().includes('successful');
    } catch (error) {
      console.error('Gemini API connection test failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const geminiService = new GeminiService();
export default geminiService;
