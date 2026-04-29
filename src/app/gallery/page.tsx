'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const staticImages = [
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.00%20AM.jpeg", category: "Campus", title: "School Building" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.01%20AM.jpeg", category: "Classroom", title: "Learning Environment" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.02%20AM%20(1).jpeg", category: "Events", title: "Student Activities" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.14%20AM.jpeg", category: "Campus", title: "School Entrance" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.15%20AM.jpeg", category: "Classroom", title: "Interactive Session" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.16%20AM.jpeg", category: "Events", title: "Prize Distribution" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.17%20AM.jpeg", category: "Campus", title: "Main Campus" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-28%20at%207.25.50%20PM.jpeg", category: "Classroom", title: "Primary Class" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-28%20at%207.25.58%20PM.jpeg", category: "Events", title: "School Assembly" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.15%20AM%20(1).jpeg", category: "Classroom", title: "Computer Lab" },
  { src: "/images/AnyDesk/WhatsApp%20Image%202026-04-27%20at%202.13.16%20AM%20(1).jpeg", category: "Campus", title: "Playground" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [gallery, setGallery] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ags_gallery');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setGallery(parsed.map((item: any) => ({
          src: item.url,
          category: item.category,
          title: item.title
        })));
        return;
      }
    }
    setGallery(staticImages);
  }, []);

  const categories = ["All", ...Array.from(new Set(gallery.map(i => i.category)))];
  const filtered = filter === "All" ? gallery : gallery.filter(i => i.category === filter);

  return (
    <div className="min-h-screen bg-white">
      {/* Gallery Header */}
      <section className="relative h-[25vh] min-h-[200px] flex items-center justify-center bg-white border-b border-gray-100 overflow-hidden pt-8">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-primary mb-2 tracking-tighter uppercase">Gallery</h1>
          <p className="text-sm md:text-base text-gray-400 font-bold uppercase tracking-widest">Visual Journey of AGS</p>
        </div>
      </section>

      <section className="pt-8 pb-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all ${filter === cat ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((img, i) => (
              <div key={i} onClick={() => setLightbox(i)} className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden shadow-xl cursor-pointer group border-4 border-white">
                <img src={img.src} alt={img.category} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <span className="text-secondary text-[10px] font-black uppercase tracking-widest mb-1">{img.category}</span>
                  <span className="text-white font-black uppercase tracking-tight text-sm">{img.title || 'View Image'}</span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
               <p className="text-gray-400 font-black uppercase tracking-widest">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[90] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-8 right-8 text-white hover:text-secondary z-10 transition-colors">
            <X size={40} />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt="Gallery image" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}
