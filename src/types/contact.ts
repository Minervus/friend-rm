export type RelationType = 'close_friend' | 'friend' | 'work' | 'acquaintance' | 'family';
export type EngagementType = 'in-person' | 'video-call' | 'online-message' | 'text';

export interface Engagement {
  id: string;
  type: EngagementType;
  notes?: string;
  points: number;
  date: string;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  relationship: RelationType;
  birthday?: string;
  location?: string;
  job?: string;
  notes?: string;
  lastEngagement?: string;
  lastEngagementType?: EngagementType;
  engagementScore: number;
  children?: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  engagements: Engagement[];
  // New fields
  hobbies?: string[];
  favoriteMovies?: string[];
  favoriteTVShows?: string[];
  favoriteMusicArtists?: string[];
  favoriteFoods?: string[];
  favoriteDrinks?: string[];
}