import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Program { name: string; image: string; days: string; duration: string; stars: number; tag: string; tagColor: string }
interface Trainer { name: string; photo: string; title: string; specialty: string; certs: string[]; years: number }
interface Transformation { name: string; months: number; achievement: string; before: string; after: string; quote: string }
interface Benefit { icon: React.ReactElement; title: string; desc: string }
interface PricingTier { name: string; price: number; features: string[]; popular?: boolean }

const programs: Program[] = [
  { name: 'HIIT Training', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80', days: 'Tue / Thu / Sat', duration: '45 min', stars: 4, tag: 'CARDIO', tagColor: 'bg-orange' },
  { name: 'Strength & Conditioning', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80', days: 'Mon / Wed / Fri', duration: '60 min', stars: 3, tag: 'STRENGTH', tagColor: 'bg-lime' },
  { name: 'Yoga & Flexibility', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80', days: 'Daily', duration: '60 min', stars: 2, tag: 'WELLNESS', tagColor: 'bg-blue-500' },
  { name: 'Boxing', image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80', days: 'Mon / Wed / Fri', duration: '50 min', stars: 4, tag: 'COMBAT', tagColor: 'bg-red-500' },
  { name: 'CrossFit', image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=600&q=80', days: 'Daily', duration: '60 min', stars: 5, tag: 'CROSSFIT', tagColor: 'bg-orange' },
  { name: 'Nutrition Coaching', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80', days: 'Flexible', duration: '45 min', stars: 2, tag: 'NUTRITION', tagColor: 'bg-lime' },
]
const stats = [{ value: '500+', label: 'Members' },{ value: '50+', label: 'Classes / Week' },{ value: '20+', label: 'Expert Trainers' },{ value: '5 ★', label: 'Rating' }]
const trainers: Trainer[] = [
  { name: 'Marcus Johnson', photo: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=400&q=80', title: 'Head Coach', specialty: 'Strength & Conditioning', certs: ['NSCA-CSCS', 'USAW L2'], years: 12 },
  { name: 'Sarah Chen', photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80', title: 'HIIT Specialist', specialty: 'High-Intensity Interval Training', certs: ['ACE-CPT', 'HIIT Pro'], years: 8 },
  { name: 'Alex Rodriguez', photo: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80', title: 'CrossFit Coach', specialty: 'CrossFit & Olympic Lifting', certs: ['CrossFit L3', 'USAW L2'], years: 10 },
]
const transformations: Transformation[] = [
  { name: 'John M.', months: 6, achievement: 'Lost 45 lbs', before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80', quote: "The HIIT and nutrition program completely changed my life. I never thought I'd feel this strong." },
  { name: 'Sarah K.', months: 8, achievement: 'Gained 15 lbs muscle', before: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&q=80', after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80', quote: "Marcus's strength program is incredible. I went from struggling with 20lbs to lifting 3x my body weight." },
  { name: 'Mike R.', months: 12, achievement: 'Lost 62 lbs', before: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', after: 'https://images.unsplash.com/photo-1567013127542-490d757e51cd?w=400&q=80', quote: 'Went from couch potato to competing in my first CrossFit open. Peak Performance changed everything.' },
  { name: 'Jennifer L.', months: 4, achievement: 'Lost 28 lbs', before: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80', after: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400&q=80', quote: 'The community here keeps me motivated every single day. Best decision I ever made.' },
]
const pricingTiers: PricingTier[] = [
  { name: 'Basic', price: 29, features: ['Gym Access Mon–Fri', '2 Group Classes/Week', 'Locker Room Access', 'Standard Equipment'] },
  { name: 'Pro', price: 59, popular: true, features: ['24/7 Gym Access', 'Unlimited Group Classes', '1 PT Session/Month', 'Nutrition Plan', 'App Access'] },
  { name: 'Elite', price: 99, features: ['Everything in Pro', 'Unlimited PT Sessions', 'Personalized Program', 'Priority Booking', 'Supplement Discount'] },
]
const benefits: Benefit[] = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>, title: 'State-of-the-Art Equipment', desc: '10,000+ sq ft facility with the latest Technogym, Life Fitness, and Rogue equipment.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"/></svg>, title: 'Expert Certified Trainers', desc: 'All trainers hold NASM, ACE, or NSCA certifications with avg 8+ years experience.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>, title: 'Flexible Schedules', desc: '50+ classes per week from 5AM to 11PM. Find your perfect time, every day.' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>, title: 'Nutrition Support', desc: 'Personalized meal planning and nutrition coaching included with Pro & Elite plans.' },
]
function Stars({ count }: { count: number }) {
  return <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i<=count?'text-orange':'text-[#2a2a2a]'}`}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}</div>
}
export default function HomePage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div className="bg-jet">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80" alt="Peak Performance Gym" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="flex items-center justify-between gap-12">
            <div className="flex-1 max-w-3xl">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-block bg-orange/20 border border-orange text-orange font-display font-bold uppercase tracking-widest text-sm px-4 py-1.5 rounded mb-6">
                Your Strongest Self Starts Here
              </motion.span>
              {['TRANSFORM', 'YOUR BODY.', 'TRANSFORM'].map((line, i) => (
                <motion.h1 key={line+i} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 + 0.1 * i }}
                  className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase leading-none tracking-tighter text-offwhite block">
                  {line}
                </motion.h1>
              ))}
              <motion.h1 initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
                className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase leading-none tracking-tighter block mb-8">
                YOUR <span className="text-orange">LIFE.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[#a3a3a3] font-body text-xl max-w-xl mb-10 leading-relaxed">
                Join 500+ members who have already transformed with Peak Performance. Science-backed training. Expert guidance. Real results.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }} className="flex flex-wrap gap-4">
                <Link to="/pricing" className="bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase px-8 py-4 rounded tracking-wider transition-colors duration-200 text-lg">START FREE TRIAL</Link>
                <Link to="/programs" className="border-2 border-orange text-orange hover:bg-orange hover:text-white font-display font-bold uppercase px-8 py-4 rounded tracking-wider transition-colors duration-200 text-lg">EXPLORE PROGRAMS</Link>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block w-80 bg-black/80 backdrop-blur-md border border-[#2a2a2a] rounded-2xl p-6 flex-shrink-0">
              <h3 className="font-display font-bold text-offwhite uppercase tracking-wider text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />TODAY'S CLASSES
              </h3>
              {[
                { time: '6:00 AM', name: 'Morning HIIT', trainer: 'Sarah Chen', spots: 3 },
                { time: '9:00 AM', name: 'Yoga Flow', trainer: 'Emma Williams', spots: 8 },
                { time: '12:00 PM', name: 'Strength Power', trainer: 'Marcus Johnson', spots: 5 },
                { time: '6:00 PM', name: 'CrossFit WOD', trainer: 'Alex Rodriguez', spots: 2 },
              ].map((cls) => (
                <div key={cls.time} className="flex items-center justify-between py-3 border-b border-[#2a2a2a] last:border-0">
                  <div>
                    <p className="font-display font-bold text-orange text-sm">{cls.time}</p>
                    <p className="text-offwhite font-body text-sm font-medium">{cls.name}</p>
                    <p className="text-muted font-body text-xs">{cls.trainer}</p>
                  </div>
                  <span className={`text-xs font-bold font-display uppercase px-2 py-1 rounded ${cls.spots <= 3 ? 'bg-red-500/20 text-red-400' : 'bg-lime/20 text-lime'}`}>{cls.spots} spots</span>
                </div>
              ))}
              <Link to="/programs" className="mt-4 block text-center bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase text-sm py-2.5 rounded tracking-wider transition-colors">BOOK A CLASS</Link>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-muted font-body text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-[#111111] border-y border-[#2a2a2a] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }} className="text-center">
                <p className="font-display font-extrabold text-5xl text-orange">{stat.value}</p>
                <p className="text-muted font-body text-sm uppercase tracking-wider mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display font-extrabold text-5xl md:text-6xl uppercase tracking-tight mb-4">OUR <span className="text-orange">PROGRAMS</span></h2>
            <p className="text-muted font-body text-lg max-w-xl mx-auto">World-class training programs for every fitness level</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, i) => (
              <motion.div key={prog.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                whileHover={{ scale: 1.02 }} className="bg-card border border-[#2a2a2a] hover:border-orange rounded-2xl overflow-hidden transition-colors duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={prog.image} alt={prog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 right-3 ${prog.tagColor} text-white font-display font-bold text-xs uppercase px-2.5 py-1 rounded tracking-wider`}>{prog.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-xl uppercase text-offwhite mb-3">{prog.name}</h3>
                  <div className="flex items-center gap-4 text-muted font-body text-sm mb-3">
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                      {prog.days}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
                      {prog.duration}
                    </span>
                  </div>
                  <Stars count={prog.stars} />
                  <Link to="/programs" className="mt-4 block text-center bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase py-2.5 rounded tracking-wider transition-colors duration-200 text-sm">JOIN PROGRAM</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSFORMATIONS */}
      <section className="bg-[#111111] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display font-extrabold text-5xl md:text-6xl uppercase tracking-tight mb-4">REAL <span className="text-orange">TRANSFORMATIONS</span></h2>
            <p className="text-muted font-body text-lg max-w-xl mx-auto">Results speak louder than words. See what our members have achieved.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {transformations.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-card border border-[#2a2a2a] rounded-2xl overflow-hidden p-6 hover:border-orange transition-colors duration-300">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="relative h-44 rounded-xl overflow-hidden">
                    <img src={t.before} alt={`${t.name} before`} className="w-full h-full object-cover grayscale" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-center py-1.5">
                      <span className="text-muted font-display font-bold text-xs uppercase tracking-wider">BEFORE</span>
                    </div>
                  </div>
                  <div className="relative h-44 rounded-xl overflow-hidden">
                    <img src={t.after} alt={`${t.name} after`} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-orange text-center py-1.5">
                      <span className="text-white font-display font-bold text-xs uppercase tracking-wider">AFTER</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-bold text-xl uppercase text-offwhite">{t.name}</h4>
                  <div className="text-right">
                    <p className="text-orange font-display font-bold text-sm uppercase">{t.achievement}</p>
                    <p className="text-muted font-body text-xs">{t.months} months</p>
                  </div>
                </div>
                <p className="text-muted font-body text-sm italic leading-relaxed">"{t.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PEAK */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display font-extrabold text-5xl md:text-6xl uppercase tracking-tight mb-4">WHY <span className="text-orange">PEAK PERFORMANCE</span></h2>
            <p className="text-muted font-body text-lg max-w-xl mx-auto">We're not just a gym. We're your transformation partner.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-card border border-[#2a2a2a] hover:border-orange rounded-2xl p-8 transition-colors duration-300">
                <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mb-5">{b.icon}</div>
                <h3 className="font-display font-bold text-xl uppercase text-offwhite mb-3">{b.title}</h3>
                <p className="text-muted font-body text-sm leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRAINERS */}
      <section className="bg-[#111111] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display font-extrabold text-5xl md:text-6xl uppercase tracking-tight mb-4">MEET THE <span className="text-orange">COACHES</span></h2>
            <p className="text-muted font-body text-lg max-w-xl mx-auto">World-class trainers dedicated to your success</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {trainers.map((trainer, i) => (
              <motion.div key={trainer.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="bg-card border border-[#2a2a2a] hover:border-orange rounded-2xl overflow-hidden transition-all duration-300 group">
                <div className="relative h-72 overflow-hidden">
                  <img src={trainer.photo} alt={trainer.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-2xl uppercase text-offwhite">{trainer.name}</h3>
                  <p className="text-orange font-display font-bold text-sm uppercase tracking-wider mt-1">{trainer.title}</p>
                  <p className="text-muted font-body text-sm mt-1 mb-4">{trainer.specialty}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trainer.certs.map(c => <span key={c} className="bg-[#111111] border border-[#2a2a2a] text-offwhite text-xs px-2.5 py-1 rounded font-body">{c}</span>)}
                  </div>
                  <span className="text-lime font-display font-bold text-sm uppercase tracking-wider">{trainer.years} YEARS EXP</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center">
            <Link to="/trainers" className="inline-flex items-center gap-2 border-2 border-orange text-orange hover:bg-orange hover:text-white font-display font-bold uppercase px-8 py-3 rounded tracking-wider transition-colors duration-200">
              VIEW ALL TRAINERS <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display font-extrabold text-5xl md:text-6xl uppercase tracking-tight mb-4">SIMPLE <span className="text-orange">PRICING</span></h2>
            <p className="text-muted font-body text-lg max-w-xl mx-auto">No hidden fees. No long-term contracts. Just results.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className={`relative bg-card rounded-2xl p-8 border-2 transition-all duration-300 ${tier.popular ? 'border-orange scale-105' : 'border-[#2a2a2a] hover:border-orange'}`}>
                {tier.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-white font-display font-bold text-xs uppercase px-4 py-1.5 rounded-full tracking-wider">MOST POPULAR</span>}
                <p className="font-display font-extrabold text-2xl uppercase text-offwhite mb-2">{tier.name}</p>
                <div className="flex items-end gap-1 mb-6"><span className="font-display font-extrabold text-6xl text-orange">${tier.price}</span><span className="text-muted font-body text-lg mb-2">/mo</span></div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => <li key={f} className="flex items-start gap-2.5 text-muted font-body text-sm">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange flex-shrink-0 mt-0.5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>{f}
                  </li>)}
                </ul>
                <Link to="/pricing" className={`block text-center font-display font-bold uppercase py-3 rounded tracking-wider transition-colors duration-200 ${tier.popular ? 'bg-orange hover:bg-orange-dark text-white' : 'border-2 border-orange text-orange hover:bg-orange hover:text-white'}`}>GET STARTED</Link>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center">
            <Link to="/pricing" className="inline-flex items-center gap-2 text-orange hover:text-orange-dark font-display font-bold uppercase tracking-wider transition-colors">
              VIEW ALL PLANS <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FREE TRIAL CTA */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange to-orange-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100" height="100" fill="url(#grid)"/></svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white mb-4">
              START YOUR 7-DAY FREE TRIAL
            </h2>
            <p className="text-white/80 font-body text-xl mb-10">No credit card required. No commitment. Just results.</p>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/20 backdrop-blur rounded-2xl p-10">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-orange"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h3 className="font-display font-extrabold text-3xl uppercase text-white mb-2">YOU'RE IN!</h3>
                <p className="text-white/80 font-body text-lg">Welcome to Peak Performance! We'll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required
                  className="flex-1 bg-white/15 backdrop-blur border border-white/30 text-white placeholder:text-white/60 px-5 py-4 rounded-lg font-body focus:outline-none focus:border-white transition-colors" />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} required
                  className="flex-1 bg-white/15 backdrop-blur border border-white/30 text-white placeholder:text-white/60 px-5 py-4 rounded-lg font-body focus:outline-none focus:border-white transition-colors" />
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  className="flex-1 bg-white/15 backdrop-blur border border-white/30 text-white placeholder:text-white/60 px-5 py-4 rounded-lg font-body focus:outline-none focus:border-white transition-colors" />
                <button type="submit" className="bg-white text-orange font-display font-bold uppercase px-10 py-4 rounded tracking-wider hover:bg-offwhite transition-colors duration-200 whitespace-nowrap">
                  GET STARTED
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
