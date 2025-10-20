'use client';

import { useState } from 'react';

export default function SpookyButton({ children, onClick, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(prev => prev + 1);
    
    // Create spooky sound effect (visual feedback)
    if (typeof window !== 'undefined') {
      // Flash effect
      document.body.style.background = '#ff6b00';
      setTimeout(() => {
        document.body.style.background = '';
      }, 100);
    }
    
    if (onClick) onClick();
  };

  const spookyMessages = [
    '👻 Boo!',
    '🎃 Happy Halloween!',
    '💀 Spooky!',
    '🦇 Scared yet?',
    '🕷️ Web of fear!',
    '🌙 Dark night...',
    '⚡ Thunder strikes!',
    '🔮 Magic spell!'
  ];

  return (
    <div className="relative">
      <button
        className={`relative px-8 py-3 font-semibold rounded-lg transition-all duration-300 transform 
          ${isHovered ? 'scale-110 shadow-lg shadow-orange-500/50' : 'scale-100'} 
          bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700
          border-2 border-orange-400 hover:border-orange-300
          ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <span className="relative z-10">{children}</span>
        
        {/* Glowing effect */}
        <div className={`absolute inset-0 rounded-lg bg-orange-400 opacity-0 transition-opacity duration-300 
          ${isHovered ? 'opacity-20' : 'opacity-0'}`} />
        
        {/* Sparkle effect on hover */}
        {isHovered && (
          <div className="absolute -top-1 -right-1 text-yellow-300 animate-ping">✨</div>
        )}
      </button>
      
      {/* Click counter with spooky message */}
      {clicks > 0 && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm text-orange-300 animate-bounce">
          {spookyMessages[clicks % spookyMessages.length]}
        </div>
      )}
    </div>
  );
}
