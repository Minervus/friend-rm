import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useContactStore } from '../store/contactStore';
import ContactCard from '../components/ContactCard';
import AddContactModal from '../components/AddContactModal';
import { RelationType } from '../types/contact';

function Contacts() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const contacts = useContactStore((state) => state.contacts);
  const fetchContacts = useContactStore((state) => state.fetchContacts);
  const searchQuery = useContactStore((state) => state.searchQuery);
  const relationshipFilter = useContactStore((state) => state.relationshipFilter);
  const setSearchQuery = useContactStore((state) => state.setSearchQuery);
  const setRelationshipFilter = useContactStore((state) => state.setRelationshipFilter);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = relationshipFilter === 'all' || contact.relationship === relationshipFilter;
    return matchesSearch && matchesFilter;
  });

  const relationshipCounts = contacts.reduce((acc, contact) => {
    acc[contact.relationship] = (acc[contact.relationship] || 0) + 1;
    return acc;
  }, {} as Record<RelationType, number>);

  const totalContacts = contacts.length;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm dark:shadow-gray-900/50 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Network Summary</h2>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Total Contacts: <span className="font-semibold">{totalContacts}</span>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap">
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Close Friends</span>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{relationshipCounts.close_friend || 0}</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Friends</span>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{relationshipCounts.friend || 0}</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Work</span>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{relationshipCounts.work || 0}</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Family</span>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{relationshipCounts.family || 0}</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">Acquaintances</span>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{relationshipCounts.acquaintance || 0}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={relationshipFilter}
            onChange={(e) => setRelationshipFilter(e.target.value as RelationType | 'all')}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="all">All Relationships</option>
            <option value="close_friend">Close Friends</option>
            <option value="friend">Friends</option>
            <option value="work">Work</option>
            <option value="family">Family</option>
            <option value="acquaintance">Acquaintances</option>
          </select>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-150"
          >
            Add Contact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            showBirthday
            showLastEngagement
          />
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No contacts found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}

export default Contacts;