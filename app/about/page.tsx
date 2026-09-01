'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowLeft, 
  Target, 
  Zap, 
  ShieldCheck, 
  Trophy, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  LineChart 
} from 'lucide-react'

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Top Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-md ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className={`inline-flex items-center gap-2 text-xs font-bold transition ${
              isDarkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <Image
              src={isDarkMode ? '/fav2.png' : '/favicon.ico'}
              alt="Focus 2018 Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="font-black text-sm tracking-tight">Focus 2018</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border border-emerald-500/20 text-emerald-500 bg-emerald-500/10">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Our Full Story</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Building High-Performance Candidates for National Exams
          </h1>
          <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Focus 2018 was engineered to bridge the gap between static studying and real exam execution.
          </p>
        </div>

        {/* Story Section */}
        <div className={`p-8 sm:p-10 rounded-3xl border space-y-6 ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            <span>The Mission Behind Focus 2018</span>
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
            <p>
              Passing national entrance examinations requires more than just memorizing facts—it requires high decision speed, stress resilience, and time management skills under exam conditions.
            </p>
            <p>
              Focus 2018 transforms question banks into interactive diagnostic feedback engines. By offering timed test runs and detailed solution logic, students can evaluate their weak areas before sitting for the real exam.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center">Core Pillars of Platform</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border text-left space-y-3 ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Timed Exam Practice</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Train under authentic timing constraints to build pacing and accuracy under pressure.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border text-left space-y-3 ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <LineChart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Diagnostic Feedback</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Identify gaps in specific subjects early so you spend study time where it matters most.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border text-left space-y-3 ${
              isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm">Curated Materials</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access grade-specific textbooks, reference guides, and practice books directly.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white space-y-4 shadow-xl">
          <h2 className="text-2xl font-black">Ready to Start Preparing?</h2>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-lg mx-auto">
            Take practice exams or read study guides to begin your university entrance preparation today.
          </p>
          <div className="pt-2">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-600 font-bold text-xs hover:bg-indigo-50 transition"
            >
              <span>Explore Exams & Materials</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  )
}