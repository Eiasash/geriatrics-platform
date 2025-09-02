import React from 'react';
import { Sparkles, Rocket, Heart } from 'lucide-react';

export default function Welcome() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000); // Hide after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg max-w-sm animate-pulse z-50">
      <button 
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 text-white/80 hover:text-white"
      >
        ×
      </button>
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