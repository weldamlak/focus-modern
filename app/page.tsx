'use client'

import { useState, useEffect, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import AuthModal from './components/AuthModal'
import Dashboard from './components/Dashboard'
import Exams from './components/Exams'
import FocusAboutAndContact from './components/FocusAboutAndContact'
import Footer from './components/Footer' 

import {
  Book,
  FileText,
  Search,
  Zap,
  LayoutDashboard,
  Trophy,
  House,
  LogIn,
  Radio,
  CalendarCheck,
  GraduationCap,
  ChevronRight,
  Info,
  Send,
  ShieldCheck,
  Menu,
  X,
  Languages,
  Dna,
  FlaskConical,
  ArrowRight,
  Download,
  Sun,
  Moon
} from 'lucide-react'

// ─── HELPER COMPONENTS ───

interface ExamCardProps {
  icon: ReactNode
  title: string
  description: string
  practiceHref: string
  examHref: string
  isDarkMode: boolean
  accentColorClass: string
}

function ExamCard({ icon, title, description, practiceHref, examHref, isDarkMode, accentColorClass }: ExamCardProps) {
  return (
    <div className={`rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border flex flex-col justify-between group ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-gray-100'
      }`}>
      <div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${accentColorClass}`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">{description}</p>
      </div>
      <div className="flex gap-3">
        <Link href={practiceHref} className={`flex-1 text-white text-center py-2.5 rounded-xl text-xs font-bold transition shadow-md ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
          }`}>
          Practice
        </Link>
        <Link href={examHref} className={`flex-1 border text-center py-2.5 rounded-xl text-xs font-bold transition ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-emerald-400' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
          Exam Mode
        </Link>
      </div>
    </div>
  )
}

interface MaterialCardProps {
  imageSrc: string
  title: string
  badgeText?: string
  readHref: string
  downloadHref: string
  isDarkMode: boolean
}

