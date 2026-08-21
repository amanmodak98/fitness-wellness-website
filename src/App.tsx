import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const ProgramsPage = React.lazy(() => import('./pages/ProgramsPage'))
const TrainersPage = React.lazy(() => import('./pages/TrainersPage'))
const PricingPage = React.lazy(() => import('./pages/PricingPage'))
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-jet flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#2a2a2a] border-t-orange rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/trainers" element={<TrainersPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
