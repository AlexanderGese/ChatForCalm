import React, { useEffect } from 'react';
import { HeartPulse, Brain, Sparkles } from 'lucide-react';
import Chat from './components/Chat';
import MeditationTimer from './components/MeditationTimer';
import BreathingExercise from './components/BreathingExercise';
import ResourceLibrary from './components/ResourceLibrary';
import VisitorCounter from './components/VisitorCounter';
import Footer from './components/Footer';
import { incrementUniqueVisitors } from './lib/firebase';

function App() {
  useEffect(() => {
    const mockIpHash = Math.random().toString(36).substring(7);
    incrementUniqueVisitors(mockIpHash);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-50"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-6 space-x-6">
              <div className="transform hover:scale-110 transition-transform duration-200">
                <HeartPulse className="w-12 h-12 text-indigo-500" />
              </div>
              <div className="transform hover:scale-110 transition-transform duration-200">
                <Brain className="w-12 h-12 text-purple-500" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 mb-4">
              Mental Health Support
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              A safe space for anonymous support and guidance. Chat with Hope, your mental health support assistant, 
              for emotional support, coping strategies, and resources.
            </p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          <VisitorCounter />
          <Chat />
          
          <div className="grid md:grid-cols-2 gap-6">
            <MeditationTimer />
            <BreathingExercise />
          </div>
          
          <ResourceLibrary />

          <div className="mt-12">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-purple-100 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center mb-4 space-x-3">
                <Sparkles className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold text-purple-600">Emergency Support</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-50/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-indigo-700 mb-2">24/7 Crisis Support</h3>
                  <p className="text-gray-600">
                    National Crisis Hotline:{" "}
                    <a href="tel:988" className="text-indigo-500 hover:underline font-medium">
                      988
                    </a>
                  </p>
                </div>
                <div className="bg-purple-50/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-purple-700 mb-2">Text Support</h3>
                  <p className="text-gray-600">
                    Text HOME to{" "}
                    <span className="text-purple-500 font-medium">741741</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;