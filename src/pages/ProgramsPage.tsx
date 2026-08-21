import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface ClassSlot { time: string; name: string; trainer: string; color: string }
interface DaySchedule { day: string; classes: ClassSlot[] }
interface ProgramDetail { id: string; name: string; image: string; description: string; forWho: string; achieve: string[]; days: string; trainer: string; duration: string; difficulty: number; tag: string; tagColor: string }
interface ModalForm { name: string; email: string; time: string }

const schedule: DaySchedule[] = [
  { day: 'MON', classes: [{ time: '6:00 AM', name: 'Morning HIIT', trainer: 'Sarah Chen', color: 'bg-orange' }, { time: '9:00 AM', name: 'Yoga Flow', trainer: 'Emma Williams', color: 'bg-blue-500' }, { time: '12:00 PM', name: 'Strength Fundamentals', trainer: 'Marcus Johnson', color: 'bg-lime' }, { time: '6:00 PM', name: 'CrossFit WOD', trainer: 'Alex Rodriguez', color: 'bg-orange' }, { time: '7:30 PM', name: 'Boxing Basics', trainer: 'James Thompson', color: 'bg-red-500' }] },
  { day: 'TUE', classes: [{ time: '6:00 AM', name: 'Strength & Conditioning', trainer: 'Marcus Johnson', color: 'bg-lime' }, { time: '9:00 AM', name: 'Restorative Yoga', trainer: 'Emma Williams', color: 'bg-blue-500' }, { time: '12:00 PM', name: 'HIIT Blast', trainer: 'Sarah Chen', color: 'bg-orange' }, { time: '6:00 PM', name: 'Advanced Boxing', trainer: 'James Thompson', color: 'bg-red-500' }, { time: '7:30 PM', name: 'Nutrition Workshop', trainer: 'Lisa Park', color: 'bg-lime' }] },
  { day: 'WED', classes: [{ time: '6:00 AM', name: 'Morning HIIT', trainer: 'Sarah Chen', color: 'bg-orange' }, { time: '9:00 AM', name: 'Power Yoga', trainer: 'Emma Williams', color: 'bg-blue-500' }, { time: '12:00 PM', name: 'Olympic Lifting', trainer: 'Marcus Johnson', color: 'bg-lime' }, { time: '6:00 PM', name: 'CrossFit Competition', trainer: 'Alex Rodriguez', color: 'bg-orange' }, { time: '7:30 PM', name: 'Functional Training', trainer: 'Tyler Brooks', color: 'bg-lime' }] },
  { day: 'THU', classes: [{ time: '6:00 AM', name: 'HIIT Endurance', trainer: 'Sarah Chen', color: 'bg-orange' }, { time: '9:00 AM', name: 'Yoga for Athletes', trainer: 'Emma Williams', color: 'bg-blue-500' }, { time: '12:00 PM', name: 'Strength Building', trainer: 'Marcus Johnson', color: 'bg-lime' }, { time: '6:00 PM', name: 'Boxing Advanced', trainer: 'James Thompson', color: 'bg-red-500' }, { time: '7:30 PM', name: 'Mobility & Recovery', trainer: 'Priya Patel', color: 'bg-blue-400' }] },
  { day: 'FRI', classes: [{ time: '6:00 AM', name: 'HIIT Finisher', trainer: 'Sarah Chen', color: 'bg-orange' }, { time: '9:00 AM', name: 'Vinyasa Flow', trainer: 'Emma Williams', color: 'bg-blue-500' }, { time: '12:00 PM', name: 'CrossFit Open', trainer: 'Alex Rodriguez', color: 'bg-orange' }, { time: '6:00 PM', name: 'Strength Power', trainer: 'Marcus Johnson', color: 'bg-lime' }, { time: '7:30 PM', name: 'Boxing Cardio', trainer: 'James Thompson', color: 'bg-red-500' }] },
  { day: 'SAT', classes: [{ time: '8:00 AM', name: 'Community CrossFit', trainer: 'Alex Rodriguez', color: 'bg-orange' }, { time: '9:30 AM', name: 'Weekend HIIT', trainer: 'Sarah Chen', color: 'bg-orange' }, { time: '11:00 AM', name: 'Slow Flow Yoga', trainer: 'Emma Williams', color: 'bg-blue-500' }, { time: '2:00 PM', name: 'Open Boxing', trainer: 'James Thompson', color: 'bg-red-500' }, { time: '4:00 PM', name: 'Nutrition Seminar', trainer: 'Lisa Park', color: 'bg-lime' }] },
]

