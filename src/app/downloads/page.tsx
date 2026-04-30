'use client';

import { Download, FileText, FileSearch } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DownloadItem {
  id: number;
  name: string;
  category: string;
  url: string;
  size: string;
  date: string;
}

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('ags_downloads');
    if (saved) {
      setDownloads(JSON.parse(saved));
    }
  }, []);

  const categories = ['All', ...Array.from(new Set(downloads.map(d => d.category)))];

  const filteredDownloads = downloads.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (item: DownloadItem) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.download = item.name + (item.url.includes('pdf') ? '.pdf' : '.doc');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tighter">Downloads</h1>
          <p className="text-lg text-white/70 max-w-xl mx-auto font-medium">Access and download important school documents, forms, and resources.</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Search & Filter */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="relative w-full md:w-96">
                  <FileSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search documents..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 font-medium text-primary transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        activeCategory === cat 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                        : 'bg-white text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDownloads.length > 0 ? (
                filteredDownloads.map((doc) => (
                  <div key={doc.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                        <FileText size={32} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                           <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">{doc.category}</span>
                           <span className="text-[10px] font-bold text-gray-400 uppercase">{doc.size}</span>
                        </div>
                        <h3 className="text-xl font-black text-primary leading-tight mb-4 group-hover:text-secondary transition-colors line-clamp-2">{doc.name}</h3>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{doc.date}</span>
                          <button 
                            onClick={() => handleDownload(doc)}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-black text-xs hover:bg-secondary hover:text-primary transition-all hover:scale-110 uppercase tracking-widest shadow-lg shadow-primary/10"
                          >
                            <Download size={14} />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <FileSearch size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight">No Documents Found</h3>
                  <p className="text-gray-400 font-medium mt-2">Try adjusting your search or category filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
