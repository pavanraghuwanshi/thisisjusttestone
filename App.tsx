import React from 'react';
import FloatingHearts from './components/FloatingHearts';
import Proposal from './components/Proposal';
import GiftForm from './components/GiftForm';

const App: React.FC = () => {
  const handleAccept = () => {
    // Scroll to the form when user clicks Yes
    const formElement = document.getElementById('gift-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-800 relative min-h-screen bg-gradient-to-b from-valentine-50 to-valentine-100 overflow-x-hidden">
      {/* Background Effect */}
      <FloatingHearts />

      {/* Main Content Area */}
      <main className="relative z-10">
        <Proposal onAccept={handleAccept} />
        
        <div className="animate-fade-in-up">
           <GiftForm />
        </div>
      </main>

      <footer className="relative z-10 p-4 text-center text-valentine-800/50 text-sm mt-auto">
        <p>Made with ❤️</p>
      </footer>
    </div>
  );
};

export default App;
