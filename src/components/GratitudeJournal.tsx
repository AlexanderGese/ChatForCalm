import React, { useState, useEffect } from 'react';
import { Heart, Calendar, Star } from 'lucide-react';

interface GratitudeEntry {
  id: string;
  date: string;
  entries: string[];
}

export default function GratitudeJournal() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [currentEntries, setCurrentEntries] = useState(['', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gratitudeEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  const saveEntry = () => {
    const validEntries = currentEntries.filter(entry => entry.trim() !== '');
    if (validEntries.length === 0) return;

    setIsSubmitting(true);
    const newEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      entries: validEntries,
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('gratitudeEntries', JSON.stringify(updatedEntries));
    setCurrentEntries(['', '', '']);
    setIsSubmitting(false);
  };

  const handleEntryChange = (index: number, value: string) => {
    const newEntries = [...currentEntries];
    newEntries[index] = value;
    setCurrentEntries(newEntries);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-100">
      <div className="flex items-center mb-6 space-x-3">
        <Heart className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-semibold text-indigo-600">Gratitude Journal</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-indigo-50/50 p-4 rounded-xl">
          <p className="text-gray-600 text-sm">
            Taking time to appreciate the good things in life, no matter how small,
            can significantly improve your mental well-being.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">
            What are you grateful for today?
          </h3>
          {currentEntries.map((entry, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Star className="w-5 h-5 text-yellow-400 mt-3" />
              <input
                type="text"
                value={entry}
                onChange={(e) => handleEntryChange(index, e.target.value)}
                placeholder={`I'm grateful for...`}
                className="flex-1 p-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50"
              />
            </div>
          ))}
          <button
            onClick={saveEntry}
            disabled={isSubmitting || currentEntries.every(e => e.trim() === '')}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl py-2 px-4 hover:opacity-90 disabled:opacity-50 transition-all duration-200"
          >
            Save Today's Gratitude
          </button>
        </div>

        {entries.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center mb-4 space-x-2">
              <Calendar className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-medium text-gray-700">Recent Entries</h3>
            </div>
            <div className="space-y-4">
              {entries.slice(-3).reverse().map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white/50 p-4 rounded-xl border border-indigo-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {entry.entries.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 mt-1" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}