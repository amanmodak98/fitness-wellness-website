import React from 'react'
import { Link } from 'react-router-dom'

const programLinks = ['HIIT Training','Strength & Conditioning','Yoga & Flexibility','Boxing','CrossFit','Nutrition Coaching']
const companyLinks = [{ label: 'About Us', to: '/contact' },{ label: 'Our Story', to: '/contact' },{ label: 'Careers', to: '/contact' },{ label: 'Press', to: '/contact' },{ label: 'Privacy Policy', to: '/contact' },{ label: 'Terms of Service', to: '/contact' }]

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} aria-label={label} className="w-9 h-9 bg-[#1a1a1a] border border-[#2a2a2a] rounded flex items-center justify-center text-muted hover:text-orange hover:border-orange transition-colors duration-200">
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t-2 border-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-orange rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-extrabold text-offwhite uppercase tracking-wider text-lg leading-none">PEAK <span className="text-orange">PERFORMANCE</span></span>
                <span className="text-muted text-xs font-body tracking-widest uppercase">FITNESS</span>
              </div>
            </Link>
            <p className="text-muted font-body text-sm leading-relaxed max-w-xs">Transform your body, elevate your life. Your strongest self starts here. Join the Peak Performance family today.</p>
            <p className="font-display font-bold text-orange uppercase tracking-widest text-sm">No Excuses. Just Results.</p>
            <div className="flex items-center gap-3">
              <SocialIcon href="#" label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </SocialIcon>
              <SocialIcon href="#" label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="font-display font-bold text-offwhite uppercase tracking-wider text-lg mb-6">Programs</h4>
            <ul className="space-y-3">
              {programLinks.map((program) => (
                <li key={program}>
                  <Link to="/programs" className="text-muted hover:text-orange font-body text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-offwhite uppercase tracking-wider text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-muted hover:text-orange font-body text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-offwhite uppercase tracking-wider text-lg mb-6">Contact & Hours</h4>
            <div className="space-y-4">
              <div><p className="text-orange font-display font-bold uppercase text-xs tracking-wider mb-1">Address</p><p className="text-muted font-body text-sm">1234 Fitness Blvd</p><p className="text-muted font-body text-sm">Downtown District</p></div>
              <div><p className="text-orange font-display font-bold uppercase text-xs tracking-wider mb-1">Phone</p><p className="text-muted font-body text-sm">(555) 123-4567</p></div>
              <div><p className="text-orange font-display font-bold uppercase text-xs tracking-wider mb-1">Email</p><p className="text-muted font-body text-sm">info@peakperformance.fit</p></div>
              <div>
                <p className="text-orange font-display font-bold uppercase text-xs tracking-wider mb-2">Hours</p>
                <div className="space-y-1">
                  <div className="flex justify-between"><span className="text-muted font-body text-xs">Mon–Fri</span><span className="text-offwhite font-body text-xs">5:00 AM – 11:00 PM</span></div>
                  <div className="flex justify-between"><span className="text-muted font-body text-xs">Sat–Sun</span><span className="text-offwhite font-body text-xs">7:00 AM – 9:00 PM</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted font-body text-sm">© 2026 Peak Performance Fitness. All rights reserved.</p>
          <p className="text-muted font-body text-sm">Designed &amp; Developed by <a href="https://www.infirexa.tech" target="_blank" rel="noopener noreferrer">Infirexa</a></p>
          <p className="font-display font-bold text-orange uppercase tracking-widest text-sm">No Excuses. Just Results.</p>
        </div>
      </div>
    </footer>
  )
}
