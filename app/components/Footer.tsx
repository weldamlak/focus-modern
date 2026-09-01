'use client'

import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

interface FooterProps {
  isDarkMode?: boolean
}

export default function Footer({ isDarkMode = false }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className={`relative z-10 pt-16 pb-12 border-t transition-colors duration-300 ${
        isDarkMode
          ? 'bg-slate-950/90 border-slate-800 text-slate-300'
          : 'bg-white border-gray-100 text-slate-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
          
          {/* Brand Info & Social Icons */}
          <div className="md:col-span-1 space-y-5">
            <h2 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              FOCUS <span className={isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}>2018</span>
            </h2>
            
            <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
              Empowering students with the best entrance exam preparation tools and reference materials in Ethiopia.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {/* Telegram */}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-slate-200'
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-slate-200'
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-slate-900 text-slate-400 hover:text-emerald-400 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-500 hover:text-indigo-600 hover:bg-slate-200'
                }`}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div className="space-y-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              EXPLORE
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="#exams" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'}`}>
                  Past Papers
                </Link>
              </li>
              <li>
                <Link href="#materials" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'}`}>
                  Reference Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
              SUPPORT
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link href="/about" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'}`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'}`}>
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={`transition-colors ${isDarkMode ? 'hover:text-emerald-400' : 'hover:text-indigo-600'}`}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Back to Top */}
          <div className="flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center gap-2 border shadow-sm ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                  : 'bg-slate-50 border-gray-200/80 text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400 ${
          isDarkMode ? 'border-slate-800/80' : 'border-gray-100'
        }`}>
          <p>© 2026 FOCUS 2018. All rights reserved.</p>
          
          <p className="uppercase text-[10px] tracking-wider text-center md:text-right max-w-md opacity-75">
            DISCLAIMER: THIS PLATFORM IS FOR EDUCATIONAL PREPARATION ONLY AND IS NOT AFFILIATED WITH OFFICIAL EXAMINATION BODIES.
          </p>
        </div>
      </div>
    </footer>
  )
}