function MaterialCard({ imageSrc, title, badgeText, readHref, downloadHref, isDarkMode }: MaterialCardProps) {
  return (
    <div className={`rounded-3xl p-6 border shadow-sm hover:shadow-xl transition-all duration-300 group ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'
      }`}>
      <div className="relative h-44 w-full rounded-2xl mb-4 bg-gray-50 overflow-hidden shadow-inner">
        <Image src={imageSrc} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="text-center mb-4">
        <h3 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        {badgeText && (
          <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`}>
            {badgeText}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <a
          href={readHref}
          target="_blank"
          rel="noreferrer"
          className={`flex-1 border py-2.5 rounded-xl text-xs font-bold text-center transition-all duration-200 flex items-center justify-center gap-1.5 ${isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
        >
          <Book className="w-4 h-4" /> Read
        </a>
        <a
          href={downloadHref}
          className={`flex-1 text-white py-2.5 rounded-xl text-xs font-bold text-center transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-slate-900 hover:bg-indigo-600 shadow-slate-900/20'
            }`}
        >
          <Download className="w-4 h-4" /> Download
        </a>
      </div>
    </div>
  )
}

// ─── MAIN COMPONENT ───

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'exams'>('home')

  // UI Interactive States
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Track scroll position for header transformation
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user) setCurrentView('dashboard')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        setIsAuthOpen(false)
        setCurrentView('dashboard')
      } else {
        setCurrentView('home')
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setCurrentView('home')
  }

  if (user && currentView === 'exams') {
    return <Exams onBackToDashboard={() => setCurrentView('dashboard')} />
  }

  if (user && currentView === 'dashboard') {
    return (
      <Dashboard
        user={user}
        onSignOut={handleSignOut}
        onOpenExams={() => setCurrentView('exams')}
        onGoHome={() => setCurrentView('home')}
        isDarkMode={isDarkMode}
      />
    )
  }

  return (
    <div
      className={`min-h-screen font-sans flex flex-col justify-between pb-20 md:pb-0 transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed relative ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
        }`}
      style={{ backgroundImage: `url('${isDarkMode ? '/BG2.jpg' : '/BG.jpg'}')` }}
    >
      {/* Background Overlay */}
      <div className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/75' : 'bg-slate-50/45'
        }`} />

      {/* ─── TOP NAVBAR ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? isDarkMode
            ? 'bg-slate-900/90 backdrop-blur-md shadow-xl border-b border-slate-800'
            : 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-transparent border-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 w-full flex items-center justify-between gap-4 relative z-10">

          {/* Brand Logo */}
          <button
            onClick={() => setCurrentView('home')}
            className={`flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight group ${isDarkMode ? 'text-emerald-500' : 'text-indigo-600'
              }`}
          >
            <Image
              src={isDarkMode ? '/fav2.png' : '/favicon.ico'}
              alt="Focus 2018 Logo"
              width={36}
              height={36}
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain group-hover:scale-105 transition-transform duration-300"
              priority
            />
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>
              Focus <span className={isDarkMode ? 'text-emerald-400 font-bold' : 'text-indigo-500 font-bold'}>2018</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border transition-all duration-300 backdrop-blur-md ${isDarkMode ? 'bg-slate-900/90 border-slate-800 shadow-lg shadow-black/20' : 'bg-white/90 border-gray-200/80 shadow-sm'
            }`}>
            <button
              onClick={() => setCurrentView('home')}
              className={`px-4 py-2 rounded-xl font-medium text-xs transition-all duration-200 flex items-center gap-2.5 group ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/80' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
            >
              <Book className={`w-4 h-4 text-gray-400 transition-all duration-200 group-hover:scale-110 ${isDarkMode ? 'group-hover:text-emerald-400' : 'group-hover:text-indigo-600'
                }`} />
              <span>Books</span>
            </button>

            <button
              onClick={() => (user ? setCurrentView('exams') : setIsAuthOpen(true))}
              className={`px-4 py-2 rounded-xl font-medium text-xs transition-all duration-200 flex items-center gap-2.5 group ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800/80' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
            >
              <FileText className={`w-4 h-4 text-gray-400 transition-all duration-200 group-hover:scale-110 ${isDarkMode ? 'group-hover:text-emerald-400' : 'group-hover:text-indigo-600'
                }`} />
              <span>Exams</span>
            </button>

            {/* Desktop More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`px-4 py-2 rounded-full font-semibold text-xs transition-all duration-200 flex items-center gap-2 group ${isDarkMode ? 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800' : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/80'
                  }`}
              >
                <div className={`w-5 h-5 rounded flex flex-col items-center justify-center gap-0.5 transition-colors ${isDarkMode ? 'bg-emerald-500/10 group-hover:bg-emerald-500/20' : 'bg-indigo-500/10 group-hover:bg-indigo-500/20'
                  }`}>
                  <div className={`w-3 h-[2px] rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-indigo-500'}`} />
                  <div className={`w-2 h-[2px] rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-indigo-500'}`} />
                  <div className={`w-3 h-[2px] rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-indigo-500'}`} />
                </div>
                <span>More</span>
              </button>

              {isMoreOpen && (
                <div className={`absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl border p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-gray-100 text-slate-800'
                  }`}>
                  <div className="space-y-1 mb-2">
                    <Link
                      href="/news"
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-indigo-50/50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                          }`}>
                          <Radio className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold">Latest News</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </Link>

                    <Link
                      href="/myplan"
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-purple-50/50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400' : 'bg-purple-50 text-purple-600'
                          }`}>
                          <CalendarCheck className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold">My Plan</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </Link>

                    <Link
                      href="/tinat"
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-blue-50/50'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400' : 'bg-blue-50 text-blue-600'
                          }`}>
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[9px] font-black uppercase ${isDarkMode ? 'text-emerald-400' : 'text-blue-500'}`}>Study</span>
                          <span className="text-xs font-bold">ጥናት</span>
                        </div>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                    </Link>
                  </div>

                  <div className={`h-px my-2 ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`} />

                  <div className="grid grid-cols-1 gap-1">
                    <Link
                      href="/about"
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 ${isDarkMode ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800' : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                        }`}
                    >
                      <Info className="w-3.5 h-3.5" /> About Us
                    </Link>
                    <Link
                      href="#contact"
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 ${isDarkMode ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800' : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                        }`}
                    >
                      <Send className="w-3.5 h-3.5" /> Contact
                    </Link>
                    <Link
                      href="/privacy"
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition flex items-center gap-2 ${isDarkMode ? 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800' : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                        }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Privacy
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Search Bar */}
          <div className={`hidden lg:flex items-center gap-2.5 px-3.5 py-2 rounded-t-none rounded-b-xl border-t-0 border-x border-b w-64 focus-within:w-80 transition-all duration-300 backdrop-blur-md group ${isDarkMode
            ? 'bg-slate-900/90 border-slate-800 text-white focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-lg shadow-black/20'
            : 'bg-white/90 border-gray-200/80 text-slate-800 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-md'
            }`}>
            <Search className={`w-4 h-4 shrink-0 transition-colors duration-200 ${isDarkMode ? 'text-slate-400 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-indigo-600'
              }`} />
            <input
              type="text"
              placeholder="Search exams, books..."
              className="bg-transparent text-xs font-medium outline-none placeholder:text-slate-400 placeholder:font-normal w-full"
            />
            <kbd className={`hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-semibold rounded border transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-gray-200 text-slate-400'
              }`}>
              ⌘K
            </kbd>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme"
              className={`p-2 sm:p-2.5 rounded-full border transition-all duration-200 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-slate-700 hover:bg-gray-50 shadow-sm'
                }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {!user ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs transition-all duration-200 flex items-center gap-2 border shadow-sm active:scale-95 ${isDarkMode
                  ? 'bg-slate-800 hover:bg-emerald-600 text-white border-slate-700 hover:border-emerald-600'
                  : 'bg-white hover:bg-indigo-600 hover:text-white text-slate-800 border-gray-200 hover:border-indigo-600'
                  }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-white font-bold rounded-full text-xs shadow-md transition flex items-center gap-1.5 active:scale-95 ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-xl border transition ${isDarkMode ? 'text-slate-300 border-slate-800 bg-slate-900/80' : 'text-gray-700 border-gray-200 bg-white/80'
                }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── MOBILE SLIDE DRAWER NAV ─── */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <nav className={`relative w-4/5 max-w-xs h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto transition-colors z-10 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'
            }`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Image
                    src={isDarkMode ? '/fav2.png' : '/favicon.ico'}
                    alt="Focus 2018 Logo"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                  <span className={`text-lg font-bold ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`}>
                    Focus 2018
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-400 hover:text-red-500 transition">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="space-y-2">
                <li>
                  <Link
                    href="/tinat"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm ${isDarkMode ? 'hover:bg-slate-800 hover:text-emerald-400' : 'hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                  >
                    <GraduationCap className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
                    <span>ጥናት (Study)</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      if (user) setCurrentView('exams')
                      else setIsAuthOpen(true)
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm text-left ${isDarkMode ? 'hover:bg-slate-800 hover:text-emerald-400' : 'hover:bg-amber-50 hover:text-amber-600'
                      }`}
                  >
                    <Book className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-amber-600'}`} />
                    <span>Focus Exams</span>
                  </button>
                </li>
                <li>
                  <Link
                    href="/myplan"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition font-bold text-sm ${isDarkMode ? 'hover:bg-slate-800 hover:text-emerald-400' : 'hover:bg-emerald-50 hover:text-emerald-600'
                      }`}
                  >
                    <CalendarCheck className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <span>My Plan</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className={`border-t pt-4 space-y-2 ${isDarkMode ? 'border-slate-800' : 'border-gray-100'}`}>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 text-xs text-slate-400 ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-500'}`}>
                <Info className="w-3.5 h-3.5" /> About Us
              </Link>
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 text-xs text-slate-400 ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-500'}`}>
                <Send className="w-3.5 h-3.5" /> Contact
              </Link>
              <Link href="/privacy" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 text-xs text-slate-400 ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-500'}`}>
                <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* ─── MAIN HERO SECTION ─── */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 min-h-[calc(100vh-4rem)] lg:min-h-[85vh] flex flex-col justify-center items-center text-center space-y-4 sm:space-y-6 py-6 sm:py-12">

        {/* Resizable / Responsive Hero Image Container */}
        <div className="relative group mb-1 sm:mb-2">
          <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 max-h-[30vh] aspect-square rounded-3xl overflow-hidden border-4 border-white/90 shadow-2xl bg-white relative transition-transform duration-500 group-hover:scale-105">
            <Image
              src="/BGG.jpg"
              alt="Student Success"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full shadow-lg border border-slate-100 flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black tracking-wider text-slate-800 uppercase z-10 whitespace-nowrap">
            <Trophy className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-500" />
            <span>Ready To Excel</span>
          </div>
        </div>

        {/* Scalable Headline */}
        <h1 className={`text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight pt-2 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'
          }`}>
          With Focus, You Can!
        </h1>

        {/* Responsive Subtitle Box */}
        <p className={`text-xs sm:text-sm md:text-base max-w-lg leading-relaxed px-4 py-2.5 rounded-2xl transition-colors ${isDarkMode
            ? 'text-slate-200 bg-slate-900/60 backdrop-blur-md border border-slate-800/50'
            : 'text-slate-700 bg-white/60 backdrop-blur-md border border-white/50'
          }`}>
          <strong className={`font-bold ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`}>Welcome to</strong> our exam based Learning platform. Master exams, access curated study materials, and build the knowledge to excel.
        </p>

        {/* Hero Action Call */}
        <div className="pt-2 w-full max-w-xs sm:w-auto">
          {!user ? (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 mx-auto"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Get Started!</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`w-full sm:w-auto px-8 py-3.5 text-white font-bold text-sm rounded-2xl shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 mx-auto ${isDarkMode ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
                }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Open Dashboard</span>
            </button>
          )}
        </div>
      </main>

      {/* ─── ESSLCE EXAM SUBJECTS SECTION ─── */}
      <section className={`relative z-10 py-12 sm:py-16 backdrop-blur-md border-t transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white/80 border-gray-100'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className={`text-2xl sm:text-4xl font-extrabold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              University Entrance Exam (ESSLCE)
            </h2>
            <p className={`text-xs sm:text-base max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Master your entrance exams with categorized practice modules and timed exam simulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ExamCard
              icon={<Languages className="w-6 h-6" />}
              title="English 2017"
              description="Grammar, Comprehension, Vocabulary, Writing & Communication."
              practiceHref="/2017english.html"
              examHref="/2017englishexam.html"
              isDarkMode={isDarkMode}
              accentColorClass={isDarkMode ? 'bg-emerald-950/80 text-emerald-400' : 'bg-indigo-100 text-indigo-600'}
            />
            <ExamCard
              icon={<Dna className="w-6 h-6" />}
              title="Biology 2017"
              description="Cell Biology, Genetics, Ecology & Human Physiology."
              practiceHref="/2017Biology.html"
              examHref="/2017Biologyexam.html"
              isDarkMode={isDarkMode}
              accentColorClass={isDarkMode ? 'bg-emerald-950/80 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}
            />
            <ExamCard
              icon={<FlaskConical className="w-6 h-6" />}
              title="Chemistry 2017"
              description="Atomic Structure, Organic & Inorganic Reactions."
              practiceHref="/2017chemistry.html"
              examHref="/2017chemistryexam.html"
              isDarkMode={isDarkMode}
              accentColorClass={isDarkMode ? 'bg-amber-950/80 text-amber-400' : 'bg-amber-100 text-amber-600'}
            />
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <button
              onClick={() => (user ? setCurrentView('exams') : setIsAuthOpen(true))}
              className={`inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 ${isDarkMode ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-emerald-900/20' : 'bg-gradient-to-r from-indigo-600 to-blue-600 shadow-indigo-600/20'
                }`}
            >
              <span>ሁሉንም ፈተናዎች እዚህ ያግኙ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── RECOMMENDED MATERIALS SECTION ─── */}
      <section className={`relative z-10 py-12 sm:py-16 backdrop-blur-md transition-colors duration-300 ${isDarkMode ? 'bg-slate-950/90' : 'bg-slate-100/90'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 text-center">
            <h2 className={`text-2xl sm:text-4xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recommended Materials
            </h2>
            <p className={`text-xs sm:text-base max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              Study materials curated to boost your exam readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <MaterialCard
              imageSrc="/extreme-aptitude.jpg"
              title="Extreme Aptitude"
              readHref="https://drive.google.com/file/d/1UpAymMRZ3uoSqkq1WUJWcqmkaneIO3V-/view"
              downloadHref="https://drive.google.com/uc?export=download&id=1UpAymMRZ3uoSqkq1WUJWcqmkaneIO3V-"
              isDarkMode={isDarkMode}
            />
            <MaterialCard
              imageSrc="/biology.png"
              title="TextBook Biology"
              badgeText="Grade 9"
              readHref="https://drive.google.com/file/d/1rnHfB6MwTbI1NTP2ftO66IUQybVoVAKp/view"
              downloadHref="https://drive.google.com/uc?export=download&id=1rnHfB6MwTbI1NTP2ftO66IUQybVoVAKp"
              isDarkMode={isDarkMode}
            />
            <MaterialCard
              imageSrc="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800"
              title="Advanced English Book 1"
              badgeText="Grammar & Communication"
              readHref="https://drive.google.com/file/d/1PpnLmSIljkxO4PIbnJDlTd7SyQDLBvLY/view"
              downloadHref="https://drive.google.com/file/d/1PpnLmSIljkxO4PIbnJDlTd7SyQDLBvLY/view"
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </section>

      {/* ─── MOBILE BOTTOM BAR ─── */}
      <div className={`sm:hidden fixed bottom-0 left-0 right-0 rounded-t-2xl border-t px-6 py-3 flex items-center justify-around z-40 backdrop-blur-xl transition-all duration-300 shadow-2xl ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
        }`}>
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all duration-200 group ${currentView === 'home'
            ? isDarkMode ? 'text-emerald-400 font-bold scale-105' : 'text-indigo-600 font-bold scale-105'
            : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          <House className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Home</span>
        </button>

        <button
          onClick={() => (user ? setCurrentView('exams') : setIsAuthOpen(true))}
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all duration-200 group ${currentView === 'exams'
            ? isDarkMode ? 'text-emerald-400 font-bold scale-105' : 'text-indigo-600 font-bold scale-105'
            : 'text-slate-400 hover:text-slate-600'
            }`}
        >
          <FileText className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Exams</span>
        </button>

        <Link
          href="/tinat"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400 transition-all duration-200 group ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'
            }`}
        >
          <GraduationCap className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span>Study</span>
        </Link>

        {user ? (
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-all duration-200 group ${currentView === 'dashboard'
              ? isDarkMode ? 'text-emerald-400 font-bold scale-105' : 'text-indigo-600 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            <LayoutDashboard className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Dashboard</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAuthOpen(true)}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold text-slate-400 transition-all duration-200 group ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'
              }`}
          >
            <LogIn className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Login</span>
          </button>
        )}
      </div>

      <FocusAboutAndContact isDarkMode={isDarkMode} />

      {/* ─── FOOTER SECTION ─── */}
      <Footer isDarkMode={isDarkMode} />

      {/* Auth Modal Trigger */}
      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      )}
    </div>
  )
}