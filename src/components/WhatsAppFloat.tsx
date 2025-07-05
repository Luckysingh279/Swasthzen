import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, X } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating WhatsApp Button */}
      <div className="relative">
        {/* Main WhatsApp Button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-in slide-in-from-bottom-2 duration-200">
            {/* Chat with Coach */}
            <Button
              onClick={() => {
                window.open('https://wa.me/917760210344?text=Hi! I would like to chat with a wellness coach about my fitness goals.', '_blank');
                setIsExpanded(false);
              }}
              className="w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with Coach
            </Button>

            {/* Join Community */}
            <Button
              onClick={() => {
                window.open('https://chat.whatsapp.com/Ecgmkb3479KFbO70Xb78jm', '_blank');
                setIsExpanded(false);
              }}
              className="w-auto px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Community
            </Button>

            {/* Close Button */}
            <Button
              onClick={() => setIsExpanded(false)}
              className="w-auto px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Backdrop to close when clicking outside */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default WhatsAppFloat; 