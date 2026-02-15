import React, { useState, useRef } from 'react';
import { geminiClient } from '../lib/gemini-client';
import { KnowledgeBase } from '../lib/knowledge-base';
import FormattedText from '../components/FormattedText';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FiDownload, FiCpu, FiBook, FiDatabase, FiAlertTriangle } from 'react-icons/fi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  source?: 'knowledge-base' | 'ai' | 'error' | 'self-learned';
}

export default function ChatBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {role: 'assistant', content: 'سلام! من دستیار هوشمند POYA هستم. آماده پاسخگویی به سوالات شما درباره گیاهان دارویی.', source: 'ai'}
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const knowledgeBase = new KnowledgeBase();
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
        content: aiText || 'پاسخی دریافت نشد.',
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
       console.error("Chat Page Error:", error);
       setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'خطا در ارتباط با سرور.',
        source: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!chatContainerRef.current) return;
    setIsDownloading(true);

    try {
      // 1. Clone the node
      const originalElement = chatContainerRef.current;
      const clone = originalElement.cloneNode(true) as HTMLElement;

      // 2. Style the clone to show EVERYTHING
      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '0';
      clone.style.height = 'auto'; // Let it expand
      clone.style.maxHeight = 'none'; // Remove scroll limits
      clone.style.overflow = 'visible'; // Show overflow
      clone.style.width = `${originalElement.offsetWidth}px`; // Keep width consistent
      clone.style.zIndex = '-1000';
      
      // Ensure background is captured correctly
      clone.style.background = '#f8fafc'; // Matches slate-50

      // Append to body to render full height
      document.body.appendChild(clone);

      // 3. Capture the clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight
      });

      // 4. Remove clone
      document.body.removeChild(clone);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('poya-chat-history.pdf');
    } catch (err) {
      console.error(err);
      alert("خطا در ایجاد PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-dark flex items-center gap-3">
              چت‌بات <span dir="ltr" className="font-sans text-gradient">POYA</span>
            </h1>
            <p className="text-muted mt-2 text-lg">تحلیل و مشاوره هوشمند گیاهان دارویی</p>
          </div>
          {messages.length > 1 && (
            <button 
              onClick={downloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-white text-dark border border-gray-200 px-6 py-3 rounded-2xl hover:bg-gray-50 hover:border-primary/30 transition-all shadow-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <span className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin"></span>
                  <span>...</span>
                </>
              ) : (
                <FiDownload aria-hidden="true" />
              )}
              <span>دانلود PDF</span>
            </button>
          )}
        </div>
        
        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:-translate-y-1 transition-transform border-l-4 border-l-blue-400">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
              <FiCpu />
            </div>
            <div>
              <h3 className="font-bold text-dark">هوش مصنوعی</h3>
              <p className="text-xs text-muted mt-1">مدل زبانی (LLM)</p>
            </div>
          </div>
          <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:-translate-y-1 transition-transform border-l-4 border-l-emerald-500">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
              <FiBook />
            </div>
            <div>
              <h3 className="font-bold text-dark">دانش تخصصی</h3>
              <p className="text-xs text-muted mt-1">تایید شده (Verified)</p>
            </div>
          </div>
           <div className="glass p-6 rounded-3xl flex items-center gap-4 hover:-translate-y-1 transition-transform border-l-4 border-l-indigo-500">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
              <FiDatabase />
            </div>
            <div>
              <h3 className="font-bold text-dark">یادگیری ماشین</h3>
              <p className="text-xs text-muted mt-1">داده‌های اختصاصی</p>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-[700px] border border-white/50 relative shadow-2xl">
          {/* Chat Container */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-gradient-to-b from-slate-50 to-white">
            <div className="text-center text-xs font-mono text-muted/40 uppercase tracking-widest mb-4">
              Session Secure • {new Date().toLocaleDateString('fa-IR')}
            </div>
            
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] lg:max-w-[75%] p-6 rounded-3xl shadow-sm border transition-all duration-300 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-primary to-emerald-600 text-white border-transparent rounded-tr-sm shadow-glow' 
                      : message.source === 'knowledge-base'
                      ? 'bg-emerald-50/80 backdrop-blur-sm border-emerald-100 border-r-4 border-r-emerald-500 text-emerald-900 rounded-tl-sm'
                      : message.source === 'self-learned'
                      ? 'bg-indigo-50/80 backdrop-blur-sm border-indigo-100 border-r-4 border-r-indigo-500 text-indigo-900 rounded-tl-sm ring-1 ring-indigo-200/50'
                      : message.source === 'ai'
                      ? 'bg-white backdrop-blur-sm border-gray-100 border-r-4 border-r-blue-400 text-gray-800 rounded-tl-sm shadow-sm'
                      : 'bg-red-50 border-red-100 border-r-4 border-r-red-500 text-red-800 rounded-tl-sm'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className={`text-xs font-bold mb-4 pb-2 border-b flex items-center gap-2 opacity-90 ${
                        message.source === 'knowledge-base' ? 'border-emerald-200 text-emerald-700' :
                        message.source === 'self-learned' ? 'border-indigo-200 text-indigo-700' :
                        message.source === 'ai' ? 'border-gray-200 text-blue-500' :
                        'border-red-200 text-red-700'
                    }`}>
                        {message.source === 'knowledge-base' ? (
                          <> <FiBook size={14} /> <span>پایگاه دانش (تایید شده)</span> </>
                        ) : message.source === 'self-learned' ? (
                          <> <FiDatabase size={14} /> <span>داده اختصاصی</span> </>
                        ) : message.source === 'ai' ? (
                          <> <FiCpu size={14} /> <span>هوش مصنوعی (Gemini)</span> </>
                        ) : (
                          <> <FiAlertTriangle size={14} /> <span>خطا</span> </>
                        )}
                    </div>
                  )}

                  {message.role === 'assistant' ? (
                    <FormattedText 
                      text={message.content} 
                      className={
                          message.source === 'knowledge-base' ? 'text-emerald-950' : 
                          message.source === 'self-learned' ? 'text-indigo-950' :
                          'text-gray-700'
                      } 
                     />
                  ) : (
                    <div className="whitespace-pre-wrap text-lg leading-relaxed">{message.content}</div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-6 rounded-3xl rounded-tl-sm shadow-sm border border-gray-100 border-r-4 border-r-blue-400">
                  <div className="flex space-x-1.5 items-center">
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100">
            <div className="flex gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="سوال خود را بپرسید... (مثال: عوارض زنجبیل چیست؟)"
                className="flex-1 p-4 bg-transparent border-none focus:ring-0 text-dark placeholder-gray-400 text-lg"
                disabled={isLoading}
                aria-label="متن پیام"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary text-white px-8 rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-all font-bold shadow-lg shadow-primary/20 active:scale-95 my-1"
                aria-label="ارسال"
              >
                ارسال
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}