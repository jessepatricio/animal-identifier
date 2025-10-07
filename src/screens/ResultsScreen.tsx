import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { LinearGradient } from 'expo-linear-gradient';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

export default function ResultsScreen({ navigation, route }: Props) {
  const { imageUri, result } = route.params;
  const { animal, confidence, alternativeMatches } = result;

  const getCategoryEmoji = (category: string) => {
    const emojis: { [key: string]: string } = {
      mammal: '🐾',
      bird: '🐦',
      reptile: '🦎',
      amphibian: '🐸',
      fish: '🐠',
      insect: '🦋',
      arachnid: '🕷️',
      other: '🐾',
    };
    return emojis[category] || '🐾';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return '#4CAF50';
    if (confidence >= 0.6) return '#FF9800';
    return '#f44336';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.confidenceBadge}>
            <Text style={styles.confidenceText}>
              {Math.round(confidence * 100)}% Match
            </Text>
          </View>
        </View>

        <View style={styles.mainResult}>
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            style={styles.resultCard}
          >
            <View style={styles.resultHeader}>
              <Text style={styles.categoryEmoji}>
                {getCategoryEmoji(animal.category)}
              </Text>
              <View style={styles.resultInfo}>
                <Text style={styles.animalName}>{animal.name}</Text>
                <Text style={styles.scientificName}>{animal.scientificName}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.detailsCard}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{animal.description}</Text>

            <Text style={styles.sectionTitle}>Habitat</Text>
            <Text style={styles.detailText}>{animal.habitat}</Text>

            <Text style={styles.sectionTitle}>Diet</Text>
            <Text style={styles.detailText}>{animal.diet}</Text>

            <Text style={styles.sectionTitle}>Size</Text>
            <Text style={styles.detailText}>{animal.size}</Text>

            <Text style={styles.sectionTitle}>Lifespan</Text>
            <Text style={styles.detailText}>{animal.lifespan}</Text>
          </View>

          {alternativeMatches && alternativeMatches.length > 0 && (
            <View style={styles.alternativesCard}>
              <Text style={styles.sectionTitle}>Alternative Matches</Text>
              {alternativeMatches.map((alt, index) => (
                <TouchableOpacity key={alt.id} style={styles.alternativeItem}>
                  <Text style={styles.categoryEmoji}>
                    {getCategoryEmoji(alt.category)}
                  </Text>
                  <View style={styles.alternativeInfo}>
                    <Text style={styles.alternativeName}>{alt.name}</Text>
                    <Text style={styles.alternativeScientific}>
                      {alt.scientificName}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.actionButtonText}>Take Another Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  confidenceBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  confidenceText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mainResult: {
    padding: 20,
  },
  resultCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  resultInfo: {
    flex: 1,
  },
  animalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  scientificName: {
    fontSize: 16,
    color: '#e8f5e8',
    fontStyle: 'italic',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  alternativesCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alternativeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alternativeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  alternativeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  alternativeScientific: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4CAF50',
  },
});
