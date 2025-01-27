import React, { useState, useEffect } from 'react';
import { Timer, Pause, Play, RefreshCw } from 'lucide-react';

export default function MeditationTimer() {
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
    setTimeLeft(newDuration * 60);
    setIsActive(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-indigo-100">
      <div className="flex items-center mb-6 space-x-3">
        <Timer className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-semibold text-indigo-600">Meditation Timer</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-indigo-50/50 p-4 rounded-xl">
          <p className="text-gray-600 text-sm">
            Take a moment to breathe and center yourself. Choose your meditation duration 
            and follow your breath.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          {[5, 10, 15, 20].map((mins) => (
            <button
              key={mins}
              onClick={() => handleDurationChange(mins)}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                duration === mins
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              {mins}m
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-48 h-48 rounded-full border-8 border-indigo-100 flex items-center justify-center">
            <span className="text-4xl font-bold text-indigo-600">
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={toggleTimer}
              className="p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200"
            >
              {isActive ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
            >
              <RefreshCw className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="text-center text-gray-600 text-sm">
          {isActive ? (
            <p>Find a comfortable position and focus on your breath</p>
          ) : timeLeft === 0 ? (
            <p>Great job! Take a moment to notice how you feel</p>
          ) : (
            <p>Select duration and press play to begin</p>
          )}
        </div>
      </div>
    </div>
  );
}