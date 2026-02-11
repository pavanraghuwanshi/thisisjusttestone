import React, { useState } from 'react';
import { GiftFormData } from '../types';

const GiftForm: React.FC = () => {
  const [formData, setFormData] = useState<GiftFormData>({
    address: '',
    giftIdea: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // WhatsApp configuration
    // Assuming +91 (India) based on the phone number format. 
    // If incorrect, remove '91' and just use '8120409279'
    const phoneNumber = "918120409279"; 
    
    const message = `Hey! I said YES to being your Valentine! 💖\n\n` +
      `Here are my details for the gift:\n` +
      `📍 Address: ${formData.address}\n` +
      `🎁 Gift Wish: ${formData.giftIdea}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success UI
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div id="gift-form" className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center bg-white/80 backdrop-blur-md rounded-3xl shadow-xl max-w-2xl mx-auto my-10 border border-valentine-200">
        <div className="text-6xl mb-4">📱</div>
        <h2 className="text-3xl font-bold text-valentine-700 mb-4">Opening WhatsApp...</h2>
        <p className="text-gray-700 text-lg">
          If WhatsApp didn't open automatically, click the button below.
        </p>
        <button 
          onClick={handleSubmit}
          className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
        >
          Open WhatsApp Again
        </button>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline block"
        >
          Edit Details
        </button>
      </div>
    );
  }

  return (
    <div id="gift-form" className="w-full max-w-3xl mx-auto px-4 pb-20">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-valentine-100 my-12">
        <div className="bg-gradient-to-r from-valentine-500 to-valentine-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white font-script">Send me a Gift! 🎁</h2>
          <p className="text-valentine-100 mt-2">I'll send these details directly to your WhatsApp</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-valentine-800 font-semibold mb-2">Address</label>
              <input
                required
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-valentine-200 focus:border-valentine-500 focus:ring-2 focus:ring-valentine-200 outline-none transition-all placeholder-valentine-200"
                placeholder="Enter your delivery address..."
              />
            </div>

            <div>
              <label className="block text-valentine-800 font-semibold mb-2">What gift do you want?</label>
              <textarea
                required
                name="giftIdea"
                value={formData.giftIdea}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-valentine-200 focus:border-valentine-500 focus:ring-2 focus:ring-valentine-200 outline-none transition-all placeholder-valentine-200"
                placeholder="I want..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform flex items-center justify-center gap-2"
            >
              <span>Send on WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.667-.272-.985-.47-.149-.669.049-.198.198-.743.742-1.139 1.139-.396.397-.792.447-1.337.173-.545-.273-2.296-8.473-4.375-2.701-.272-.224-.495-.52-.718-.867-.223-.347-.025-.521.124-.669.123-.123.272-.322.421-.495.149-.174.198-.298.297-.495.099-.198.05-.372-.025-.52-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487 2.982 1.288 2.982.859 3.528.802.544-.057 1.758-.718 2.006-1.411.248-.693.248-1.288.173-1.411z"/></svg>
            </button>
            
            <p className="text-center text-xs text-gray-500 mt-2">
              Clicking submit will open WhatsApp with your message pre-filled.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiftForm;
