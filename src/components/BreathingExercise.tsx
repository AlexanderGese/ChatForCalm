import React, { useState, useEffect } from 'react';
import { Wind } from 'lucide-react';

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            switch (phase) {
              case 'inhale':
                setPhase('hold');
                return 0;
              case 'hold':
                setPhase('exhale');
                return 0;
              case 'exhale':
                setPhase('inhale');
                return 0;
            }
          }
          return prev + 2;
        });
      }, 80);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, phase]);

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe out...';
    }
  };

  const toggleExercise = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('inhale');
      setProgress(0);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-100">
      <div className="flex items-center mb-6 space-x-3">
        <Wind className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-semibold text-indigo-600">Breathing Exercise</h2>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-48 h-48">
          <div
            className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
              isActive ? 'border-indigo-500' : 'border-gray-200'
            }`}
          />
          <div
            className="absolute inset-0 rounded-full border-4 border-indigo-500 transition-all duration-300"
            style={{
              clipPath: `polygon(50% 50%, -50% -50%, ${progress}% -50%, ${progress}% ${progress}%, -50% ${progress}%)`,
              transform: 'rotate(-90deg)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-medium text-indigo-600">
              {isActive ? getInstructions() : 'Ready?'}
            </span>
          </div>
        </div>

        <button
          onClick={toggleExercise}
          className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
            isActive
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
          }`}
        >
          {isActive ? 'Stop' : 'Start Breathing Exercise'}
        </button>

        {!isActive && (
          <p className="text-gray-600 text-center max-w-sm">
            Take a moment to relax with this guided breathing exercise.
            Follow the circle's rhythm for a calming experience.
          </p>
        )}
      </div>
    </div>
  );
}