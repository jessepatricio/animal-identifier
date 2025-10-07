import * as FileSystem from 'expo-file-system/legacy';
import ImageResizer from '@bam.tech/react-native-image-resizer';

/**
 * Convert image URI to base64 string for Gemini API
 */
export const imageToBase64 = async (imageUri: string): Promise<string> => {
  try {
    console.log('Converting image to base64:', imageUri);
    
    // Check if it's already a data URI
    if (imageUri.startsWith('data:')) {
      const base64Data = imageUri.split(',')[1];
      console.log('Image is already base64, length:', base64Data.length);
      return base64Data;
    }
    
    // Read file and convert to base64
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: 'base64',
    });
    
    console.log('Image converted to base64, length:', base64.length);
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error(`Failed to convert image to base64: ${error}`);
  }
};

/**
 * Get MIME type from image URI
 */
export const getImageMimeType = (imageUri: string): string => {
  if (imageUri.startsWith('data:')) {
    const mimeMatch = imageUri.match(/data:([^;]+)/);
    return mimeMatch ? mimeMatch[1] : 'image/jpeg';
  }
  
  // Extract extension from file path
  const extension = imageUri.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/jpeg'; // Default fallback
  }
};

/**
 * Resize and compress image to ensure it's under 20MB
 */
export const resizeImageIfNeeded = async (imageUri: string): Promise<string> => {
  try {
    console.log('Checking if image needs resizing:', imageUri);
    
    // Check if it's already a data URI
    if (imageUri.startsWith('data:')) {
      const base64Data = imageUri.split(',')[1];
      const sizeInBytes = (base64Data.length * 3) / 4; // Base64 to bytes conversion
      const sizeInMB = sizeInBytes / (1024 * 1024);
      
      if (sizeInMB <= 20) {
        console.log('Data URI image is already under 20MB:', sizeInMB.toFixed(2), 'MB');
        return imageUri;
      }
      
      // For data URIs, we need to save them as a file first, then resize
      const tempUri = `file:///tmp/temp_image_${Date.now()}.jpg`;
      await FileSystem.writeAsStringAsync(tempUri, base64Data, {
        encoding: 'base64',
      });
      
      const resizedUri = await resizeImageFile(tempUri);
      await FileSystem.deleteAsync(tempUri, { idempotent: true });
      return resizedUri;
    }
    
    // Check file size first
    try {
      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      if (fileInfo.exists && fileInfo.size) {
        const sizeInMB = fileInfo.size / (1024 * 1024);
        console.log('Original image size:', sizeInMB.toFixed(2), 'MB');
        
        if (sizeInMB <= 20) {
          console.log('Image is already under 20MB, no resizing needed');
          return imageUri;
        }
      }
    } catch (sizeCheckError) {
      console.warn('Could not check file size, proceeding with resize:', sizeCheckError);
    }
    
    // Resize the image
    console.log('Image is too large or size check failed, resizing...');
    return await resizeImageFile(imageUri);
    
  } catch (error) {
    console.error('Error resizing image:', error);
    console.warn('Image resizing failed, returning original URI');
    // Return original URI if resizing fails
    return imageUri;
  }
};

/**
 * Resize image file using ImageResizer
 */
const resizeImageFile = async (imageUri: string): Promise<string> => {
  try {
    console.log('Starting image resize process for:', imageUri);
    
    // Start with high quality and large dimensions
    let quality = 85;
    let maxWidth = 1920;
    let maxHeight = 1920;
    
    let resizedUri = imageUri;
    let lastSuccessfulUri = imageUri;
    
    // Try multiple iterations with decreasing quality/size until we get under 20MB
    for (let attempt = 0; attempt < 4; attempt++) {
      console.log(`Resize attempt ${attempt + 1}: quality=${quality}, maxSize=${maxWidth}x${maxHeight}`);
      
      try {
        const response = await ImageResizer.createResizedImage(
          resizedUri,
          maxWidth,
          maxHeight,
          'JPEG',
          quality,
          0, // rotation
          undefined, // outputPath
          false, // keepMeta
          { mode: 'contain' }
        );
        
        // Check the new file size
        try {
          const fileInfo = await FileSystem.getInfoAsync(response.uri);
          if (fileInfo.exists && fileInfo.size) {
            const sizeInMB = fileInfo.size / (1024 * 1024);
            console.log(`Resized image size: ${sizeInMB.toFixed(2)} MB`);
            
            if (sizeInMB <= 20) {
              console.log('✅ Image successfully resized to under 20MB');
              // Clean up previous attempts
              if (attempt > 0 && lastSuccessfulUri !== imageUri) {
                await FileSystem.deleteAsync(lastSuccessfulUri, { idempotent: true });
              }
              return response.uri;
            }
            
            // Store the last successful resize for cleanup
            if (attempt > 0 && lastSuccessfulUri !== imageUri) {
              await FileSystem.deleteAsync(lastSuccessfulUri, { idempotent: true });
            }
            lastSuccessfulUri = response.uri;
          } else {
            console.warn('Resized file does not exist or has no size info');
            lastSuccessfulUri = response.uri;
          }
        } catch (sizeCheckError) {
          console.warn('Could not check resized file size:', sizeCheckError);
          lastSuccessfulUri = response.uri;
        }
        
        // If still too large, reduce quality and size for next attempt
        quality = Math.max(50, quality - 10);
        maxWidth = Math.max(600, Math.floor(maxWidth * 0.75));
        maxHeight = Math.max(400, Math.floor(maxHeight * 0.75));
        
        resizedUri = response.uri;
        
      } catch (resizeError) {
        console.error(`Error in resize attempt ${attempt + 1}:`, resizeError);
        // If this is not the first attempt, clean up the failed attempt
        if (attempt > 0 && lastSuccessfulUri !== imageUri) {
          await FileSystem.deleteAsync(lastSuccessfulUri, { idempotent: true });
        }
        break;
      }
    }
    
    console.warn('⚠️ Could not resize image to under 20MB after multiple attempts, using last successful resize');
    return lastSuccessfulUri;
    
  } catch (error) {
    console.error('❌ Error in resizeImageFile:', error);
    // Return original URI if all resizing attempts fail
    return imageUri;
  }
};

/**
 * Validate image file size (Gemini has limits)
 */
export const validateImageSize = async (imageUri: string): Promise<boolean> => {
  try {
    if (imageUri.startsWith('data:')) {
      // For data URIs, estimate size from base64 length
      const base64Data = imageUri.split(',')[1];
      const sizeInBytes = (base64Data.length * 3) / 4; // Base64 to bytes conversion
      const sizeInMB = sizeInBytes / (1024 * 1024);
      console.log('Data URI estimated size:', sizeInMB.toFixed(2), 'MB');
      return sizeInMB <= 20; // 20MB limit
    }
    
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (fileInfo.exists && fileInfo.size) {
      const sizeInMB = fileInfo.size / (1024 * 1024);
      console.log('File size:', sizeInMB.toFixed(2), 'MB');
      return sizeInMB <= 20; // 20MB limit
    }
    
    console.warn('Could not determine file size, assuming it needs resizing');
    return false; // If we can't determine size, assume it needs resizing
  } catch (error) {
    console.error('Error validating image size:', error);
    console.warn('Size validation failed, assuming image needs resizing');
    return false; // If validation fails, assume it needs resizing
  }
};
