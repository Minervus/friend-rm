import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useContactStore } from '../store/contactStore';
import { RelationType } from '../types/contact';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddContactModal({ isOpen, onClose }: AddContactModalProps) {
  const addContact = useContactStore((state) => state.addContact);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: 'friend' as RelationType,
    birthday: '',
    location: '',
    job: '',
    notes: '',
    children: '',
    hobbies: '',
    favorite_movies: '',
    favorite_tv_shows: '',
    favorite_music_artists: '',
    favorite_foods: '',
    favorite_drinks: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact({
      ...formData,
      children: formData.children ? formData.children.split(',').map(s => s.trim()) : undefined,
      hobbies: formData.hobbies ? formData.hobbies.split(',').map(s => s.trim()) : undefined,
      favorite_movies: formData.favorite_movies ? formData.favorite_movies.split(',').map(s => s.trim()) : undefined,
      favorite_tv_shows: formData.favorite_tv_shows ? formData.favorite_tv_shows.split(',').map(s => s.trim()) : undefined,
      favorite_music_artists: formData.favorite_music_artists ? formData.favorite_music_artists.split(',').map(s => s.trim()) : undefined,
      favorite_foods: formData.favorite_foods ? formData.favorite_foods.split(',').map(s => s.trim()) : undefined,
      favorite_drinks: formData.favorite_drinks ? formData.favorite_drinks.split(',').map(s => s.trim()) : undefined,
      engagement_score: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    onClose();
    setFormData({
      name: '',
      email: '',
      phone: '',
      relationship: 'friend',
      birthday: '',
      location: '',
      job: '',
      notes: '',
      children: '',
      hobbies: '',
      favorite_movies: '',
      favorite_tv_shows: '',
      favorite_music_artists: '',
      favorite_foods: '',
      favorite_drinks: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Contact</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Name *
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Relationship Type *
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.relationship}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    relationship: e.target.value as RelationType,
                  })
                }
              >
                <option value="close_friend">Close Friend</option>
                <option value="friend">Friend</option>
                <option value="work">Work Colleague</option>
                <option value="family">Family</option>
                <option value="acquaintance">Acquaintance</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Phone
                </label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Birthday
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.birthday}
                  onChange={(e) =>
                    setFormData({ ...formData, birthday: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Location
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Job
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.job}
                onChange={(e) =>
                  setFormData({ ...formData, job: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Children (comma-separated)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.children}
                onChange={(e) =>
                  setFormData({ ...formData, children: e.target.value })
                }
                placeholder="e.g. John, Jane, Mike"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Hobbies (comma-separated)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.hobbies}
                onChange={(e) =>
                  setFormData({ ...formData, hobbies: e.target.value })
                }
                placeholder="e.g. Reading, Photography, Hiking"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Favorite Movies (comma-separated)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.favorite_movies}
                onChange={(e) =>
                  setFormData({ ...formData, favorite_movies: e.target.value })
                }
                placeholder="e.g. The Godfather, Inception"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Favorite TV Shows (comma-separated)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.favorite_tv_shows}
                onChange={(e) =>
                  setFormData({ ...formData, favorite_tv_shows: e.target.value })
                }
                placeholder="e.g. Breaking Bad, The Office"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Favorite Music Artists (comma-separated)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.favorite_music_artists}
                onChange={(e) =>
                  setFormData({ ...formData, favorite_music_artists: e.target.value })
                }
                placeholder="e.g. The Beatles, Queen"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Favorite Foods (comma-separated)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.favorite_foods}
                onChange={(e) =>
                  setFormData({ ...formData, favorite_foods: e.target.value })
                }
                placeholder="e.g. Pizza, Sushi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Favorite Drinks (comma-separated)
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.favorite_drinks}
                onChange={(e) =>
                  setFormData({ ...formData, favorite_drinks: e.target.value })
                }
                placeholder="e.g. Coffee, Green Tea"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Notes
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-dark-card dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 dark:hover:bg-dark-hover"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Add Contact
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContactModal;