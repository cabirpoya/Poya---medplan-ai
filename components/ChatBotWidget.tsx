import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiMessageSquare, FiX, FiCpu, FiBook, FiDatabase, FiAlertTriangle } from 'react-icons/fi';
import { geminiClient } from '../lib/gemini-client';
import { KnowledgeBase } from '../lib/knowledge-base';
import FormattedText from './FormattedText';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  source?: 'knowledge-base' | 'ai' | 'error' | 'self-learned';
}

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {role: 'assistant', content: 'سلام! من دستیار POYA هستم. چطور می‌توانم کمک کنم؟', source: 'ai'}
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const knowledgeBase = new KnowledgeBase();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, {role: 'user', content: userMessage}]);
    setInputValue('');
    setIsLoading(true);

    try {
      const foundPlant = knowledgeBase.findPlant(userMessage);

      const history = messages
        .slice(1) 
        .filter(m => m.role !== 'assistant' || m.source === 'ai') 
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }));

      const aiResponsePromise = geminiClient.chat(userMessage, history);
      const aiText = await aiResponsePromise;

      setMessages(prev => [...prev, {
        role: 'assistant', 
        content: aiText || 'متاسفانه پاسخی دریافت نشد.',
        source: 'ai'
      }]);

      if (foundPlant) {
         const isSelfLearned = foundPlant.source.includes('خودآموز') || foundPlant.source.includes('کاربر');
         
         const kbResponse = `### ${foundPlant.persianName} (${foundPlant.scientificName})\n` +
           `### خواص درمانی\n${foundPlant.properties.join('، ')}\n` +
           `### ایمنی و سمیت\n${foundPlant.clinicalSafety.toxicity}\n\n` +
           `_منبع: ${foundPlant.source}_`;
         
         setTimeout(() => {
             setMessages(prev => [...prev, {
                role: 'assistant',
                content: kbResponse,
                source: isSelfLearned ? 'self-learned' : 'knowledge-base'
             }]);
         }, 500);
      }

    } catch (error) {
      console.error("Chat Widget Error:", error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'متاسفانه خطایی رخ داد.',
        source: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-8 left-8 bg-gradient-to-r from-primary to-emerald-500 text-white p-4 rounded-2xl shadow-glow hover:shadow-glow-sec hover:-translate-y-1 transition-all z-50 group"
        aria-label="باز کردن پشتیبانی آنلاین"
      >
        <FiMessageSquare size={28} className="group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div 
      className="fixed bottom-8 left-8 w-96 glass-card rounded-3xl shadow-2xl border border-white/50 z-50 flex flex-col max-h-[70vh] overflow-hidden font-vazir animate-fade-in"
      role="dialog"
      aria-label="پنجره چت"
    >
      <div className="bg-gradient-to-r from-primary to-emerald-600 text-white p-5 flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h3 className="font-bold flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center"><FiMessageSquare /></div>
            <span>دستیار هوشمند <span dir="ltr" className="font-sans font-bold opacity-90">POYA</span></span>
        </h3>
        <button 
          onClick={toggleChat} 
          className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors relative z-10"
          aria-label="بستن چت"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="flex-1 p-5 overflow-y-auto bg-slate-50 scrollbar-thin" role="log" aria-live="polite">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[90%] p-3.5 rounded-2xl shadow-sm text-sm border transition-all duration-200 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-primary to-emerald-600 text-white border-transparent rounded-tr-none shadow-glow' 
                  : message.source === 'knowledge-base'
                  ? 'bg-emerald-50/80 border-emerald-100 border-r-4 border-r-emerald-500 text-emerald-900 rounded-tl-none'
                  : message.source === 'self-learned'
                  ? 'bg-indigo-50/80 border-indigo-100 border-r-4 border-r-indigo-500 text-indigo-900 rounded-tl-none'
                  : message.source === 'ai'
                  ? 'bg-white border-gray-100 border-r-4 border-r-blue-400 text-slate-700 rounded-tl-none shadow-sm'
                  : 'bg-red-50 border-red-100 border-r-4 border-r-red-500 text-red-800 rounded-tl-none'
              }`}
            >
               {message.role === 'assistant' && (
                  <div className={`text-[10px] font-bold mb-2 pb-1.5 border-b flex items-center gap-1.5 opacity-90 ${
                    message.source === 'knowledge-base' ? 'border-emerald-200 text-emerald-700' : 
                    message.source === 'self-learned' ? 'border-indigo-200 text-indigo-700' :
                    message.source === 'ai' ? 'border-gray-100 text-blue-500' : 
                    'border-red-200 text-red-600'
                  }`}>
                    {message.source === 'knowledge-base' ? <><FiBook size={12}/> <span>پایگاه دانش</span></> : 
                     message.source === 'self-learned' ? <><FiDatabase size={12}/> <span>آموزش دیده</span></> :
                     message.source === 'ai' ? <><FiCpu size={12}/> <span>هوش مصنوعی</span></> :
                     <><FiAlertTriangle size={12}/> <span>خطا</span></>}
                  </div>
               )}
              
               {message.role === 'assistant' ? (
                  <FormattedText 
                    text={message.content} 
                    className={
                        message.source === 'knowledge-base' ? 'text-emerald-900' : 
                        message.source === 'self-learned' ? 'text-indigo-900' :
                        'text-slate-700'
                    } 
                  />
               ) : (
                  <div className="text-white leading-relaxed">{message.content}</div>
               )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block p-4 bg-white rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
              <div className="flex space-x-1 items-center h-4" aria-label="در حال نوشتن">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-white/50 bg-white/80 backdrop-blur-md">
        <div className="flex gap-2 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="سوال خود را بپرسید..."
            className="flex-1 p-3.5 pl-4 border-none bg-gray-100/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-dark transition-all placeholder-gray-400"
            disabled={isLoading}
            aria-label="متن پیام"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="bg-primary text-white p-3.5 rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary/20 active:scale-95 transform"
            aria-label="ارسال پیام"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}