
export type UserRole = 'tenant' | 'owner' | null;

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export type PropertyType = 'Room' | 'PG/Hostel' | 'Apartment' | 'Independent House';
export type FurnishingStatus = 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  bhk?: number; // 1, 2, 3, etc.
  furnishing: FurnishingStatus;
  location: string;
  price: number;
  maintenance?: number;
  deposit: number;
  availableFrom: string;
  description: string;
  amenities: string[];
  images: string[];
  ownerId: string;
  rating: number;
  views: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  properties?: Property[];
}
