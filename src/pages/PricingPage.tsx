import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface PricingTier { name: string; monthlyPrice: number; features: string[]; notIncluded: string[]; popular?: boolean }
interface FaqItem { question: string; answer: string }

const tiers: PricingTier[] = [
  { name: 'Basic', monthlyPrice: 29, features: ['Gym Access Mon–Fri (6AM–10PM)', '2 Group Classes/Week', 'Locker Room & Shower Access', 'Standard Equipment Use', 'Member App Access'], notIncluded: ['24/7 Access', 'Personal Training', 'Nutrition Coaching', 'Guest Passes', 'Priority Booking'] },
  { name: 'Pro', monthlyPrice: 59, popular: true, features: ['24/7 Gym Access, 365 Days/Year', 'Unlimited Group Classes', '1 Personal Training Session/Month', 'Personalized Nutrition Plan', 'Member App + Class Booking', 'Locker Room & Premium Amenities', '2 Guest Passes/Month'], notIncluded: ['Unlimited Personal Training', 'Supplement Discount', 'Personalized Program'] },
  { name: 'Elite', monthlyPrice: 99, features: ['Everything in Pro', 'Unlimited Personal Training Sessions', 'Custom Training Program (updated monthly)', 'Advanced Nutrition & Meal Planning', 'Priority Class & Trainer Booking', '15% Supplement Discount', 'Recovery Suite Access', 'Unlimited Guest Passes'] , notIncluded: [] },
]

