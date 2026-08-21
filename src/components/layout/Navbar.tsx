import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Programs', to: '/programs' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 bg-orange rounded flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-offwhite uppercase tracking-wider text-lg leading-none">PEAK <span className="text-orange">PERFORMANCE</span></span>
              <span className="text-muted text-xs font-body tracking-widest uppercase">FITNESS</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `font-display font-bold uppercase tracking-wider text-sm transition-colors duration-200 ${isActive ? 'text-orange' : 'text-offwhite hover:text-orange'}`}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:flex">
            <Link to="/pricing" className="bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase text-sm px-6 py-2.5 rounded tracking-wider transition-colors duration-200">
              START FREE TRIAL
            </Link>
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-offwhite origin-center transition-colors" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-0.5 bg-offwhite" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block w-6 h-0.5 bg-offwhite origin-center" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden bg-[#111111] border-t border-[#2a2a2a] overflow-hidden">
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)} className={({ isActive }) => `font-display font-bold uppercase tracking-wider text-lg py-2 border-b border-[#2a2a2a] transition-colors duration-200 ${isActive ? 'text-orange' : 'text-offwhite hover:text-orange'}`}>
                  {link.label}
                </NavLink>
              ))}
              <Link to="/pricing" onClick={() => setMenuOpen(false)} className="mt-2 bg-orange hover:bg-orange-dark text-white font-display font-bold uppercase text-center px-6 py-3 rounded tracking-wider transition-colors duration-200">
                START FREE TRIAL
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
