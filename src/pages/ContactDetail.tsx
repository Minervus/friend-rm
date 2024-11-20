import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { useContactStore } from '../store/contactStore';
import { EngagementType } from '../types/contact';
import { Edit, Save, X } from 'lucide-react';

const engagementTypes = [
  { value: 'in-person', label: 'In Person', points: 15 },
  { value: 'video-call', label: 'Video Call', points: 10 },
  { value: 'online-message', label: 'Online Message', points: 5 },
  { value: 'text', label: 'Text Message', points: 3 },
];

function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contact = useContactStore((state) =>
    state.contacts.find((c) => c.id === id)
  );
  const updateContact = useContactStore((state) => state.updateContact);
  const logEngagement = useContactStore((state) => state.logEngagement);

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(contact);
  const [engagementForm, setEngagementForm] = useState<{
    type: EngagementType;
    notes: string;
  }>({
    type: 'in-person',
    notes: '',
  });

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const handleSave = () => {
    if (editForm) {
      updateContact(contact.id, editForm);
      setIsEditing(false);
    }
  };

  const handleEngagement = (e: React.FormEvent) => {
    e.preventDefault();
    if (engagementForm.type) {
      logEngagement(contact.id, engagementForm.type, engagementForm.notes);
      setEngagementForm({ type: 'in-person', notes: '' });
    }
  };
  const getProgressColor = (score: number) => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{contact.name}</h1>
        {!isEditing && (
          <div className="flex items-center space-x-4 mb-6">
            {contact.image_url ? (
              <img
                src={contact.image_url}
                alt={`${contact.name}'s profile`}
                className="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/96?text=NA';
                }}
              />
            ) : (
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-500">
                  {contact.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Engagement Score</h3>
        <div className="w-full max-w-xs h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${getProgressColor(contact.engagement_score)} transition-all duration-300`}
            style={{ width: `${contact.engagement_score}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {contact.engagement_score}%
        </span>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {isEditing ? (
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <input
                  type="text"
                  value={editForm?.image_url || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, image_url: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editForm?.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editForm?.email || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={editForm?.phone || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, phone: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Birthday</label>
                <input
                  type="date"
                  value={editForm?.birthday || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, birthday: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={editForm?.location || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, location: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job</label>
                <input
                  type="text"
                  value={editForm?.job || ''}
                  onChange={(e) =>
                    setEditForm({ ...editForm!, job: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Children</label>
                <input
                  type="text"
                  value={editForm?.children?.join(', ') || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm!,
                      children: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hobbies</label>
                <input
                  type="text"
                  value={editForm?.hobbies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm!,
                      hobbies: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favorite Movies</label>
                <input
                  type="text"
                  value={editForm?.favorite_movies?.join(', ') || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm!,
                      favorite_movies: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favorite TV Shows</label>
                <input
                  type="text"
                  value={editForm?.favorite_tv_shows?.join(', ') || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm!,
                      favorite_tv_shows: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favorite Music Artists</label>
                <input
                  type="text"
                  value={editForm?.favorite_music_artists?.join(', ') || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm!,
                      favorite_music_artists: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favorite Foods</label>
                <input
                  type="text"
                  value={editForm?.favorite_foods?.join(', ') || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm!,
                      favorite_foods: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Favorite Drinks</label>
                <input
                  type="text"
                  value={editForm?.favorite_drinks?.join(', ') || ''}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm!,
                      favorite_drinks: e.target.value.split(',').map((s) => s.trim()),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={editForm?.notes || ''}
                onChange={(e) =>
                  setEditForm({ ...editForm!, notes: e.target.value })
                }
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </form>
        ) : (
          <>
            {/* First section: Contact Info and Preferences */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
                      <p className="text-sm text-gray-500">{contact.name}</p>
                    </div>
                  </div>
                  <dl className="mt-2 space-y-2">
                    {contact.email && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="text-sm text-gray-900">{contact.email}</dd>
                      </div>
                    )}
                    {contact.phone && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Phone</dt>
                        <dd className="text-sm text-gray-900">{contact.phone}</dd>
                      </div>
                    )}
                    {contact.birthday && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Birthday</dt>
                        <dd className="text-sm text-gray-900">
                          {format(parseISO(contact.birthday), 'MMMM do, yyyy')}
                        </dd>
                      </div>
                    )}
                    {contact.location && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                        <dd className="text-sm text-gray-900">{contact.location}</dd>
                      </div>
                    )}
                    {contact.job && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Job</dt>
                        <dd className="text-sm text-gray-900">{contact.job}</dd>
                      </div>
                    )}
                    {contact.children && contact.children.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Children</dt>
                        <dd className="text-sm text-gray-900">
                          {contact.children.join(', ')}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
        

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                  <dl className="mt-2 space-y-2">
                    {contact.hobbies && contact.hobbies.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Hobbies</dt>
                        <dd className="text-sm text-gray-900">
                          {contact.hobbies.join(', ')}
                        </dd>
                      </div>
                    )}
                    {contact.favorite_movies && contact.favorite_movies.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Favorite Movies</dt>
                        <dd className="text-sm text-gray-900">
                          {contact.favorite_movies.join(', ')}
                        </dd>
                      </div>
                    )}
                    {contact.favorite_tv_shows && contact.favorite_tv_shows.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Favorite TV Shows</dt>
                        <dd className="text-sm text-gray-900">
                          {contact.favorite_tv_shows.join(', ')}
                        </dd>
                      </div>
                    )}
                    {contact.favorite_music_artists && contact.favorite_music_artists.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Favorite Music Artists</dt>
                        <dd className="text-sm text-gray-900">
                          {contact.favorite_music_artists.join(', ')}
                        </dd>
                      </div>
                    )}
                    {contact.favorite_foods && contact.favorite_foods.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Favorite Foods</dt>
                        <dd className="text-sm text-gray-900">
                          {contact.favorite_foods.join(', ')}
                        </dd>
                      </div>
                    )}
                    {contact.favorite_drinks && contact.favorite_drinks.length > 0 && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Favorite Drinks</dt>
                        <dd className="text-sm text-gray-900">
                          {contact.favorite_drinks.join(', ')}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>

            {/* Second section: Notes & Engagement and History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Notes & Engagement */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes & Engagement</h2>
                {contact.notes && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-700">{contact.notes}</p>
                  </div>
                )}
                <div className="space-y-3">
                  <form onSubmit={handleEngagement} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Engagement Type
                        </label>
                        <select
                          value={engagementForm.type}
                          onChange={(e) => setEngagementForm({
                            ...engagementForm,
                            type: e.target.value as EngagementType
                          })}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          {engagementTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label} (+{type.points} points)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Notes
                        </label>
                        <input
                          type="text"
                          placeholder="Add details about the interaction"
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={engagementForm.notes}
                          onChange={(e) => setEngagementForm({
                            ...engagementForm,
                            notes: e.target.value
                          })}
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Log Engagement
                    </button>
                  </form>
                </div>
              </div>

              {/* Engagement History */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement History</h2>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  {contact.engagements.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                      {contact.engagements.map((engagement) => (
                        <div key={engagement.id} className="p-4 hover:bg-gray-100 transition-colors duration-150">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                engagement.type === 'in-person'
                                  ? 'bg-green-100 text-green-800'
                                  : engagement.type === 'video-call'
                                  ? 'bg-blue-100 text-blue-800'
                                  : engagement.type === 'online-message'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {engagement.type.replace('-', ' ')}
                              </span>
                              <span className="text-sm text-gray-500">
                                {format(parseISO(engagement.date), 'MMM d, yyyy h:mm a')}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-indigo-600">
                              +{engagement.points} points
                            </span>
                          </div>
                          {engagement.notes && (
                            <p className="text-sm text-gray-600 mt-1">{engagement.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No engagement history yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ContactDetail;