const faqs: FaqItem[] = [
  { question: 'Can I cancel my membership anytime?', answer: 'Yes! All Peak Performance memberships are month-to-month with no long-term contracts. You can cancel anytime with 30 days notice. We believe you should stay because you love the results, not because you\'re locked in.' },
  { question: 'What\'s included in the 7-day free trial?', answer: 'Your free trial includes full access to all group classes, gym equipment, locker rooms, and a complimentary fitness assessment with one of our coaches. No credit card required to start.' },
  { question: 'Are there any joining or enrollment fees?', answer: 'No joining fees, no enrollment fees, no hidden costs. The price you see is the price you pay. We believe in transparency — just a clean monthly membership at the price listed.' },
  { question: 'Can I freeze my membership?', answer: 'Yes, members can freeze their membership for up to 3 months per year for medical reasons or extended travel. Freezes are free for medical situations and $10/month for other reasons.' },
  { question: 'Do you offer student or military discounts?', answer: 'We offer 15% off for verified students, military personnel, first responders, and healthcare workers. Bring valid ID to the front desk or email us at info@peakperformance.fit to apply your discount.' },
  { question: 'What happens after my free trial ends?', answer: 'After your trial, you can choose the membership tier that best fits your goals. There\'s no automatic billing — we\'ll follow up with you personally to discuss your options and help you pick the right plan.' },
  { question: 'Can I upgrade or downgrade my plan at any time?', answer: 'Absolutely. You can upgrade immediately and the price difference is prorated. Downgrades take effect at the start of your next billing cycle. Talk to any staff member or use the app to manage your membership.' },
  { question: 'Do you offer personal training as an add-on to Basic plans?', answer: 'Yes! Personal training sessions can be purchased as 5-packs ($250) or 10-packs ($450) and added to any membership tier. Our Elite plan includes unlimited personal training as the best value option.' },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const getPrice = (monthly: number) => annual ? Math.round(monthly * 0.8) : monthly

  return (
    <div className="bg-jet">
      {/* HERO */}
      <section className="relative h-64 md:h-80 flex items-center bg-[#111111]">
        <div className="absolute inset-0 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full"><defs><pattern id="pgrid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="#f97316" strokeWidth="0.3"/></pattern></defs><rect width="100" height="100" fill="url(#pgrid)"/></svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block bg-orange/20 border border-orange text-orange font-display font-bold uppercase tracking-widest text-sm px-4 py-1.5 rounded mb-4">Membership Plans</span>
            <h1 className="font-display font-extrabold text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-offwhite">SIMPLE <span className="text-orange">PRICING</span></h1>
          </motion.div>
        </div>
      </section>

      {/* BILLING TOGGLE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 mb-16">
            <span className={`font-display font-bold uppercase tracking-wider text-sm ${!annual ? 'text-offwhite' : 'text-muted'}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className="relative w-16 h-8 rounded-full bg-[#2a2a2a] transition-colors duration-300 focus:outline-none" role="switch" aria-checked={annual}>
              <motion.span animate={{ x: annual ? 32 : 4 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="absolute top-1 w-6 h-6 bg-orange rounded-full shadow-md" />
            </button>
            <span className={`font-display font-bold uppercase tracking-wider text-sm ${annual ? 'text-offwhite' : 'text-muted'}`}>Annual</span>
            {annual && <span className="bg-lime/20 text-lime font-display font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider">SAVE 20%</span>}
          </motion.div>

          {/* PRICING CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {tiers.map((tier, i) => (
              <motion.div key={tier.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className={`relative bg-card rounded-2xl p-8 border-2 flex flex-col transition-all duration-300 ${tier.popular ? 'border-orange shadow-xl shadow-orange/10 scale-105' : 'border-[#2a2a2a] hover:border-orange'}`}>
                {tier.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-white font-display font-bold text-xs uppercase px-5 py-1.5 rounded-full tracking-wider">MOST POPULAR</span>}
                <div className="mb-6">
                  <p className="font-display font-extrabold text-2xl uppercase text-offwhite mb-1">{tier.name}</p>
                  <div className="flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span key={annual ? 'annual' : 'monthly'} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}
                        className="font-display font-extrabold text-6xl text-orange">${getPrice(tier.monthlyPrice)}</motion.span>
                    </AnimatePresence>
                    <span className="text-muted font-body text-lg mb-2">/mo{annual && ' billed annually'}</span>
                  </div>
                  {annual && <p className="text-lime font-body text-sm mt-1">You save ${(tier.monthlyPrice - getPrice(tier.monthlyPrice)) * 12}/year</p>}
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange flex-shrink-0 mt-0.5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      <span className="text-muted font-body text-sm">{f}</span>
                    </li>
                  ))}
                  {tier.notIncluded.map(f => (
                    <li key={f} className="flex items-start gap-2.5 opacity-40">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-muted flex-shrink-0 mt-0.5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
                      <span className="text-muted font-body text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`block text-center font-display font-bold uppercase py-3.5 rounded tracking-wider transition-colors duration-200 ${tier.popular ? 'bg-orange hover:bg-orange-dark text-white' : 'border-2 border-orange text-orange hover:bg-orange hover:text-white'}`}>
                  GET STARTED
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto mb-20">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tight text-offwhite mb-3">FREQUENTLY ASKED <span className="text-orange">QUESTIONS</span></h2>
              <p className="text-muted font-body">Everything you need to know about membership</p>
            </motion.div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} viewport={{ once: true }}
                  className="bg-card border border-[#2a2a2a] hover:border-orange rounded-xl overflow-hidden transition-colors duration-300">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                    <span className="font-display font-bold text-offwhite uppercase tracking-wide text-sm pr-4">{faq.question}</span>
                    <motion.svg animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-orange flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </motion.svg>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <p className="px-5 pb-5 text-muted font-body text-sm leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CORPORATE / FAMILY */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="bg-[#111111] border border-[#2a2a2a] rounded-2xl p-10 text-center">
            <h3 className="font-display font-extrabold text-3xl md:text-4xl uppercase text-offwhite mb-3">CORPORATE & <span className="text-orange">FAMILY</span> PLANS</h3>
            <p className="text-muted font-body text-lg max-w-xl mx-auto mb-8">Special rates for teams of 5+ or families. Get your whole crew moving with custom pricing and dedicated support.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[{ icon: '🏢', title: 'Corporate Plans', desc: 'Bring fitness to your team. Discounts for 5+ employees, onsite wellness consultations, and group billing.' },
                { icon: '👨‍👩‍👧‍👦', title: 'Family Plans', desc: '3+ family members get 25% off each membership. Train together, transform together.' },
                { icon: '🎓', title: 'Student & Military', desc: '15% discount for students, active military, veterans, first responders, and healthcare workers.' }
              ].map((item) => (
                <div key={item.title} className="bg-card border border-[#2a2a2a] rounded-xl p-6">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-display font-bold text-offwhite uppercase text-lg mb-2">{item.title}</h4>
                  <p className="text-muted font-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase px-10 py-4 rounded tracking-wider transition-colors duration-200 text-lg">
              CONTACT US FOR RATES
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}