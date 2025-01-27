import React, { useState, useEffect } from 'react';
import { SmilePlus, BarChart } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

export default function MoodTracker() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState(3);
  const [note, setNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('moodEntries');
    if (saved) {
      setMoodEntries(JSON.parse(saved));
    }
  }, []);

  const saveMoodEntry = () => {
    const newEntry = {
      date: new Date().toISOString(),
      mood: currentMood,
      note,
    };
    const updatedEntries = [...moodEntries, newEntry];
    setMoodEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    setNote('');
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😕', '😐', '🙂', '😊'];
    return emojis[mood - 1];
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-100">
      <div className="flex items-center mb-6 space-x-3">
        <SmilePlus className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-semibold text-indigo-600">Mood Tracker</h2>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col space-y-4">
          <label className="text-gray-700 font-medium">How are you feeling?</label>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((mood) => (
              <button
                key={mood}
                onClick={() => setCurrentMood(mood)}
                className={`text-2xl p-2 rounded-full transition-transform hover:scale-110 ${
                  currentMood === mood ? 'bg-indigo-100 scale-110' : ''
                }`}
              >
                {getMoodEmoji(mood)}
              </button>
            ))}
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about how you're feeling..."
            className="mt-4 w-full p-3 rounded-xl border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={3}
          />
          <button
            onClick={saveMoodEntry}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl py-2 px-4 hover:opacity-90 transition-all duration-200"
          >
            Save Entry
          </button>
        </div>

        {moodEntries.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center mb-4 space-x-2">
              <BarChart className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-medium text-gray-700">Mood History</h3>
            </div>
            <div className="space-y-3">
              {moodEntries.slice(-5).reverse().map((entry, index) => (
                <div
                  key={index}
                  className="bg-white/50 p-4 rounded-xl border border-indigo-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-gray-600 text-sm">{entry.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}