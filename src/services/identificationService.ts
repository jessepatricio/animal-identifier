import { AnimalInfo, IdentificationResult } from '../types';

// Mock database of animals and insects
const animalDatabase: AnimalInfo[] = [
  {
    id: '1',
    name: 'Golden Retriever',
    scientificName: 'Canis lupus familiaris',
    description: 'The Golden Retriever is a medium-large gun dog that was bred to retrieve shot waterfowl, such as ducks and upland game birds, during hunting and shooting parties.',
    habitat: 'Domesticated, originally from Scotland',
    diet: 'Omnivorous - commercial dog food, meat, vegetables',
    size: '55-75 cm (22-30 inches) at shoulder',
    lifespan: '10-12 years',
    category: 'mammal',
  },
  {
    id: '2',
    name: 'Labrador Retriever',
    scientificName: 'Canis lupus familiaris',
    description: 'The Labrador Retriever is a medium-large gun dog that was bred to retrieve shot waterfowl.',
    habitat: 'Domesticated',
    diet: 'Omnivorous',
    size: '55-62 cm (22-24 inches) at shoulder',
    lifespan: '10-14 years',
    category: 'mammal',
  },
  {
    id: '3',
    name: 'Monarch Butterfly',
    scientificName: 'Danaus plexippus',
    description: 'The monarch butterfly is a milkweed butterfly in the family Nymphalidae. It is amongst the most familiar of North American butterflies.',
    habitat: 'North America, Central America, and northern South America',
    diet: 'Nectar from flowers, milkweed plants',
    size: 'Wingspan: 8.9-10.2 cm (3.5-4.0 inches)',
    lifespan: '2-6 weeks (adult), 2-4 weeks (migratory generation)',
    category: 'insect',
  },
  {
    id: '4',
    name: 'House Cat',
    scientificName: 'Felis catus',
    description: 'The domestic cat is a small, typically furry, carnivorous mammal. They are often called house cats when kept as indoor pets.',
    habitat: 'Worldwide, domesticated',
    diet: 'Carnivorous - commercial cat food, meat, fish',
    size: '46 cm (18 inches) in length, 23-25 cm (9-10 inches) in height',
    lifespan: '12-18 years',
    category: 'mammal',
  },
  {
    id: '5',
    name: 'American Robin',
    scientificName: 'Turdus migratorius',
    description: 'The American robin is a migratory songbird of the true thrush genus and Turdidae, the wider thrush family.',
    habitat: 'North America, from Alaska to Florida',
    diet: 'Omnivorous - insects, fruits, berries',
    size: '23-28 cm (9-11 inches) in length',
    lifespan: '2 years average, up to 13 years',
    category: 'bird',
  },
  {
    id: '6',
    name: 'Honeybee',
    scientificName: 'Apis mellifera',
    description: 'The western honey bee or European honey bee is the most common of the 7-12 species of honey bees worldwide.',
    habitat: 'Worldwide, except Antarctica',
    diet: 'Nectar and pollen from flowers',
    size: '12-15 mm (0.5-0.6 inches) in length',
    lifespan: '6 weeks (worker), 5 years (queen)',
    category: 'insect',
  },
];

// Simple mock identification function
// In a real app, this would call an AI service like Google Vision API, AWS Rekognition, or a custom ML model
export const identifyAnimal = async (imageUri: string): Promise<IdentificationResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // For demo purposes, randomly select an animal from the database
  // In a real implementation, you would:
  // 1. Convert image to base64 or send to API
  // 2. Call AI service for identification
  // 3. Process the response and match with database
  
  const randomIndex = Math.floor(Math.random() * animalDatabase.length);
  const primaryMatch = animalDatabase[randomIndex];
  
  // Generate alternative matches (excluding the primary match)
  const alternatives = animalDatabase
    .filter(animal => animal.id !== primaryMatch.id)
    .slice(0, 2);

  // Generate a random confidence score between 0.7 and 0.95
  const confidence = Math.random() * 0.25 + 0.7;

  return {
    confidence,
    animal: primaryMatch,
    alternativeMatches: alternatives,
  };
};

// Function to get animal by ID (for future use)
export const getAnimalById = (id: string): AnimalInfo | undefined => {
  return animalDatabase.find(animal => animal.id === id);
};

// Function to search animals by name (for future use)
export const searchAnimals = (query: string): AnimalInfo[] => {
  const lowercaseQuery = query.toLowerCase();
  return animalDatabase.filter(animal => 
    animal.name.toLowerCase().includes(lowercaseQuery) ||
    animal.scientificName.toLowerCase().includes(lowercaseQuery)
  );
};
