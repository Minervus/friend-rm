import React from 'react';
import { Link } from 'react-router-dom';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { MapPin, Briefcase, Calendar, Clock } from 'lucide-react';
import { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  showBirthday?: boolean;
  showLastEngagement?: boolean;
}

const relationshipColors = {
  close_friend: 'bg-purple-900/50 text-purple-200',
  friend: 'bg-blue-900/50 text-blue-200',
  work: 'bg-green-900/50 text-green-200',
  family: 'bg-red-900/50 text-red-200',
  acquaintance: 'bg-gray-800/50 text-gray-200',
};

function ContactCard({ contact, showBirthday, showLastEngagement }: ContactCardProps) {
  const getProgressColor = (score: number) => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Link
      to={`/contacts/${contact.id}`}
      className="block bg-white dark:bg-dark-card rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-900/50 hover:bg-gray-50 dark:hover:bg-dark-hover transition-all duration-200"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              {contact.imageUrl ? (
                <img
                  src={contact.imageUrl}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                  {contact.name.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{contact.name}</h3>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  relationshipColors[contact.relationship]
                }`}
              >
                {contact.relationship.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(contact.engagementScore)} transition-all duration-300`}
                style={{ width: `${contact.engagementScore}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {contact.engagementScore}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {contact.location && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm">{contact.location}</span>
            </div>
          )}
          {contact.job && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Briefcase className="w-4 h-4 mr-2" />
              <span className="text-sm">{contact.job}</span>
            </div>
          )}
          {showBirthday && contact.birthday && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Birthday: {format(parseISO(contact.birthday), 'MMM do')}
              </span>
            </div>
          )}
          {showLastEngagement && contact.lastEngagement && (
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">
                Last contact:{' '}
                {formatDistanceToNow(parseISO(contact.lastEngagement), {
                  addSuffix: true,
                })}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ContactCard;