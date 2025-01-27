import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { getTotalVisitors } from '../lib/firebase';

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    getTotalVisitors((count) => {
      setVisitorCount(count);
    });
  }, []);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-indigo-100 transform hover:scale-[1.02] transition-all duration-300">
        <Users className="w-8 h-8 text-indigo-500" />
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {visitorCount.toLocaleString()} people supported
        </span>
      </div>
    </div>
  );
}