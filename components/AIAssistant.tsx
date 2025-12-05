import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, X, Loader2, Sparkles } from 'lucide-react';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  contextData: string;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose, contextData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Kusoo dhawaada LandPro! Waxaan ahay LandBot. Sideen kaa caawin karaa maamulka hantidaada maanta?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Pass the real-time app data as context to the AI
    const responseText = await getAIResponse(input, contextData);
    
    const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 transform transition-transform duration-300 ease-in-out font-sans">
      {/* Header */}
      <div className="bg-brand-700 p-4 flex justify-between items-center text-white shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white/20 p-1.5 rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none">LandBot AI</h2>
            <p className="text-[10px] text-brand-200 opacity-90">LandPro Assistant</p>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-brand-800 p-1.5 rounded-full text-white transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-3 rounded-lg text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-br-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' && <Bot className="h-4 w-4 mb-1 text-brand-600 inline-block mr-2" />}
              <span className="whitespace-pre-wrap leading-relaxed">{msg.text}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Waydii xaaladda guryaha..."
            className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-brand-600 text-white p-2.5 rounded-lg hover:bg-brand-700 disabled:opacity-50 transition-colors shadow-sm"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">Wuxuu ku xiran yahay xogta LandPro (Live)</p>
      </div>
    </div>
  );
};