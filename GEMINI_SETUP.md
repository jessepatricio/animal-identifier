# Google Gemini API Setup Guide

## Step 1: Get Your API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 2: Configure Your API Key

1. Open `src/config/gemini.ts`
2. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:

```typescript
export const GEMINI_CONFIG = {
  API_KEY: 'your_actual_api_key_here',
  // ... rest of config
};
```

## Step 3: Test the Integration

The app will automatically use Gemini API for animal identification. If the API fails, it will fall back to mock data.

## API Limits and Costs

- Gemini API has usage limits and may incur costs
- Check [Google AI Studio pricing](https://ai.google.dev/pricing) for current rates
- The app includes error handling and fallback mechanisms

## Troubleshooting

### Common Issues:

1. **"Please set your Gemini API key"** - Make sure you've updated the API key in `src/config/gemini.ts`

2. **"Image file is too large"** - Gemini has a 20MB limit per image

3. **"Invalid response format"** - The API response wasn't in expected JSON format

4. **Network errors** - Check your internet connection and API key validity

### Testing API Connection:

You can test the API connection by calling:
```typescript
import { geminiService } from './src/services/geminiService';

const isConnected = await geminiService.testConnection();
console.log('API Connection:', isConnected);
```

## Security Notes

- Never commit your API key to version control
- Consider using environment variables for production
- The current setup uses a config file for simplicity
