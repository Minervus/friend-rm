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
  children?: string[];
  image_url?: string;
  engagement_score: number;
  last_engagement?: string;
  last_engagement_type?: EngagementType;
  hobbies?: string[];
  favorite_movies?: string[];
  favorite_tv_shows?: string[];
  favorite_music_artists?: string[];
  favorite_foods?: string[];
  favorite_drinks?: string[];
  created_at: string;
  updated_at: string;
  engagements?: Engagement[];
}