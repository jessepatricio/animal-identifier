# Animal & Insect Identifier App

A React Native mobile app built with Expo that allows users to identify animals and insects by taking photos or selecting images from their gallery.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/yourusername/animal-identifier)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue?style=flat-square&logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

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

4. Run on iOS:
   - Press `i` in the terminal to open iOS Simulator
   - Or scan the QR code with Expo Go app on your iOS device

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

## Version History

### v1.0.0 (Current)
- ✅ Initial release
- ✅ Camera integration
- ✅ Photo gallery access
- ✅ Animal identification (mock service)
- ✅ Results display
- ✅ iOS optimization
- ✅ TypeScript support

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.

---

**Made with ❤️ using React Native and Expo**
