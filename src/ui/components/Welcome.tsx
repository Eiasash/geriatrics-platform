import React from 'react';
import { Sparkles, Rocket, Heart } from 'lucide-react';

export default function Welcome() {
  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg max-w-sm animate-pulse">
      <div className="flex items-center space-x-2">
        <Sparkles className="h-5 w-5" />
        <span className="font-semibold">Platform Successfully Deployed!</span>
      </div>
      <p className="text-sm mt-1 opacity-90">
        Auto-deployment is active. Every push updates the live site!
      </p>
      <div className="flex items-center space-x-4 mt-2 text-xs">
        <span className="flex items-center">
          <Rocket className="h-3 w-3 mr-1" />
          Vercel
        </span>
        <span className="flex items-center">
          <Heart className="h-3 w-3 mr-1" />
          GitHub
        </span>
      </div>
    </div>
  );
}