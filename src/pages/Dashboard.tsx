import React from 'react';
import { useContactStore } from '../store/contactStore';
import { format, parseISO, differenceInDays } from 'date-fns';
import { Calendar, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Contact } from '../types/contact';

function Dashboard() {
  const contacts = useContactStore((state) => state.contacts);

  // Filter contacts with birthdays and sort by upcoming
  const upcomingBirthdays = contacts
    .filter((contact) => contact.birthday)
    .sort((a, b) => {
      const dateA = parseISO(a.birthday!);
      const dateB = parseISO(b.birthday!);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);

  // Filter contacts that need attention (engagement score <= 50)
  const needAttention = contacts
    .filter((contact) => contact.engagement_score <= 50)
    .sort((a, b) => a.engagement_score - b.engagement_score);

  const getProgressColor = (score: number) => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Upcoming Birthdays</h2>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm dark:shadow-gray-900/50 overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {upcomingBirthdays.length > 0 ? (
              upcomingBirthdays.map((contact) => (
                <li key={contact.id}>
                  <Link
                    to={`/contacts/${contact.id}`}
                    className="block hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors duration-150"
                  >
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                              {contact.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{contact.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {format(parseISO(contact.birthday!), 'MMMM do')}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
                No upcoming birthdays
              </li>
            )}
          </ul>
        </div>
      </section>

      <section>
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Need Attention</h2>
        </div>
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm dark:shadow-gray-900/50 overflow-hidden">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {needAttention.length > 0 ? (
              needAttention.map((contact) => (
                <li key={contact.id}>
                  <Link
                    to={`/contacts/${contact.id}`}
                    className="block hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors duration-150"
                  >
                    <div className="px-4 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                              {contact.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{contact.name}</p>
                          <div className="mt-1 flex items-center">
                            <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getProgressColor(contact.engagement_score)} transition-all duration-300`}
                                style={{ width: `${contact.engagement_score}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                              {contact.engagement_score}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
                All contacts are well maintained
              </li>
            )}
          </ul>
        </div>
      </section>

      {contacts.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No contacts yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by adding your first contact.
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;