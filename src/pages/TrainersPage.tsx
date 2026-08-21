import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Trainer { id: string; name: string; photo: string; title: string; specialty: string; certs: string[]; years: number; instagram: string; bio: string; achievements: string[]; testimonials: { client: string; quote: string }[] }

const trainers: Trainer[] = [
  { id: '1', name: 'Marcus Johnson', photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=600&q=80', title: 'Head Coach', specialty: 'Strength & Conditioning', certs: ['NSCA-CSCS', 'USAW Level 2', 'FMS Level 2'], years: 12, instagram: '@marcusjfit', bio: 'Marcus brings over a decade of elite coaching experience, having trained professional athletes, Olympic hopefuls, and everyday warriors. His systematic approach to strength development has transformed hundreds of lives.', achievements: ['Coached 3 national champions', 'NSCA Coach of the Year 2023', 'Published researcher in sports science'], testimonials: [{ client: 'Sarah K.', quote: 'Marcus helped me go from struggling with bodyweight squats to competing in powerlifting. His attention to detail is unmatched.' }] },
  { id: '2', name: 'Sarah Chen', photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', title: 'HIIT Specialist', specialty: 'High-Intensity Interval Training', certs: ['ACE-CPT', 'HIIT Pro Certified', 'TRX Level 2'], years: 8, instagram: '@sarahchenfit', bio: 'Sarah\'s high-energy HIIT classes are legendary. She combines metabolic conditioning with strategic movement patterns to maximize fat loss while preserving muscle. Her classes are challenging but scalable to any fitness level.', achievements: ['Trained 500+ members in HIIT', 'Featured in Fitness Magazine', 'Certified Nutrition Coach'], testimonials: [{ client: 'Mike R.', quote: 'Sarah\'s HIIT classes pushed me harder than I thought possible. Lost 40 lbs in 4 months.' }] },
  { id: '3', name: 'Alex Rodriguez', photo: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80', title: 'CrossFit Coach', specialty: 'CrossFit & Olympic Lifting', certs: ['CrossFit Level 3', 'USAW Level 2', 'CF-L1 Trainer'], years: 10, instagram: '@alexrodfit', bio: 'Alex is a former competitive CrossFit athlete who now dedicates his time to coaching. His expertise in Olympic lifting and gymnastics movements makes him invaluable for athletes looking to take their fitness to the next level.', achievements: ['Competed in CrossFit Regionals', '10+ years Olympic lifting', 'Coached 50+ athletes to competitions'], testimonials: [{ client: 'David L.', quote: 'Alex fixed my snatch technique in one session. His eye for detail is incredible.' }] },
  { id: '4', name: 'Emma Williams', photo: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&q=80', title: 'Yoga Instructor', specialty: 'Yoga & Mindfulness', certs: ['RYT-500', 'NASM-CPT', 'Mindfulness Coach'], years: 7, instagram: '@emmayogafit', bio: 'Emma brings a holistic approach to fitness, combining traditional yoga with modern sports science. Her classes improve flexibility, reduce injury risk, and cultivate mental resilience that translates to all areas of training.', achievements: ['500+ hour yoga certification', 'Corporate wellness consultant', 'Published yoga author'], testimonials: [{ client: 'Jennifer L.', quote: 'Emma\'s yoga classes have been crucial for my recovery. I\'m lifting heavier and feeling better.' }] },
  { id: '5', name: 'James Thompson', photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80', title: 'Boxing Coach', specialty: 'Boxing & Combat Fitness', certs: ['USA Boxing Coach', 'ACE-CPT', '15+ years competitive'], years: 15, instagram: '@jamesboxfit', bio: 'James is a former amateur boxer with 15 years of competitive experience. He teaches authentic boxing technique while delivering one of the most intense cardiovascular workouts available. Perfect for stress relief and total-body conditioning.', achievements: ['Amateur boxing champion', 'Trained 100+ amateur boxers', 'Conditioning coach for MMA fighters'], testimonials: [{ client: 'Tom B.', quote: 'James taught me real boxing. The conditioning is next level and the technique is authentic.' }] },
  { id: '6', name: 'Lisa Park', photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', title: 'Nutrition Coach', specialty: 'Nutrition & Weight Management', certs: ['Registered Dietitian', 'CSSD', 'Precision Nutrition L2'], years: 9, instagram: '@lisaparknutrition', bio: 'Lisa is a registered dietitian specializing in sports nutrition and body composition. She creates personalized meal plans that fuel performance, support recovery, and help members achieve sustainable body composition goals.', achievements: ['Worked with Olympic athletes', '1000+ meal plans created', 'Published nutrition researcher'], testimonials: [{ client: 'Rachel M.', quote: 'Lisa\'s nutrition plan was the missing piece. Finally seeing results that last.' }] },
  { id: '7', name: 'Tyler Brooks', photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=600&q=80', title: 'Functional Training', specialty: 'Functional Movement & Mobility', certs: ['FMS Level 2', 'TRX Certified', 'NASM-CES'], years: 6, instagram: '@tylerbrooksfit', bio: 'Tyler specializes in movement quality and injury prevention. His functional training approach builds strength through full ranges of motion, creating resilient, athletic bodies that move well and feel great.', achievements: ['Movement screening specialist', 'Corrective exercise expert', 'Mobility workshop leader'], testimonials: [{ client: 'Chris P.', quote: 'Tyler fixed my chronic back pain in 3 weeks. His mobility work is game-changing.' }] },
  { id: '8', name: 'Priya Patel', photo: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=600&q=80', title: 'Recovery Specialist', specialty: 'Recovery & Mobility', certs: ['NSCA-CPT', 'PES', 'Mobility Specialist'], years: 5, instagram: '@priyapatelmobility', bio: 'Priya focuses on the often-overlooked aspect of training: recovery. Her mobility and recovery sessions help members train harder, avoid injury, and maintain long-term fitness. Essential for anyone training at high intensity.', achievements: ['Recovery protocol designer', 'Worked with pro athletes', 'Injury prevention specialist'], testimonials: [{ client: 'Nina S.', quote: 'Priya\'s recovery sessions keep me training hard without breaking down. Essential work.' }] },
]

