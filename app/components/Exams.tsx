'use client'

import Footer from './Footer'
import {
  ArrowLeft,
  GraduationCap,
  FileText,
  Play
} from 'lucide-react'

interface ExamsProps {
  onBackToDashboard: () => void
  onStart2017S?: () => void
  onStart2016S?: () => void
  onStart2015S?: () => void
  isDarkMode?: boolean
}

export default function Exams({
  onBackToDashboard,
  onStart2017S = () => {},
  onStart2016S = () => {},
  onStart2015S = () => {},
  isDarkMode = false
}: ExamsProps) {

  const examYears = [
    {
      year: 2017,
      series: '2017 Series',
      desc: 'Standardized national exam archive covering core subjects.',
      onStart: onStart2017S,
    },
    {
      year: 2016,
      series: '2016 Series',
      desc: 'Official certified examination archive for the 2016 academic session.',
      onStart: onStart2016S,
    },
    {
      year: 2015,
      series: '2015 Series',
      desc: 'Complete subject solutions and standardized questions for the 2015 entrance cycle.',
      onStart: onStart2015S,
    },
  ]

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      <div>
        {/* Navigation Navbar */}
        <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <button
                onClick={onBackToDashboard}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              
              <div className="flex items-center gap-2">
                <GraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
                <span className={`text-lg font-black hidden sm:inline ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Exams Hub
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <div className="space-y-8">
            {/* Header Title Section */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                2026 Preparation Vault
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
                Past <span className="text-indigo-600 dark:text-indigo-400">Examinations</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Master the standardized format with our premium archive of official entrance papers and subject banks.
              </p>
            </div>

            {/* Examination Series Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {examYears.map((item) => (
                <div
                  key={item.year}
                  className={`p-7 rounded-3xl border shadow-sm flex flex-col justify-between space-y-6 transition hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 ${
                    isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isDarkMode ? 'bg-slate-800 text-indigo-400' : 'bg-slate-900 text-white'
                      }`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        • AVAILABLE
                      </span>
                    </div>

                    <div>
                      <h2 className="text-2xl font-black tracking-tight">
                        {item.year} <span className="text-sm font-normal text-slate-400 italic">Series</span>
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={item.onStart}
                      className={`w-full py-3.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                        isDarkMode 
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Start</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}