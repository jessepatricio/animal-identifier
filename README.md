# Animal & Insect Identifier App

A React Native mobile app built with Expo that allows users to identify animals and insects by taking photos or selecting images from their gallery.

## Features

- 📷 **Camera Integration**: Take photos directly within the app
- 📁 **Gallery Selection**: Choose existing photos from your device
- 🔍 **AI Identification**: Identify animals and insects (currently using mock data)
- 📊 **Detailed Information**: View comprehensive species information including:
  - Scientific name
  - Description
  - Habitat
  - Diet
  - Size
  - Lifespan
- 🎯 **Confidence Scoring**: See how confident the identification is
- 🔄 **Alternative Matches**: View similar species suggestions
- 📱 **iOS Optimized**: Built specifically for iOS devices

## Tech Stack

- **React Native** with **Expo SDK 54**
- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **Expo Camera** for camera functionality
- **Expo Image Picker** for gallery access
- **Expo Linear Gradient** for beautiful UI gradients

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator or physical iOS device
- Expo Go app (for testing on physical device)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
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

4. Run on iOS:
   - Press `i` in the terminal to open iOS Simulator
   - Or scan the QR code with Expo Go app on your iOS device

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # App screens
│   ├── HomeScreen.tsx     # Main landing screen
│   ├── CameraScreen.tsx   # Camera and photo capture
│   └── ResultsScreen.tsx  # Identification results
├── services/           # Business logic and API calls
│   └── identificationService.ts  # Mock identification service
└── types/              # TypeScript type definitions
    └── index.ts
```

## How It Works

1. **Home Screen**: Users can choose to take a new photo or select from gallery
2. **Camera Screen**: 
   - Take photos with the device camera
   - Access photo gallery
   - Preview captured images
3. **Results Screen**: 
   - Display identification results
   - Show detailed animal/insect information
   - Present alternative matches

## Current Implementation

The app currently uses a mock identification service that randomly selects from a predefined database of animals and insects. In a production environment, you would integrate with:

- **Google Vision API**
- **AWS Rekognition**
- **Azure Computer Vision**
- **Custom ML models** (TensorFlow Lite, Core ML)

## Database

The app includes a sample database with information about:
- Golden Retriever
- Labrador Retriever
- Monarch Butterfly
- House Cat
- American Robin
- Honeybee

## Permissions

The app requires the following permissions:
- **Camera**: To take photos
- **Photo Library**: To access existing images

## Future Enhancements

- [ ] Real AI integration for accurate identification
- [ ] Offline mode with local ML models
- [ ] User favorites and history
- [ ] Social sharing features
- [ ] Location-based species information
- [ ] Augmented reality features
- [ ] Educational content and quizzes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
