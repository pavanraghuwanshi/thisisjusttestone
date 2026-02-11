import React from 'react';

const FloatingHearts: React.FC = () => {
  // Create an array of hearts with random properties for variety
  const hearts = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 5 + 5}s`,
    animationDelay: `${Math.random() * 5}s`,
    scale: Math.random() * 0.5 + 0.5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-valentine-300 animate-float"
          style={{
            left: heart.left,
            bottom: '-10%',
            fontSize: `${heart.scale * 3}rem`,
            opacity: heart.opacity,
            animationDuration: heart.animationDuration,
            animationDelay: heart.animationDelay,
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
