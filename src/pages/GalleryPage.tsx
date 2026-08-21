import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Category = 'All' | 'Equipment' | 'Classes' | 'Trainers' | 'Events' | 'Before & After'

interface GalleryItem { id: number; src: string; alt: string; category: Exclude<Category,'All'>; span?: boolean }

const images: GalleryItem[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80', alt: 'Main gym floor', category: 'Equipment', span: true },
  { id: 2, src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80', alt: 'Olympic barbells rack', category: 'Equipment' },
  { id: 3, src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80', alt: 'HIIT class in action', category: 'Classes', span: true },
  { id: 4, src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80', alt: 'Cable machines row', category: 'Equipment' },
  { id: 5, src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', alt: 'Morning yoga session', category: 'Classes' },
  { id: 6, src: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=600&q=80', alt: 'Trainer coaching athlete', category: 'Trainers', span: true },
  { id: 7, src: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80', alt: 'Boxing class', category: 'Classes' },
  { id: 8, src: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=600&q=80', alt: 'CrossFit WOD', category: 'Classes' },
  { id: 9, src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', alt: 'Personal training session', category: 'Trainers' },
  { id: 10, src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', alt: 'Nutrition workshop', category: 'Events', span: true },
  { id: 11, src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', alt: 'Strength training area', category: 'Equipment' },
  { id: 12, src: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', alt: 'Coach demonstration', category: 'Trainers' },
  { id: 13, src: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80', alt: 'Community event', category: 'Events' },
  { id: 14, src: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80', alt: 'Member transformation', category: 'Before & After', span: true },
  { id: 15, src: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&q=80', alt: 'Fitness transformation result', category: 'Before & After' },
  { id: 16, src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80', alt: 'Cardio equipment area', category: 'Equipment' },
]

const categories: Category[] = ['All', 'Equipment', 'Classes', 'Trainers', 'Events', 'Before & After']

export default function GalleryPage() {
  const [active, setActive] = useState<Category>('All')
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  const filtered = active === 'All' ? images : images.filter(img => img.category === active)

  return (
    <div className="bg-jet">
      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center bg-[#111111]">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full"><defs><pattern id="ggrid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="#f97316" strokeWidth="0.3"/></pattern></defs><rect width="100" height="100" fill="url(#ggrid)"/></svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-orange/20 border border-orange text-orange font-display font-bold uppercase tracking-widest text-sm px-4 py-1.5 rounded mb-4">Our Facility & Community</span>
            <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-offwhite">PHOTO <span className="text-orange">GALLERY</span></h1>
          </motion.div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#111111] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActive(cat)}
                className={`font-display font-bold uppercase tracking-wider text-sm px-5 py-2.5 rounded-full border-2 transition-all duration-200 ${active === cat ? 'bg-orange border-orange text-white' : 'border-[#2a2a2a] text-muted hover:border-orange hover:text-orange'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((img, i) => (
                <motion.div key={img.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className={`relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid mb-4 ${img.span ? 'row-span-2' : ''}`}
                  onClick={() => setLightbox(img)}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block bg-orange text-white font-display font-bold text-xs uppercase px-2.5 py-1 rounded tracking-wider mb-1">{img.category}</span>
                      <p className="text-offwhite font-body text-sm">{img.alt}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)} className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              onClick={e => e.stopPropagation()} className="relative max-w-4xl max-h-[90vh] w-full">
              <img src={lightbox.src.replace('w=600', 'w=1200')} alt={lightbox.alt} className="w-full h-full object-contain rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl p-6">
                <span className="inline-block bg-orange text-white font-display font-bold text-xs uppercase px-2.5 py-1 rounded tracking-wider mb-1">{lightbox.category}</span>
                <p className="text-offwhite font-body">{lightbox.alt}</p>
              </div>
              <button onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-offwhite hover:text-orange transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div className="absolute inset-y-0 left-3 flex items-center">
                <button onClick={() => { const idx = images.findIndex(img => img.id === lightbox.id); const prev = images[(idx - 1 + images.length) % images.length]; setLightbox(prev) }}
                  className="w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-offwhite hover:text-orange transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                </button>
              </div>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button onClick={() => { const idx = images.findIndex(img => img.id === lightbox.id); const next = images[(idx + 1) % images.length]; setLightbox(next) }}
                  className="w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-offwhite hover:text-orange transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
