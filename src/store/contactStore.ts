import { create } from 'zustand';
import { Contact, RelationType, EngagementType, Engagement } from '../types/contact';
import { supabase } from '../lib/supabase';

interface ContactState {
  contacts: Contact[];
  searchQuery: string;
  relationshipFilter: RelationType | 'all';
  fetchContacts: () => Promise<void>;
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'engagementScore' | 'engagements'>) => Promise<void>;
  updateContact: (id: string, contact: Partial<Contact>) => Promise<void>;
  logEngagement: (id: string, type: EngagementType, notes?: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setRelationshipFilter: (filter: RelationType | 'all') => void;
}

const getEngagementPoints = (type: EngagementType): number => {
  const points = {
    'in-person': 15,
    'video-call': 10,
    'online-message': 5,
    'text': 3
  };
  return points[type];
};

export const useContactStore = create<ContactState>((set, get) => ({
  contacts: [],
  searchQuery: '',
  relationshipFilter: 'all',
  
  fetchContacts: async () => {
    try {
      const { data: contacts, error } = await supabase
        .from('contacts')
        .select(`
          *,
          engagements (*)
        `)
        .order('name');

      if (error) throw error;

      set({ contacts: contacts || [] });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  },

  addContact: async (contactData) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          ...contactData,
          user_id: user.user.id,
          engagement_score: 0,
        }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        contacts: [...state.contacts, { ...data, engagements: [] }],
      }));
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  },

  updateContact: async (id, updatedData) => {
    try {
      const { engagements, ...dataToUpdate } = updatedData;

      const { error } = await supabase
        .from('contacts')
        .update(dataToUpdate)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        contacts: state.contacts.map((contact) =>
          contact.id === id
            ? { ...contact, ...updatedData }
            : contact
        ),
      }));
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  },

  logEngagement: async (id, type, notes) => {
    try {
      const points = getEngagementPoints(type);
      const contact = get().contacts.find((c) => c.id === id);
      if (!contact) return;

      const { data: engagement, error: engagementError } = await supabase
        .from('engagements')
        .insert([{
          contact_id: id,
          type,
          notes,
          points,
        }])
        .select()
        .single();

      if (engagementError) throw engagementError;

      const newScore = Math.min(100, (contact.engagement_score || 0) + points);
      
      const { error: updateError } = await supabase
        .from('contacts')
        .update({
          engagement_score: newScore,
          last_engagement: new Date().toISOString(),
          last_engagement_type: type,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      set((state) => ({
        contacts: state.contacts.map((c) =>
          c.id === id
            ? {
                ...c,
                engagement_score: newScore,
                last_engagement: new Date().toISOString(),
                last_engagement_type: type,
                engagements: engagement ? [engagement, ...(c.engagements || [])] : c.engagements,
              }
            : c
        ),
      }));
    } catch (error) {
      console.error('Error logging engagement:', error);
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setRelationshipFilter: (filter) => set({ relationshipFilter: filter }),
}));