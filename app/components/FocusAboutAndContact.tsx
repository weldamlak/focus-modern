'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { 
  Zap, 
  ArrowRight, 
  Radio, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Send, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react'

interface FocusAboutAndContactProps {
  isDarkMode?: boolean
}

export default function FocusAboutAndContact({ isDarkMode = false }: FocusAboutAndContactProps) {
  // Contact Form State
  const [formData, setFormData] = useState({ fullName: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulating API form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ fullName: '', email: '', message: '' })

      // Auto-hide success alert after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 800)
  }

  return (
    <div className={`relative z-10 transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* ─── 1. DISCOVER FOCUS 2018 SECTION ─── */}
      <section className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/60 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`rounded-3xl p-8 sm:p-12 border relative overflow-hidden transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800 shadow-2xl shadow-black/40' 
              : 'bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/30 border-indigo-100 shadow-xl'
          }`}>
            
            {/* Ambient Background Glow */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20 ${
              isDarkMode ? 'bg-emerald-500/10' : 'bg-indigo-500/10'
            }`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Main Pitch Content */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border transition-colors ${
                  isDarkMode 
                    ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10' 
                    : 'border-indigo-500/20 text-indigo-600 bg-indigo-500/10'
                }`}>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Discover Focus 2018</span>
                </div>

                <h2 className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  We Don’t Just Provide Exams. <br />
                  <span className={isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}>
                    We Build Performance.
                  </span>
                </h2>

                <p className={`text-xs sm:text-base leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Focus 2018 is more than a database of questions. It’s a high-precision training ground where students master the art of{' '}
                  <strong className={isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}>accuracy</strong>{' '}
                  and{' '}
                  <strong className={isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}>speed</strong>{' '}
                  for the National Entrance Exam.
                </p>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md active:scale-95 group ${
                      isDarkMode 
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                    }`}
                  >
                    <span>Our Full Story</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Badges & Highlight Quote */}
              <div className="lg:col-span-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  
                  {/* Real-Time Logic Badge */}
                  <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isDarkMode ? 'bg-emerald-950/80 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      <Radio className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Real-Time Logic</h4>
                      <p className="text-[11px] text-slate-400">Simulate authentic entrance test scenarios.</p>
                    </div>
                  </div>

                  {/* Systematic Feedback Badge */}
                  <div className={`p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isDarkMode ? 'bg-emerald-950/80 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Systematic Feedback</h4>
                      <p className="text-[11px] text-slate-400">Track accuracy trends and clear weak spots.</p>
                    </div>
                  </div>

                </div>

                {/* Core Testimonial Quote */}
                <div className={`p-5 rounded-2xl border relative ${
                  isDarkMode 
                    ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-200' 
                    : 'bg-indigo-50/60 border-indigo-100 text-indigo-950'
                }`}>
                  <p className="italic text-xs sm:text-sm font-medium leading-relaxed">
                    &ldquo;Focus 2018 helps you identify gaps before the actual exam day.&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. LET'S CONNECT (CONTACT) SECTION ─── */}
      <section id="contact" className={`py-16 sm:py-20 border-t transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-950/90 border-slate-800/80' : 'bg-slate-100/80 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="text-center space-y-3 mb-12">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border transition-colors ${
              isDarkMode 
                ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10' 
                : 'border-indigo-500/20 text-indigo-600 bg-indigo-500/10'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            
            <h2 className={`text-2xl sm:text-4xl font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              Let&apos;s Connect
            </h2>
            
            <p className={`text-xs sm:text-base max-w-lg mx-auto leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Have questions about the ESSLCE exams or reference materials? We&apos;re here to help you succeed.
            </p>
          </div>

          {/* Form & Contact Info Card Container */}
          <div className={`rounded-3xl p-6 sm:p-10 border shadow-xl relative overflow-hidden transition-all duration-300 ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Direct Reach Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    We&apos;re ready to assist.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Reach out for platform support, exam guidance, or feedback on our study materials.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Email Card */}
                  <a 
                    href="mailto:focus2018@gmail.com" 
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group ${
                      isDarkMode 
                        ? 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/50' 
                        : 'bg-slate-50 border-gray-100 hover:border-indigo-200 shadow-sm'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                      isDarkMode ? 'bg-emerald-950/80 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Us</span>
                      <span className={`text-xs sm:text-sm font-semibold truncate block ${
                        isDarkMode ? 'text-slate-200 group-hover:text-emerald-400' : 'text-slate-800 group-hover:text-indigo-600'
                      }`}>
                        focus2018@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Phone / Telegram Card */}
                  <a 
                    href="tel:+251964995549" 
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 group ${
                      isDarkMode 
                        ? 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/50' 
                        : 'bg-slate-50 border-gray-100 hover:border-indigo-200 shadow-sm'
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                      isDarkMode ? 'bg-emerald-950/80 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Call / Telegram</span>
                      <span className={`text-xs sm:text-sm font-semibold block ${
                        isDarkMode ? 'text-slate-200 group-hover:text-emerald-400' : 'text-slate-800 group-hover:text-indigo-600'
                      }`}>
                        +251 964 995 549
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Form Input Column */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className={`block text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-xs font-medium border outline-none transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-slate-950/80 border-slate-800 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20' 
                          : 'bg-slate-50 border-gray-200 text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className={`block text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="example@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-xs font-medium border outline-none transition-all duration-200 ${
                        isDarkMode 
                          ? 'bg-slate-950/80 border-slate-800 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20' 
                          : 'bg-slate-50 border-gray-200 text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className={`block text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl text-xs font-medium border outline-none transition-all duration-200 resize-none ${
                        isDarkMode 
                          ? 'bg-slate-950/80 border-slate-800 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20' 
                          : 'bg-slate-50 border-gray-200 text-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                      }`}
                    />
                  </div>

                  {/* Submission Success Alert */}
                  {isSubmitted && (
                    <div className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200 ${
                      isDarkMode ? 'bg-emerald-950/50 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                      <span>Your message has been sent successfully! We will get back to you soon.</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 px-6 rounded-xl text-white text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60 ${
                      isDarkMode 
                        ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20' 
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/20'
                    }`}
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                </form>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}