import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

const resources = [
  {
    title: 'Understanding Anxiety',
    description: 'Learn about anxiety symptoms and coping strategies.',
    link: 'https://www.nimh.nih.gov/health/topics/anxiety-disorders',
    category: 'Education',
  },
  {
    title: 'Mindfulness Practices',
    description: 'Simple mindfulness exercises for daily life.',
    link: 'https://www.mindful.org/meditation/mindfulness-getting-started',
    category: 'Techniques',
  },
  {
    title: 'Sleep Hygiene Guide',
    description: 'Tips for better sleep and mental health.',
    link: 'https://www.sleepfoundation.org/sleep-hygiene',
    category: 'Wellness',
  },
  {
    title: 'Stress Management',
    description: 'Effective strategies to manage stress.',
    link: 'https://www.health.harvard.edu/topics/stress',
    category: 'Techniques',
  },
];

export default function ResourceLibrary() {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-100">
      <div className="flex items-center mb-6 space-x-3">
        <BookOpen className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-semibold text-indigo-600">Resource Library</h2>
      </div>

      <div className="grid gap-4">
        {resources.map((resource, index) => (
          <a
            key={index}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white/50 rounded-xl p-4 border border-indigo-50 hover:border-indigo-200 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-indigo-600 group-hover:text-indigo-700 mb-1 flex items-center">
                  {resource.title}
                  <ExternalLink className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100" />
                </h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
                {resource.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}