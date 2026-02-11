import React, { useState, useEffect } from 'react';
import { Coordinates } from '../types';

interface ProposalProps {
  onAccept: () => void;
}

// CONFIGURATION:
// Please create a folder named 'assets' in your project directory.
// Save your specific images there with these filenames:
const images = [
  "./assets/cartoon_girl.jpg",  // Image 1: The cartoon/anime girl in yellow
  "./assets/chocolate_bar.jpg", // Image 2: The custom chocolate gift
  "./assets/collage.jpg"        // Image 3: The photo collage
];

const Proposal: React.FC<ProposalProps> = ({ onAccept }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<Coordinates>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setViewport({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const moveButton = () => {
    const padding = 100; 
    const maxX = viewport.width - padding;
    const maxY = viewport.height - padding;

    const safeMaxX = Math.max(0, maxX);
    const safeMaxY = Math.max(0, maxY);

    const newX = Math.random() * safeMaxX + (padding / 2);
    const newY = Math.random() * safeMaxY + (padding / 2);

    setNoBtnPosition({ x: newX, y: newY });
    setIsHovered(true);
  };

  // Fallback function in case images are missing
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&h=600&q=80"; // Fallback image
    e.currentTarget.alt = "Image not found - please check assets folder";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 relative z-10 pt-10">
      
      {/* Image Gallery */}
      <div className="flex flex-wrap justify-center gap-6 mb-10 max-w-4xl">
        {images.map((src, index) => (
          <div 
            key={index} 
            className={`
              relative group
              w-44 h-64 md:w-56 md:h-80
              ${index === 1 ? 'mt-0 md:-mt-12 z-20' : 'z-10'} 
              animate-float
              cursor-pointer
            `}
            style={{ animationDelay: `${index * 1.5}s` }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-valentine-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            
            <img 
              src={src} 
              onError={handleImageError}
              alt={`Valentine Memory ${index + 1}`} 
              className="w-full h-full object-cover rounded-2xl border-4 border-white shadow-2xl 
                         transform transition-all duration-500 ease-out
                         group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-1"
            />
            
            {/* Heart Overlay */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 text-4xl drop-shadow-md">
              💖
            </div>
          </div>
        ))}
      </div>
      
      <h1 className="font-script text-6xl md:text-8xl text-valentine-600 mb-10 drop-shadow-md tracking-wide">
        Will you be my Valentine?
      </h1>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-lg relative h-64 md:h-32">
        {/* YES Button */}
        <button
          onClick={onAccept}
          className="bg-valentine-500 hover:bg-valentine-600 text-white font-bold py-4 px-12 rounded-full text-2xl shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse-fast z-30 hover:shadow-valentine-400/50 border-4 border-white"
        >
          Yes, Absolutely! 💖
        </button>

        {/* NO Button - The "Runner" */}
        <button
          onMouseEnter={moveButton}
          onClick={moveButton} 
          style={
            isHovered
              ? {
                  position: 'fixed',
                  left: `${noBtnPosition.x}px`,
                  top: `${noBtnPosition.y}px`,
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', 
                  zIndex: 50, 
                }
              : {}
          }
          className={`bg-gray-200 text-gray-600 hover:bg-gray-300 font-bold py-4 px-10 rounded-full text-xl shadow-md transition-all z-20 border-4 border-white ${!isHovered ? 'relative' : ''}`}
        >
          No 😢
        </button>
      </div>

      <p className="mt-16 text-valentine-800 text-sm md:text-base opacity-70 font-sans italic">
        (Warning: The "No" button is very shy and likes to run away!)
      </p>
    </div>
  );
};

export default Proposal;
