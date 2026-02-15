import React, { useState, useEffect } from 'react';
import { KnowledgeBase, PlantInfo } from '../lib/knowledge-base';
import { geminiClient } from '../lib/gemini-client';
import { FiPlus, FiX, FiSave, FiAlertCircle, FiCheck, FiDatabase, FiUploadCloud, FiFileText, FiImage, FiLoader, FiSearch, FiBookOpen } from 'react-icons/fi';

export default function KnowledgeBasePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<PlantInfo | null>(null);
  const [plants, setPlants] = useState<PlantInfo[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{name: string, type: string, preview: string} | null>(null);
  const [extractedData, setExtractedData] = useState<PlantInfo | null>(null);

  const knowledgeBase = new KnowledgeBase();

  useEffect(() => {
    setPlants(knowledgeBase.getAllPlants());
  }, [isAddModalOpen]);

  const filteredPlants = plants.filter(plant =>
    plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.persianName.includes(searchTerm)
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setUploadedFile({ name: file.name, type: file.type, preview: base64 });
      await analyzeFile(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const analyzeFile = async (base64: string, mimeType: string) => {
    setAnalyzing(true);
    setExtractedData(null);
    try {
      const result = await geminiClient.analyzePlant(base64, mimeType);
      const plantInfo: PlantInfo = {
        scientificName: result.scientificName,
        persianName: result.persianName,
        properties: result.properties || [],
        molecularProfile: result.molecularProfile || [],
        clinicalSafety: {
          toxicity: result.clinicalSafety?.toxicity || "نامشخص",
          drugInteractions: result.clinicalSafety?.drugInteractions || [],
          warnings: result.clinicalSafety?.warnings || []
        },
        source: "خودآموز (استخراج از سند)"
      };
      setExtractedData(plantInfo);
    } catch (err) {
      alert("خطا در تحلیل فایل: " + (err as any).message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (extractedData) {
      knowledgeBase.addPlant(extractedData);
      setIsAddModalOpen(false);
      setExtractedData(null);
      setUploadedFile(null);
    }
  };

  const resetModal = () => {
    setIsAddModalOpen(false);
    setExtractedData(null);
    setUploadedFile(null);
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen py-24 px-4 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div>
             <h1 className="text-4xl font-black text-dark mb-2">پایگاه دانش <span className="text-gradient">تخصصی</span></h1>
             <p className="text-muted">مغز متفکر سیستم با قابلیت یادگیری و توسعه</p>
           </div>
           
           <div className="flex gap-4">
              <div className="glass px-4 py-2 rounded-xl flex flex-col items-center">
                 <span className="font-bold text-dark text-xl">{plants.length}</span>
                 <span className="text-[10px] text-muted">گونه ثبت شده</span>
              </div>
           </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <div className="glass-card p-6 rounded-3xl border-b-4 border-blue-500 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 text-blue-100 text-6xl opacity-20"><FiDatabase /></div>
              <h3 className="font-bold text-blue-700 text-lg mb-1">داده‌های پایه</h3>
              <p className="text-sm text-gray-500">منابع استاندارد فارماکوپه</p>
           </div>
           <div className="glass-card p-6 rounded-3xl border-b-4 border-emerald-500 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 text-emerald-100 text-6xl opacity-20"><FiCheck /></div>
              <h3 className="font-bold text-emerald-700 text-lg mb-1">تایید شده</h3>
              <p className="text-sm text-gray-500">اعتبارسنجی شده توسط مدل</p>
           </div>
           <div className="glass-card p-6 rounded-3xl border-b-4 border-purple-500 relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 text-purple-100 text-6xl opacity-20"><FiUploadCloud /></div>
              <h3 className="font-bold text-purple-700 text-lg mb-1">خودآموز</h3>
              <p className="text-sm text-gray-500">یادگیری از اسناد کاربران</p>
           </div>
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-[2.5rem] p-8 border border-white/60 shadow-xl">
           <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="relative w-full md:w-96">
                 <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="جستجو در نام علمی یا فارسی..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pr-12 pl-4 focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
                   aria-label="جستجوی گیاه"
                 />
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="w-full md:w-auto bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-2xl shadow-glow hover:shadow-glow-sec transition-all font-bold flex items-center justify-center gap-2"
                aria-label="افزودن گیاه جدید"
              >
                <FiPlus />
                <span>آموزش گیاه جدید</span>
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlants.map((plant, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedPlant(plant)}
                  onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setSelectedPlant(plant) }}
                  role="button"
                  tabIndex={0}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg relative group focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    plant.source.includes('خودآموز') 
                      ? 'bg-purple-50/50 border-purple-100 hover:border-purple-300' 
                      : 'bg-white/60 border-gray-100 hover:border-emerald-300'
                  }`}
                  aria-label={`مشاهده جزئیات ${plant.persianName}`}
                >
                   <div className="flex justify-between items-start mb-3">
                      <div className={`p-2 rounded-xl ${plant.source.includes('خودآموز') ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'}`}>
                         <FiBookOpen />
                      </div>
                      {plant.source.includes('خودآموز') && <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full">یادگیری شده</span>}
                   </div>
                   <h3 className="font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors">{plant.persianName}</h3>
                   <p className="text-sm text-muted font-mono mb-4">{plant.scientificName}</p>
                   <div className="text-xs text-gray-400 truncate border-t pt-3 border-gray-100">
                      {plant.source}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Detail Modal */}
        {selectedPlant && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
             <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-float" style={{animation: 'none'}}>
                <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
                   <div>
                      <h2 id="modal-title" className="text-2xl font-black text-dark">{selectedPlant.persianName}</h2>
                      <p className="text-primary font-mono">{selectedPlant.scientificName}</p>
                   </div>
                   <button onClick={() => setSelectedPlant(null)} className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100" aria-label="بستن"><FiX /></button>
                </div>
                <div className="p-8 max-h-[70vh] overflow-y-auto space-y-6" tabIndex={0}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <h4 className="font-bold text-dark mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> خواص درمانی</h4>
                         <div className="flex flex-wrap gap-2">
                            {selectedPlant.properties.map((p, i) => <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded-lg text-sm">{p}</span>)}
                         </div>
                      </div>
                      <div>
                         <h4 className="font-bold text-dark mb-2 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> ترکیبات شیمیایی</h4>
                         <div className="flex flex-wrap gap-2">
                            {selectedPlant.molecularProfile.map((p, i) => <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm">{p}</span>)}
                         </div>
                      </div>
                   </div>
                   <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                      <h4 className="font-bold text-red-700 mb-4 flex items-center gap-2"><FiAlertCircle /> هشدارهای ایمنی</h4>
                      <p className="text-sm text-gray-700 mb-2"><strong>سمیت:</strong> {selectedPlant.clinicalSafety.toxicity}</p>
                      <p className="text-sm text-gray-700"><strong>تداخلات:</strong> {selectedPlant.clinicalSafety.drugInteractions.join('، ')}</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="add-modal-title">
             <div className="bg-white rounded-[2rem] w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 bg-gradient-to-r from-primary to-emerald-700 text-white flex justify-between items-center">
                   <h3 id="add-modal-title" className="font-bold text-lg flex items-center gap-2"><FiUploadCloud /> آموزش هوشمند سیستم</h3>
                   <button onClick={resetModal} className="text-white/80 hover:text-white" aria-label="بستن"><FiX size={24} /></button>
                </div>
                
                <div className="p-8 flex-1 overflow-y-auto">
                   {!extractedData && !analyzing && (
                      <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center hover:bg-gray-50 transition-colors relative group">
                         <input 
                           type="file" 
                           accept="image/*,application/pdf" 
                           onChange={handleFileUpload} 
                           className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" 
                           aria-label="آپلود فایل یا تصویر"
                         />
                         <div className="text-5xl text-gray-300 group-hover:text-primary mb-4 flex justify-center"><FiFileText /></div>
                         <h4 className="font-bold text-dark">سند یا تصویر را اینجا رها کنید</h4>
                         <p className="text-xs text-muted mt-2">استخراج خودکار نام علمی، خواص و سمیت</p>
                         <button className="mt-6 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">انتخاب فایل</button>
                      </div>
                   )}

                   {analyzing && (
                      <div className="text-center py-10" role="status">
                         <div className="w-16 h-16 border-4 border-gray-100 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
                         <h4 className="font-bold text-dark">در حال مطالعه سند...</h4>
                         <p className="text-sm text-muted mt-1">هوش مصنوعی در حال استخراج داده‌هاست</p>
                      </div>
                   )}

                   {extractedData && (
                      <div className="space-y-4 animate-fade-in" role="status" aria-live="polite">
                         <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-100">
                            <FiCheck className="text-xl" />
                            <div>
                               <div className="font-bold text-sm">تحلیل موفقیت‌آمیز</div>
                               <div className="text-xs">داده‌ها استخراج شدند. لطفا بررسی کنید.</div>
                            </div>
                         </div>
                         <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                            <div className="flex justify-between border-b pb-2">
                               <span className="text-xs text-muted">نام فارسی</span>
                               <span className="font-bold text-dark text-sm">{extractedData.persianName}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                               <span className="text-xs text-muted">نام علمی</span>
                               <span className="font-bold text-primary font-mono text-sm">{extractedData.scientificName}</span>
                            </div>
                            <div>
                               <span className="text-xs text-muted block mb-1">خواص:</span>
                               <div className="flex flex-wrap gap-1">{extractedData.properties.map((p,i)=><span key={i} className="bg-white px-2 py-0.5 rounded border text-xs">{p}</span>)}</div>
                            </div>
                         </div>
                      </div>
                   )}
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                   <button onClick={resetModal} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors">انصراف</button>
                   {extractedData && (
                      <button onClick={handleSave} className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-600 transition-colors">تایید و ذخیره</button>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}