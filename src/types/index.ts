export interface AnimalInfo {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  habitat: string;
  diet: string;
  size: string;
  lifespan: string;
  imageUrl?: string;
  category: 'mammal' | 'bird' | 'reptile' | 'amphibian' | 'fish' | 'insect' | 'arachnid' | 'other';
}

export interface IdentificationResult {
  confidence: number;
  animal: AnimalInfo;
  alternativeMatches?: AnimalInfo[];
}

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Results: { imageUri: string; result: IdentificationResult };
};
