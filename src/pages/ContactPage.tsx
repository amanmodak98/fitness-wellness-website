import React, { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface ContactForm { name: string; email: string; phone: string; subject: string; message: string }
interface Location { name: string; address: string; city: string; phone: string; email: string; hours: { days: string; time: string }[] }

const locations: Location[] = [
  {
    name: 'Main Location — Downtown',
    address: '1234 Fitness Blvd',
    city: 'Downtown District, City, ST 12345',
    phone: '(555) 123-4567',
    email: 'downtown@peakperformance.fit',
    hours: [
      { days: 'Monday – Friday', time: '5:00 AM – 11:00 PM' },
      { days: 'Saturday – Sunday', time: '7:00 AM – 9:00 PM' },
      { days: 'Holidays', time: '8:00 AM – 6:00 PM' },
    ],
  },
  {
    name: 'West Side Location',
    address: '5678 Wellness Ave',
    city: 'West District, City, ST 12345',
    phone: '(555) 987-6543',
    email: 'westside@peakperformance.fit',
    hours: [
      { days: 'Monday – Friday', time: '6:00 AM – 10:00 PM' },
      { days: 'Saturday – Sunday', time: '8:00 AM – 8:00 PM' },
      { days: 'Holidays', time: '9:00 AM – 5:00 PM' },
    ],
  },
]

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); setSubmitted(true) }
  const update = (field: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <div className="bg-jet">
      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center bg-[#111111]">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full"><defs><pattern id="cgrid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="#f97316" strokeWidth="0.3"/></pattern></defs><rect width="100" height="100" fill="url(#cgrid)"/></svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-orange/20 border border-orange text-orange font-display font-bold uppercase tracking-widest text-sm px-4 py-1.5 rounded mb-4">Get In Touch</span>
            <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-offwhite">CONTACT <span className="text-orange">US</span></h1>
          </motion.div>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* CONTACT FORM */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="font-display font-extrabold text-4xl uppercase tracking-tight text-offwhite mb-2">SEND US A <span className="text-orange">MESSAGE</span></h2>
              <p className="text-muted font-body mb-8">Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>
              {submitted ? (
                <div className="bg-card border border-orange rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <h3 className="font-display font-bold text-2xl uppercase text-offwhite mb-2">MESSAGE SENT!</h3>
                  <p className="text-muted font-body">Thanks for reaching out. We'll get back to you shortly.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                    className="mt-6 text-orange hover:text-orange-dark font-display font-bold uppercase text-sm tracking-wider transition-colors">SEND ANOTHER MESSAGE</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-2">Full Name *</label>
                      <input type="text" required value={form.name} onChange={update('name')} placeholder="John Smith"
                        className="w-full bg-card border border-[#2a2a2a] focus:border-orange text-offwhite placeholder:text-muted px-4 py-3.5 rounded-lg font-body focus:outline-none transition-colors"/></div>
                    <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-2">Phone Number</label>
                      <input type="tel" value={form.phone} onChange={update('phone')} placeholder="(555) 123-4567"
                        className="w-full bg-card border border-[#2a2a2a] focus:border-orange text-offwhite placeholder:text-muted px-4 py-3.5 rounded-lg font-body focus:outline-none transition-colors"/></div>
                  </div>
                  <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-2">Email Address *</label>
                    <input type="email" required value={form.email} onChange={update('email')} placeholder="you@email.com"
                      className="w-full bg-card border border-[#2a2a2a] focus:border-orange text-offwhite placeholder:text-muted px-4 py-3.5 rounded-lg font-body focus:outline-none transition-colors"/></div>
                  <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-2">Subject *</label>
                    <select required value={form.subject} onChange={update('subject')}
                      className="w-full bg-card border border-[#2a2a2a] focus:border-orange text-offwhite px-4 py-3.5 rounded-lg font-body focus:outline-none transition-colors">
                      <option value="">Select a subject...</option>
                      <option>Membership Inquiry</option><option>Personal Training</option><option>Group Classes</option>
                      <option>Corporate Wellness</option><option>Facility Tour</option><option>General Question</option><option>Feedback</option>
                    </select></div>
                  <div><label className="text-muted font-body text-xs uppercase tracking-wider block mb-2">Message *</label>
                    <textarea required value={form.message} onChange={update('message')} rows={6} placeholder="Tell us more about how we can help..."
                      className="w-full bg-card border border-[#2a2a2a] focus:border-orange text-offwhite placeholder:text-muted px-4 py-3.5 rounded-lg font-body focus:outline-none transition-colors resize-none"/></div>
                  <button type="submit" className="w-full bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase py-4 rounded tracking-wider transition-colors duration-200">SEND MESSAGE</button>
                </form>
              )}
            </motion.div>

            {/* LOCATIONS INFO */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="space-y-6">
              {locations.map((loc, i) => (
                <div key={i} className="bg-card border border-[#2a2a2a] rounded-2xl p-8">
                  <h3 className="font-display font-bold text-2xl uppercase text-offwhite mb-1">{loc.name}</h3>
                  <div className="w-12 h-1 bg-orange rounded-full mb-6" />
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange flex-shrink-0 mt-0.5"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
                      <div><p className="text-offwhite font-body font-medium">{loc.address}</p><p className="text-muted font-body text-sm">{loc.city}</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange flex-shrink-0"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"/></svg>
                      <p className="text-offwhite font-body font-medium">{loc.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange flex-shrink-0"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>
                      <p className="text-offwhite font-body font-medium">{loc.email}</p>
                    </div>
                    <div className="pt-4 border-t border-[#2a2a2a]">
                      <p className="text-orange font-display font-bold uppercase text-sm tracking-wider mb-3">Hours</p>
                      {loc.hours.map((h, hi) => (
                        <div key={hi} className="flex justify-between items-center mb-2">
                          <span className="text-muted font-body text-sm">{h.days}</span>
                          <span className="text-offwhite font-body text-sm font-medium">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="bg-card border border-[#2a2a2a] rounded-2xl overflow-hidden h-72 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full"><defs><pattern id="mapgrid" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M 5 0 L 0 0 0 5" fill="none" stroke="#f97316" strokeWidth="0.3"/></pattern></defs><rect width="100" height="100" fill="url(#mapgrid)"/></svg>
              </div>
              <div className="relative text-center">
                <div className="w-16 h-16 bg-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="font-display font-bold text-2xl uppercase text-offwhite mb-2">FIND US</h3>
                <p className="text-muted font-body">1234 Fitness Blvd, Downtown District</p>
                <p className="text-muted font-body text-sm mt-1">Two locations to serve you</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                  className="inline-block mt-4 bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase text-sm px-6 py-2.5 rounded tracking-wider transition-colors">
                  OPEN IN MAPS
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FREE TOUR CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="bg-gradient-to-r from-orange to-orange-dark rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full"><defs><pattern id="tourgrid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs><rect width="100" height="100" fill="url(#tourgrid)"/></svg>
            </div>
            <div className="relative">
              <span className="inline-block bg-white/20 text-white font-display font-bold uppercase tracking-widest text-sm px-4 py-1.5 rounded mb-6">Free Offer</span>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-white mb-4">BOOK A FREE <span className="underline decoration-white/60">GYM TOUR</span></h2>
              <p className="text-white/80 font-body text-xl max-w-xl mx-auto mb-8">See the facility firsthand. Meet the team. Ask all your questions. No obligation, just an opportunity to explore.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/pricing" className="bg-white text-orange hover:bg-offwhite font-display font-bold uppercase px-10 py-4 rounded tracking-wider transition-colors duration-200 text-lg">
                  START FREE TRIAL INSTEAD
                </Link>
                <a href="tel:5551234567" className="border-2 border-white text-white hover:bg-white hover:text-orange font-display font-bold uppercase px-10 py-4 rounded tracking-wider transition-colors duration-200 text-lg">
                  CALL (555) 123-4567
                </a>
              </div>
              <p className="text-white/60 font-body text-sm mt-6">Tours available Mon–Sat, 9AM–7PM. No appointment needed for walk-ins.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
