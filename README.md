# Animal & Insect Identifier App

A React Native mobile app built with Expo that allows users to identify animals and insects by taking photos or selecting images from their gallery.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/yourusername/animal-identifier)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue?style=flat-square&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

## Features

- 📷 **Camera Integration**: Take photos directly within the app
- 📁 **Gallery Selection**: Choose existing photos from your device
- 🤖 **Google Gemini AI**: Real-time animal and insect identification using Google's advanced AI
- 🖼️ **Smart Image Processing**: Automatic image resizing and compression to ensure optimal API performance
- 📊 **Detailed Information**: View comprehensive species information including:
  - Scientific name
  - Description
  - Habitat
  - Diet
  - Size
  - Lifespan
  - Category classification
- 🎯 **Confidence Scoring**: See how confident the AI identification is
- 🔄 **Alternative Matches**: View similar species suggestions from AI analysis
- 📱 **Cross-Platform**: Optimized for both iOS and Android devices
- 🎨 **Modern UI**: Beautiful, intuitive interface with gradient designs

## Tech Stack

- **React Native** with **Expo SDK 54**
- **TypeScript** for type safety
- **Google Gemini AI** for animal identification
- **React Navigation** for screen navigation
- **Expo Camera** for camera functionality
- **Expo Image Picker** for gallery access
- **Expo Linear Gradient** for beautiful UI gradients
- **@bam.tech/react-native-image-resizer** for image optimization
- **Expo File System** for file operations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or physical iOS/Android device
- Expo Go app (for testing on physical device)
- Google Gemini API key (see [Setup Guide](#google-gemini-setup))
- Git (for version control)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/animal-identifier.git
   cd animal-identifier
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on device:
   - Press `i` in the terminal to open iOS Simulator
   - Press `a` in the terminal to open Android Emulator
   - Or scan the QR code with Expo Go app on your device

### Google Gemini Setup

1. **Get your API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

2. **Configure the app:**
   - Open `src/config/gemini.ts`
   - Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual API key
   - Save the file

3. **Test the connection:**
   - The app will automatically test the API connection on startup
   - Check the console logs for connection status

### Git Setup

If you're setting up the project for the first time:

1. **Initialize Git repository:**
   ```bash
   git init
   ```

2. **Configure Git (if not already done):**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Add and commit files:**
   ```bash
   git add .
   git commit -m "Initial commit: Animal & Insect Identifier App"
   ```

4. **Connect to GitHub:**
   ```bash
   # Create repository on GitHub first, then:
   git remote add origin https://github.com/yourusername/animal-identifier.git
   git branch -M main
   git push -u origin main
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── config/             # Configuration files
│   └── gemini.ts         # Google Gemini API configuration
├── screens/            # App screens
│   ├── HomeScreen.tsx     # Main landing screen
│   ├── CameraScreen.tsx   # Camera and photo capture
│   └── ResultsScreen.tsx  # AI identification results
├── services/           # Business logic and API calls
│   ├── identificationService.ts  # Main identification service with fallback
│   └── customGeminiService.ts    # Google Gemini API service
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
    └── imageUtils.ts      # Image processing and resizing
```

## How It Works

1. **Home Screen**: Users can choose to take a new photo or select from gallery
2. **Camera Screen**: 
   - Take photos with the device camera
   - Access photo gallery
   - Preview captured images
3. **Image Processing**: 
   - Automatic image resizing and compression
   - Format optimization for API compatibility
   - Size validation (ensures images are under 20MB)
4. **AI Analysis**: 
   - Send processed image to Google Gemini AI
   - Receive detailed animal/insect identification
   - Get confidence scores and alternative matches
5. **Results Screen**: 
   - Display AI-generated identification results
   - Show comprehensive species information
   - Present alternative matches with confidence scores
   - Modern, card-based UI with quick facts grid

## AI Integration

The app now uses **Google Gemini AI** for real-time animal and insect identification. The AI provides:

- **Accurate Species Identification**: Advanced computer vision for precise animal recognition
- **Detailed Information**: Comprehensive species data including scientific names, habitats, and behaviors
- **Confidence Scoring**: AI confidence levels for identification accuracy
- **Alternative Matches**: Similar species suggestions when identification is uncertain
- **Fallback System**: Mock data service as backup when API is unavailable

### Image Processing Features

- **Smart Resizing**: Automatic image compression to meet API requirements (under 20MB)
- **Format Optimization**: Converts images to optimal formats for AI processing
- **Quality Preservation**: Maintains image quality while reducing file size
- **Error Handling**: Robust fallback mechanisms for processing failures

## Fallback Database

The app includes a fallback database with sample information about:
- Golden Retriever
- Labrador Retriever
- Monarch Butterfly
- House Cat
- American Robin
- Honeybee

*Note: This database is only used when the Google Gemini API is unavailable or fails.*

## Permissions

The app requires the following permissions:
- **Camera**: To take photos
- **Photo Library**: To access existing images

## Recent Updates

### v1.1.0 - AI Integration & Image Processing
- ✅ **Google Gemini AI Integration**: Real-time animal identification using advanced AI
- ✅ **Smart Image Resizing**: Automatic compression to ensure API compatibility
- ✅ **Enhanced Results Display**: Modern UI with quick facts grid and AI-generated badges
- ✅ **Error Handling**: Robust fallback systems and improved error recovery
- ✅ **TypeScript Fixes**: Resolved deprecated API warnings and type safety issues
- ✅ **Cross-Platform Support**: Optimized for both iOS and Android

### v1.0.0 - Initial Release
- ✅ Camera integration
- ✅ Photo gallery access
- ✅ Mock identification service
- ✅ Basic results display
- ✅ iOS optimization
- ✅ TypeScript support

## Future Enhancements

- [ ] Offline mode with local ML models
- [ ] User favorites and history
- [ ] Social sharing features
- [ ] Location-based species information
- [ ] Augmented reality features
- [ ] Educational content and quizzes
- [ ] Batch image processing
- [ ] Species comparison tools
- [ ] Conservation information

## Development Workflow

### Making Changes

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them thoroughly

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add: Description of your changes"
   ```

4. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

### Git Commands Reference

```bash
# Check status
git status

# View commit history
git log --oneline

# Switch branches
git checkout main
git checkout feature/your-branch

# Merge changes
git merge feature/your-branch

# Pull latest changes
git pull origin main

# Reset to last commit (be careful!)
git reset --hard HEAD
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly on iOS device/simulator
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

### Commit Message Convention

Use clear, descriptive commit messages:
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for improvements
- `Remove:` for deletions
- `Refactor:` for code restructuring

## Deployment

### Building for Production

1. **Build for iOS:**
   ```bash
   npx expo build:ios
   ```

2. **Build for Android:**
   ```bash
   npx expo build:android
   ```

3. **Create development build:**
   ```bash
   npx expo run:ios
   npx expo run:android
   ```

### App Store Submission

1. **Configure app.json** with proper bundle identifiers
2. **Build production version** using EAS Build
3. **Submit to App Store Connect** or Google Play Console

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Ensure your Google Gemini API key is correctly set in `src/config/gemini.ts`
   - Check that the API key has proper permissions
   - Verify your internet connection

2. **Image Processing Errors**
   - The app automatically resizes large images
   - If resizing fails, try with a smaller image
   - Check console logs for detailed error information

3. **Deprecated API Warnings**
   - These warnings are handled automatically
   - The app uses the legacy API for compatibility
   - No action required from users

4. **App Crashes on Image Selection**
   - Ensure proper permissions are granted
   - Try restarting the app
   - Check device storage space

### Debug Mode

Enable debug logging by checking the console output when running:
```bash
npx expo start
```

Look for logs starting with:
- `LOG` - Normal operation
- `WARN` - Non-critical issues
- `ERROR` - Problems that need attention

## Technical Implementation

### Image Processing Pipeline

1. **Image Capture/Selection**: User takes photo or selects from gallery
2. **Size Validation**: Check if image is under 20MB limit
3. **Smart Resizing**: If needed, progressively reduce quality and dimensions
4. **Format Optimization**: Convert to optimal format for AI processing
5. **Base64 Encoding**: Prepare image for API transmission
6. **AI Analysis**: Send to Google Gemini for identification
7. **Result Processing**: Parse and format AI response
8. **UI Display**: Show results with modern card-based layout

### Error Handling Strategy

- **Graceful Degradation**: Falls back to mock data if AI fails
- **Progressive Resizing**: Multiple attempts with different quality settings
- **Non-blocking Validation**: Continues processing even if size checks fail
- **Comprehensive Logging**: Detailed logs for debugging and monitoring

### Performance Optimizations

- **Lazy Loading**: Images are processed only when needed
- **Memory Management**: Automatic cleanup of temporary files
- **Efficient Compression**: Smart algorithms to maintain quality while reducing size
- **Caching**: Reuses processed images when possible

### Service Architecture

The app uses a clean, layered service architecture:

1. **`identificationService.ts`** - Main service layer that:
   - Orchestrates the identification process
   - Handles fallback to mock data when AI fails
   - Provides a consistent interface for the UI

2. **`customGeminiService.ts`** - Google Gemini AI integration that:
   - Handles image processing and resizing
   - Manages API communication with Google Gemini
   - Processes and formats AI responses

3. **`imageUtils.ts`** - Utility functions for:
   - Image resizing and compression
   - Format conversion and validation
   - File system operations

This architecture ensures:
- **Separation of Concerns**: Each service has a specific responsibility
- **Error Resilience**: Graceful fallbacks when services fail
- **Maintainability**: Easy to modify or replace individual components
- **Testability**: Each service can be tested independently

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Made with ❤️ using React Native and Expo**
