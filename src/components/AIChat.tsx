import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, X, MessageCircle, Sparkles, Heart, Activity, Apple, Dumbbell, Brain, Moon } from 'lucide-react';
import { aiService } from '@/services/aiService';
import AIConfigComponent from './AIConfig';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  confidence?: number;
  metadata?: any;
}

interface WellnessCategory {
  icon: React.ReactNode;
  label: string;
  prompt: string;
  color: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your SwasthZenith AI wellness assistant. I can help you with:\n\n• 🥗 Nutrition advice and meal planning\n• 💪 Workout recommendations and fitness guidance\n• 🧘‍♀️ Yoga tips and meditation advice\n• 📊 Health metrics and BMI calculations\n• 😴 Sleep optimization and stress management\n• 🎯 Weight management strategies\n\nHow can I assist you on your wellness journey today?",
      sender: 'ai',
      timestamp: new Date(),
      confidence: 1.0
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Wellness categories for quick prompts
  const wellnessCategories: WellnessCategory[] = [
    {
      icon: <Apple className="w-4 h-4" />,
      label: 'Nutrition',
      prompt: 'Can you help me with nutrition advice and meal planning?',
      color: 'bg-green-100 text-green-800 border-green-200'
    },
    {
      icon: <Dumbbell className="w-4 h-4" />,
      label: 'Fitness',
      prompt: 'I need workout recommendations and fitness guidance.',
      color: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    {
      icon: <Brain className="w-4 h-4" />,
      label: 'Mental Health',
      prompt: 'How can I improve my mental wellness and stress management?',
      color: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    {
      icon: <Moon className="w-4 h-4" />,
      label: 'Sleep',
      prompt: 'I need help with sleep optimization and better rest.',
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    },
    {
      icon: <Activity className="w-4 h-4" />,
      label: 'Health Metrics',
      prompt: 'Can you help me calculate BMI and track health metrics?',
      color: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    {
      icon: <Heart className="w-4 h-4" />,
      label: 'Wellness Tips',
      prompt: 'Give me some general wellness and lifestyle tips.',
      color: 'bg-pink-100 text-pink-800 border-pink-200'
    }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Check AI agent connection status
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('http://localhost:5000/health');
        if (response.ok) {
          setConnectionStatus('online');
        } else {
          setConnectionStatus('offline');
        }
      } catch (error) {
        setConnectionStatus('offline');
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (customPrompt?: string) => {
    const messageText = customPrompt || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customPrompt) setInputValue('');
    setIsLoading(true);

    try {
      console.log('Sending message to AI service:', messageText);
      const aiResponse = await aiService.getResponse(messageText);
      console.log('AI response received:', aiResponse);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        confidence: aiResponse.confidence,
        metadata: aiResponse.metadata
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Service Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to my AI service right now. Please check if the AI agent is running and try again. You can also try the offline mode for basic wellness tips.",
        sender: 'ai',
        timestamp: new Date(),
        confidence: 0.1
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your SwasthZenith AI wellness assistant. I can help you with:\n\n• 🥗 Nutrition advice and meal planning\n• 💪 Workout recommendations and fitness guidance\n• 🧘‍♀️ Yoga tips and meditation advice\n• 📊 Health metrics and BMI calculations\n• 😴 Sleep optimization and stress management\n• 🎯 Weight management strategies\n\nHow can I assist you on your wellness journey today?",
        sender: 'ai',
        timestamp: new Date(),
        confidence: 1.0
      }
    ]);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'checking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Test AI service functionality
  const testAIService = async () => {
    try {
      console.log('Testing AI service...');
      const testResponse = await aiService.getResponse('Hello, this is a test message.');
      console.log('AI service test successful:', testResponse);
      return true;
    } catch (error) {
      console.error('AI service test failed:', error);
      return false;
    }
  };

  // Test AI service on component mount
  useEffect(() => {
    testAIService();
  }, []);

  return (
    <>
      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <Bot className="w-6 h-6 text-white" />
        </Button>
        {/* Connection Status Indicator */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getConnectionStatusColor()}`}></div>
      </div>

      {/* AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-start p-6">
          <div className="w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <div>
                  <CardTitle className="text-white text-sm">SwasthZenith AI Assistant</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getConnectionStatusColor()}`}></div>
                    <span className="text-xs opacity-90">
                      {connectionStatus === 'online' ? 'Connected' : 
                       connectionStatus === 'offline' ? 'Offline' : 'Checking...'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <AIConfigComponent />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  className="text-white hover:bg-white/20"
                  title="Clear chat"
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Quick Wellness Categories */}
            {messages.length <= 1 && (
              <div className="p-4 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-gray-500" />
                  Quick Wellness Topics
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {wellnessCategories.map((category, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(category.prompt)}
                      className={`text-xs h-auto p-2 border ${category.color} hover:opacity-80 transition-all duration-200 hover:scale-105`}
                      style={{ borderRadius: '12px' }}
                    >
                      <div className="flex items-center space-x-1">
                        {category.icon}
                        <span>{category.label}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-white to-gray-50" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                      style={{
                        borderRadius: message.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        boxShadow: message.sender === 'user' 
                          ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
                          : '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'ai' && (
                          <div className="relative">
                            <Bot className="w-4 h-4 mt-1 text-gray-500 flex-shrink-0" />
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                        {message.sender === 'user' && (
                          <User className="w-4 h-4 mt-1 text-white flex-shrink-0" />
                        )}
                      </div>
                      {message.confidence && message.confidence < 0.8 && (
                        <div className="mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Low confidence response
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-lg p-3 border border-gray-200"
                         style={{ borderRadius: '18px 18px 18px 4px' }}>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Bot className="w-4 h-4 text-gray-500" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-500">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-gradient-to-t from-gray-50 to-white">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about nutrition, workouts, wellness..."
                  className="flex-1"
                  disabled={isLoading}
                  style={{ borderRadius: '20px' }}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 transition-all duration-200 hover:scale-110"
                  style={{ borderRadius: '20px' }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              {connectionStatus === 'offline' && (
                <p className="text-xs text-gray-500 mt-2">
                  ⚠️ AI agent is offline. Using fallback responses.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat; 