const programDetails: ProgramDetail[] = [
  { id: 'hiit', name: 'HIIT Training', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', description: 'High-Intensity Interval Training alternates explosive bursts of effort with brief recovery periods, maximizing calorie burn and cardiovascular fitness.', forWho: 'Anyone looking to burn fat, boost metabolism, and improve endurance. All fitness levels welcome.', achieve: ['Burn up to 600 calories per session', 'Boost metabolism for 24+ hours', 'Improve cardiovascular endurance', 'Build lean muscle tone'], days: 'Tue / Thu / Sat', trainer: 'Sarah Chen', duration: '45 min', difficulty: 4, tag: 'CARDIO', tagColor: 'bg-orange' },
  { id: 'strength', name: 'Strength & Conditioning', image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80', description: 'A systematic approach to building raw strength, power, and muscle. Combines barbell movements, accessory work, and conditioning circuits.', forWho: 'Beginners to advanced lifters who want to get stronger, build muscle, and improve athletic performance.', achieve: ['Build functional strength', 'Increase muscle mass', 'Improve athletic performance', 'Master compound movements'], days: 'Mon / Wed / Fri', trainer: 'Marcus Johnson', duration: '60 min', difficulty: 3, tag: 'STRENGTH', tagColor: 'bg-lime' },
  { id: 'yoga', name: 'Yoga & Flexibility', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', description: 'A comprehensive yoga practice that improves flexibility, balance, mindfulness, and recovery. Suitable for all levels.', forWho: 'Anyone seeking improved flexibility, stress reduction, and mind-body connection. Perfect complement to any training program.', achieve: ['Increase range of motion', 'Reduce injury risk', 'Improve posture', 'Build mental resilience'], days: 'Daily', trainer: 'Emma Williams', duration: '60 min', difficulty: 2, tag: 'WELLNESS', tagColor: 'bg-blue-500' },
  { id: 'boxing', name: 'Boxing', image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80', description: 'Learn authentic boxing technique while getting one of the most intense full-body workouts possible. Combines technique drills, pad work, and conditioning.', forWho: 'Anyone who wants to learn self-defense, improve coordination, and get seriously fit. No experience necessary.', achieve: ['Learn real boxing technique', 'Full-body strength and conditioning', 'Improved coordination and reflexes', 'Stress relief through heavy bag work'], days: 'Mon / Wed / Fri', trainer: 'James Thompson', duration: '50 min', difficulty: 4, tag: 'COMBAT', tagColor: 'bg-red-500' },
  { id: 'crossfit', name: 'CrossFit', image: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?w=800&q=80', description: 'Constantly varied functional movements performed at high intensity. Builds strength, speed, endurance, agility, and mental toughness.', forWho: 'Those seeking the ultimate fitness challenge. All movements are scalable to any fitness level.', achieve: ['Elite cardiovascular fitness', 'Full-body functional strength', 'Competitive community support', 'Rapid body composition change'], days: 'Daily', trainer: 'Alex Rodriguez', duration: '60 min', difficulty: 5, tag: 'CROSSFIT', tagColor: 'bg-orange' },
  { id: 'nutrition', name: 'Nutrition Coaching', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', description: 'One-on-one and group nutrition coaching that creates sustainable eating habits to power your training and support your goals.', forWho: 'Members who want to optimize their diet to support training, lose fat, or build muscle. Beginner-friendly approach.', achieve: ['Custom meal plans', 'Macro tracking guidance', 'Supplement recommendations', 'Long-term habit formation'], days: 'Flexible', trainer: 'Lisa Park', duration: '45 min', difficulty: 2, tag: 'NUTRITION', tagColor: 'bg-lime' },
]
function Stars({ count }: { count: number }) {
  return <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <svg key={i} viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i<=count?'text-orange':'text-[#2a2a2a]'}`}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}</div>
}

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null)
  const [modalForm, setModalForm] = useState<ModalForm>({ name: '', email: '', time: '' })
  const [modalSubmitted, setModalSubmitted] = useState(false)

  const handleModalSubmit = (e: React.FormEvent) => { e.preventDefault(); setModalSubmitted(true) }
  const closeModal = () => { setSelectedProgram(null); setModalSubmitted(false); setModalForm({ name: '', email: '', time: '' }) }

  return (
    <div className="bg-jet">
      {/* HERO */}
      <section className="relative h-72 md:h-96 flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80" alt="Programs" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-orange/20 border border-orange text-orange font-display font-bold uppercase tracking-widest text-sm px-4 py-1.5 rounded mb-4">Training Programs</span>
            <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-offwhite">OUR <span className="text-orange">PROGRAMS</span></h1>
          </motion.div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tight text-offwhite mb-2">WEEKLY <span className="text-orange">SCHEDULE</span></h2>
            <p className="text-muted font-body">Find your class. Show up. Transform.</p>
          </motion.div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-3 min-w-[900px]">
              {schedule.map((day, di) => (
                <motion.div key={day.day} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: di * 0.07 }} viewport={{ once: true }}>
                  <div className="bg-orange text-white font-display font-bold text-center py-3 rounded-t-xl text-lg tracking-wider">{day.day}</div>
                  <div className="space-y-2 mt-2">
                    {day.classes.map((cls) => (
                      <div key={cls.time+cls.name} className="bg-card border border-[#2a2a2a] rounded-lg p-3 hover:border-orange transition-colors duration-200 cursor-pointer">
                        <p className="text-orange font-display font-bold text-xs">{cls.time}</p>
                        <p className="text-offwhite font-body text-xs font-medium leading-tight mt-0.5">{cls.name}</p>
                        <p className="text-muted font-body text-xs mt-0.5">{cls.trainer}</p>
                        <span className={`inline-block mt-1.5 ${cls.color} h-1 w-8 rounded-full`} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM CARDS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="mb-12">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tight text-offwhite mb-2">PROGRAM <span className="text-orange">DETAILS</span></h2>
            <p className="text-muted font-body">Discover the program that's right for you</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programDetails.map((prog, i) => (
              <motion.div key={prog.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-card border border-[#2a2a2a] hover:border-orange rounded-2xl overflow-hidden transition-colors duration-300 group flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={prog.image} alt={prog.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className={`absolute top-3 right-3 ${prog.tagColor} text-white font-display font-bold text-xs uppercase px-2.5 py-1 rounded tracking-wider`}>{prog.tag}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-2xl uppercase text-offwhite mb-2">{prog.name}</h3>
                  <p className="text-muted font-body text-sm leading-relaxed mb-4 flex-1">{prog.description}</p>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-muted font-body flex items-center gap-1.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                      {prog.days}
                    </span>
                    <span className="text-muted font-body flex items-center gap-1.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>
                      {prog.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <Stars count={prog.difficulty} />
                    <span className="text-muted font-body text-xs">with {prog.trainer}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-offwhite font-body text-xs font-medium uppercase tracking-wider mb-2">You'll achieve:</p>
                    <ul className="space-y-1">
                      {prog.achieve.slice(0,2).map(a => <li key={a} className="text-muted font-body text-xs flex items-start gap-1.5"><span className="text-orange mt-0.5">✓</span>{a}</li>)}
                    </ul>
                  </div>
                  <button onClick={() => setSelectedProgram(prog)}
                    className="block text-center bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase py-3 rounded tracking-wider transition-colors duration-200 text-sm">
                    JOIN THIS PROGRAM
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-extrabold text-2xl uppercase text-offwhite">JOIN {selectedProgram.name.toUpperCase()}</h3>
                <button onClick={closeModal} className="text-muted hover:text-offwhite transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              {modalSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h4 className="font-display font-bold text-xl uppercase text-offwhite mb-2">YOU'RE REGISTERED!</h4>
                  <p className="text-muted font-body text-sm">We'll confirm your spot and send details to your email.</p>
                  <button onClick={closeModal} className="mt-6 bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase px-8 py-3 rounded tracking-wider transition-colors">CLOSE</button>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-1.5">Full Name</label>
                    <input type="text" required value={modalForm.name} onChange={e => setModalForm(p => ({...p,name:e.target.value}))} placeholder="John Smith"
                      className="w-full bg-[#111111] border border-[#2a2a2a] focus:border-orange text-offwhite placeholder:text-muted px-4 py-3 rounded-lg font-body focus:outline-none transition-colors"/></div>
                  <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-1.5">Email Address</label>
                    <input type="email" required value={modalForm.email} onChange={e => setModalForm(p => ({...p,email:e.target.value}))} placeholder="you@email.com"
                      className="w-full bg-[#111111] border border-[#2a2a2a] focus:border-orange text-offwhite placeholder:text-muted px-4 py-3 rounded-lg font-body focus:outline-none transition-colors"/></div>
                  <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-1.5">Preferred Class Time</label>
                    <select value={modalForm.time} onChange={e => setModalForm(p => ({...p,time:e.target.value}))} required
                      className="w-full bg-[#111111] border border-[#2a2a2a] focus:border-orange text-offwhite px-4 py-3 rounded-lg font-body focus:outline-none transition-colors">
                      <option value="">Select a time...</option>
                      <option>6:00 AM – Early Bird</option><option>9:00 AM – Morning</option>
                      <option>12:00 PM – Midday</option><option>6:00 PM – Evening</option><option>7:30 PM – Late Evening</option>
                    </select></div>
                  <button type="submit" className="w-full bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase py-3.5 rounded tracking-wider transition-colors duration-200 mt-2">REGISTER NOW</button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
