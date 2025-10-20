'use client';

import { useState, useEffect } from 'react';

export default function HalloweenBackground() {
  const [bats, setBats] = useState([]);

  useEffect(() => {
    // Create floating bats
    const batCount = 5;
    const newBats = [];
    
    for (let i = 0; i < batCount; i++) {
      newBats.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      });
    }
    
    setBats(newBats);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating bats */}
      {bats.map((bat) => (
        <div
          key={bat.id}
          className="absolute text-2xl animate-float"
          style={{
            left: `${bat.x}%`,
            top: `${bat.y}%`,
            animationDelay: `${bat.delay}s`,
            animationDuration: `${bat.duration}s`
          }}
        >
          🦇
        </div>
      ))}
      
      {/* Floating spiders */}
      <div className="absolute top-10 left-10 text-xl animate-bounce" style={{ animationDelay: '1s' }}>
        🕷️
      </div>
      <div className="absolute top-20 right-20 text-xl animate-bounce" style={{ animationDelay: '2s' }}>
        🕷️
      </div>
      <div className="absolute bottom-32 left-1/4 text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>
        🕷️
      </div>
      
      {/* Floating ghosts */}
      <div className="absolute top-1/3 right-10 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>
        👻
      </div>
      <div className="absolute bottom-1/3 left-10 text-3xl animate-float" style={{ animationDelay: '2.5s' }}>
        👻
      </div>
    </div>
  );
}