export default function TrainersPage() {
  const [selected, setSelected] = useState<Trainer | null>(null)

  return (
    <div className="bg-jet">
      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80" alt="Trainers" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-orange/20 border border-orange text-orange font-display font-bold uppercase tracking-widest text-sm px-4 py-1.5 rounded mb-4">Expert Coaches</span>
            <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-offwhite">MEET YOUR <span className="text-orange">COACHES</span></h1>
          </motion.div>
        </div>
      </section>

      {/* TRAINERS GRID */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer, i) => (
              <motion.div key={trainer.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07 }} viewport={{ once: true }}
                className="bg-card border border-[#2a2a2a] hover:border-orange rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer"
                onClick={() => setSelected(trainer)}>
                <div className="relative h-64 overflow-hidden">
                  <img src={trainer.photo} alt={trainer.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display font-bold text-xl uppercase text-offwhite leading-tight">{trainer.name}</h3>
                    <p className="text-orange font-display font-bold text-xs uppercase tracking-wider">{trainer.title}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-muted font-body text-xs mb-3">{trainer.specialty}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {trainer.certs.slice(0,2).map(c => <span key={c} className="bg-[#111111] border border-[#2a2a2a] text-offwhite text-xs px-2 py-0.5 rounded font-body">{c}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lime font-display font-bold text-sm uppercase">{trainer.years} YRS EXP</span>
                    <span className="text-muted font-body text-xs">{trainer.instagram}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINER MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)} className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl max-w-2xl w-full my-8 overflow-hidden">
              <div className="relative h-64">
                <img src={selected.photo} alt={selected.name} className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/40 to-transparent" />
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-offwhite hover:text-orange transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="font-display font-extrabold text-3xl uppercase text-offwhite">{selected.name}</h2>
                  <p className="text-orange font-display font-bold uppercase tracking-wider">{selected.title} · {selected.specialty}</p>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <p className="text-muted font-body text-sm leading-relaxed">{selected.bio}</p>
                <div><h4 className="font-display font-bold text-offwhite uppercase tracking-wider text-sm mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-2">{selected.certs.map(c => <span key={c} className="bg-[#111111] border border-[#2a2a2a] text-offwhite text-xs px-3 py-1 rounded-full font-body">{c}</span>)}</div></div>
                <div><h4 className="font-display font-bold text-offwhite uppercase tracking-wider text-sm mb-2">Achievements</h4>
                  <ul className="space-y-1">{selected.achievements.map(a => <li key={a} className="flex items-start gap-2 text-muted font-body text-sm"><span className="text-orange mt-0.5">✓</span>{a}</li>)}</ul></div>
                <div className="bg-[#111111] border border-[#2a2a2a] rounded-xl p-4">
                  <p className="text-muted font-body text-sm italic leading-relaxed mb-2">"{selected.testimonials[0].quote}"</p>
                  <p className="text-orange font-display font-bold text-xs uppercase">— {selected.testimonials[0].client}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div><p className="text-lime font-display font-bold text-lg uppercase">{selected.years} YEARS</p><p className="text-muted font-body text-xs">Experience</p></div>
                  <div className="text-right"><p className="text-muted font-body text-sm">{selected.instagram}</p><p className="text-muted font-body text-xs">Instagram</p></div>
                </div>
                <button onClick={() => setSelected(null)} className="w-full bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase py-3.5 rounded tracking-wider transition-colors duration-200">BOOK A SESSION</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}