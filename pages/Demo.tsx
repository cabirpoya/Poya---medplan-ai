import React, { useState, useRef } from 'react';
import { geminiClient } from '../lib/gemini-client';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FiDownload, FiUploadCloud, FiImage, FiActivity, FiHexagon, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export default function Demo() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await geminiClient.analyzePlant(selectedImage);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "خطا در تحلیل تصویر. لطفا دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!resultRef.current) return;
    setIsDownloading(true);

    try {
      // Clone element to ensure full capture even if inside scrollable parents
      const originalElement = resultRef.current;
      const clone = originalElement.cloneNode(true) as HTMLElement;

      clone.style.position = 'fixed';
      clone.style.top = '-9999px';
      clone.style.left = '0';
      clone.style.height = 'auto';
      clone.style.width = `${originalElement.offsetWidth}px`;
      clone.style.overflow = 'visible';
      clone.style.background = '#ffffff'; // Force white background
      clone.style.zIndex = '-1000';

      document.body.appendChild(clone);

      const canvas = await html2canvas(clone, { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight
      });

      // Cleanup
      document.body.removeChild(clone);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Subsequent pages if content overflows
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`POYA-Analysis-${Date.now()}.pdf`);
    } catch (err) {
      console.error(err);
      alert("خطا در ایجاد فایل PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-4 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-dark mb-4">آزمایشگاه <span className="text-gradient">هوش مصنوعی</span></h1>
          <p className="text-muted">تصویر گیاه را آپلود کنید تا موتور POYA آن را آنالیز کند</p>
        </div>
        
        {/* Upload Area */}
        <div className="glass-card p-8 rounded-[2rem] shadow-xl border border-white/60 mb-12">
           <div className="border-2 border-dashed border-primary/20 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all rounded-3xl p-10 text-center cursor-pointer relative group focus-within:ring-4 focus-within:ring-primary/20 focus-within:border-primary">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="آپلود تصویر گیاه"
              />
              
              {!selectedImage ? (
                <div className="space-y-4">
                   <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary text-3xl shadow-sm mx-auto group-hover:scale-110 transition-transform">
                     <FiUploadCloud aria-hidden="true" />
                   </div>
                   <div>
                     <h3 className="font-bold text-dark text-lg">تصویر را اینجا رها کنید</h3>
                     <p className="text-sm text-muted mt-1">یا برای انتخاب کلیک کنید (JPG, PNG)</p>
                   </div>
                </div>
              ) : (
                <div className="relative">
                   <img src={selectedImage} alt="پیش‌نمایش تصویر آپلود شده" className="max-h-64 mx-auto rounded-2xl shadow-md object-contain" />
                   <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-white text-dark px-4 py-2 rounded-xl font-bold text-sm">تغییر تصویر</span>
                   </div>
                </div>
              )}
           </div>
           
           {error && (
              <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3" role="alert">
                 <FiAlertTriangle aria-hidden="true" />
                 {error}
              </div>
           )}

           {selectedImage && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={analyzeImage}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-primary to-emerald-600 text-white font-bold py-4 px-12 rounded-2xl shadow-glow hover:shadow-glow-sec hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-lg focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"></span>
                      <span>در حال پردازش عصبی...</span>
                    </>
                  ) : (
                    <>
                      <FiActivity aria-hidden="true" />
                      <span>شروع آنالیز هوشمند</span>
                    </>
                  )}
                </button>
              </div>
           )}
        </div>

        {/* Results Area */}
        {result && (
          <div className="animate-fade-in relative" aria-live="polite">
             <div className="absolute -top-14 left-0">
               <button 
                 onClick={downloadPDF} 
                 disabled={isDownloading}
                 className="bg-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-700 transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-70 disabled:cursor-wait"
               >
                 {isDownloading ? (
                   <>
                     <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                     <span>در حال ایجاد...</span>
                   </>
                 ) : (
                   <>
                     <FiDownload aria-hidden="true" /> 
                     <span>دانلود گزارش PDF</span>
                   </>
                 )}
               </button>
             </div>

             <div ref={resultRef} className="glass-card p-0 rounded-[2.5rem] overflow-hidden border border-white/60 shadow-2xl bg-white/40 backdrop-blur-xl" dir="rtl">
                {/* Header */}
                <div className="bg-white/60 p-6 border-b border-gray-100 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-primary/20">
                         <FiCheckCircle size={24} aria-hidden="true" />
                      </div>
                      <div>
                         <h2 className="font-bold text-dark text-xl">گزارش آنالیز نهایی</h2>
                         <p className="text-xs text-muted font-mono mt-1" dir="ltr">ID: {Math.floor(Math.random() * 10000)} • AI GENERATED</p>
                      </div>
                   </div>
                   <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-lg text-xs font-bold border border-green-200">
                      تایید شده
                   </div>
                </div>

                <div className="p-8">
                   <div className="flex flex-col md:flex-row gap-8 mb-8">
                      {selectedImage && (
                        <div className="w-full md:w-1/3">
                           <img src={selectedImage} className="w-full h-48 object-cover rounded-2xl border border-white shadow-sm" alt="Analyzed plant" />
                        </div>
                      )}
                      <div className="flex-1 space-y-4">
                         <div>
                            <span className="text-xs text-muted font-bold block mb-1">نام گیاه (فارسی)</span>
                            <div className="text-3xl font-black text-dark">{result.persianName}</div>
                         </div>
                         <div>
                            <span className="text-xs text-muted font-bold block mb-1">نام علمی</span>
                            <div className="text-xl font-mono text-primary font-bold bg-primary/5 inline-block px-3 py-1 rounded-lg border border-primary/10">{result.scientificName}</div>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-white/60 p-5 rounded-3xl border border-white/50">
                         <h3 className="font-bold text-dark mb-4 flex items-center gap-2 text-sm border-b pb-2 border-gray-100">
                           <FiActivity className="text-primary" aria-hidden="true" /> خواص درمانی
                         </h3>
                         <div className="flex flex-wrap gap-2">
                           {result.properties?.map((p: string, i: number) => (
                             <span key={i} className="bg-white text-gray-700 px-3 py-1 rounded-lg text-sm border border-gray-100 shadow-sm">{p}</span>
                           ))}
                         </div>
                      </div>
                      <div className="bg-white/60 p-5 rounded-3xl border border-white/50">
                         <h3 className="font-bold text-dark mb-4 flex items-center gap-2 text-sm border-b pb-2 border-gray-100">
                           <FiHexagon className="text-secondary" aria-hidden="true" /> ترکیبات شیمیایی
                         </h3>
                         <div className="flex flex-wrap gap-2">
                           {result.molecularProfile?.map((p: string, i: number) => (
                             <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm border border-indigo-100">{p}</span>
                           ))}
                         </div>
                      </div>
                   </div>

                   <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100">
                      <h3 className="font-bold text-red-700 mb-4 flex items-center gap-2">
                        <FiAlertTriangle aria-hidden="true" /> داده‌های ایمنی و هشدارها
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6 text-sm">
                         <div>
                            <strong className="block text-red-800 mb-1">سمیت:</strong>
                            <p className="text-gray-700 bg-white/50 p-2 rounded-lg border border-red-100">{result.clinicalSafety?.toxicity}</p>
                         </div>
                         <div>
                            <strong className="block text-red-800 mb-1">تداخلات دارویی:</strong>
                            <ul className="list-disc list-inside text-gray-700">
                               {result.clinicalSafety?.drugInteractions?.map((d: string, i: number) => <li key={i}>{d}</li>)}
                            </ul>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="bg-gray-50 p-4 text-center text-xs text-muted border-t border-gray-100">
                   قدرت گرفته از POYA AI Engine • {new Date().toLocaleDateString('fa-IR')}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}