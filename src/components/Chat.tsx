import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getChatResponse } from '../lib/gemini';

interface Message {
  text: string;
  isUser: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load messages from localStorage on component mount
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          text: "Hi, I'm Hope! I'm here to listen and support you. How are you feeling today?",
          isUser: false,
        },
      ]);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await getChatResponse(userMessage);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "I'm having trouble responding right now. Please try again.",
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('messages');
    localStorage.removeItem('chatHistory');
    setMessages([
      {
        text: "Hi, I'm Hope! I'm here to listen and support you. How are you feeling today?",
        isUser: false,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-indigo-100 transform hover:scale-[1.01] transition-all duration-300">
      <div className="flex justify-between items-center px-6 py-3 border-b border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-600">Chat with Hope</h2>
        <button
          onClick={clearChat}
          className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
          title="Clear chat history"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                message.isUser
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-800'
              } transform transition-all duration-200 hover:scale-[1.02]`}
            >
              <ReactMarkdown className="prose prose-sm">
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 shadow-sm">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-indigo-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-indigo-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 backdrop-blur-sm"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-3 hover:opacity-90 disabled:opacity-50 transform hover:scale-105 transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}