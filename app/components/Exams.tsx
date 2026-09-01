'use client'

<<<<<<< HEAD
=======
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
import Footer from './Footer'
import {
  ArrowLeft,
  GraduationCap,
<<<<<<< HEAD
  FileText,
  Play
=======
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Sparkles,
  HelpCircle,
  FileText
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
} from 'lucide-react'

interface ExamsProps {
  onBackToDashboard: () => void
<<<<<<< HEAD
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

=======
  isDarkMode?: boolean
}

type Question = {
  id: number
  question: string
  options: string[]
  answer: string
  category?: string
  year?: number
}

type ExamMode = 'practice' | 'exam' | null

export default function Exams({ onBackToDashboard, isDarkMode = false }: ExamsProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [activeMode, setActiveMode] = useState<ExamMode>(null)
  
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)
  
  // Timer state for Exam Mode
  const [timeLeft, setTimeLeft] = useState<number>(1800) // 30 minutes default

  // Available Exam Years
  const examYears = [
    { year: 2017, title: '2017 ESSLCE National Exam', questionsCount: 50, subject: 'General Practice' },
    { year: 2016, title: '2016 ESSLCE National Exam', questionsCount: 50, subject: 'General Practice' },
    { year: 2015, title: '2015 ESSLCE National Exam', questionsCount: 50, subject: 'General Practice' },
  ]

  // Fetch Questions from Supabase when Year is Selected
  useEffect(() => {
    if (!selectedYear) return

    async function fetchQuestions() {
      setLoading(true)
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('year', selectedYear)
        .order('id', { ascending: true })

      if (error) {
        console.error('Error fetching questions:', error.message)
        // Fallback: Fetch all if year column is not populated yet
        const { data: fallbackData } = await supabase.from('questions').select('*').limit(20)
        setQuestions(fallbackData || [])
      } else if (data && data.length > 0) {
        setQuestions(data)
      } else {
        // Fallback if no questions match year filter
        const { data: fallbackData } = await supabase.from('questions').select('*').limit(20)
        setQuestions(fallbackData || [])
      }
      setLoading(false)
    }

    fetchQuestions()
  }, [selectedYear])

  // Timer countdown for Exam Mode
  useEffect(() => {
    if (activeMode !== 'exam' || submitted || !selectedYear) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setSubmitted(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [activeMode, submitted, selectedYear])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startExamSession = (year: number, mode: ExamMode) => {
    setSelectedYear(year)
    setActiveMode(mode)
    setSelectedAnswers({})
    setSubmitted(false)
    setTimeLeft(1800)
  }

  const resetSelection = () => {
    setSelectedYear(null)
    setActiveMode(null)
    setSelectedAnswers({})
    setSubmitted(false)
  }

  const score = questions.filter((q) => selectedAnswers[q.id] === q.answer).length

>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
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
<<<<<<< HEAD
                onClick={onBackToDashboard}
=======
                onClick={selectedYear ? resetSelection : onBackToDashboard}
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
<<<<<<< HEAD
                <span>Dashboard</span>
=======
                <span>{selectedYear ? 'Back to Exam Cards' : 'Dashboard'}</span>
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
              </button>
              
              <div className="flex items-center gap-2">
                <GraduationCap className={`w-6 h-6 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
                <span className={`text-lg font-black hidden sm:inline ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Exams Hub
                </span>
              </div>
            </div>
<<<<<<< HEAD
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
=======

            {selectedYear && (
              <div className="flex items-center gap-2">
                {activeMode === 'exam' && !submitted && (
                  <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border ${
                    timeLeft < 300 
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 animate-pulse' 
                      : isDarkMode ? 'bg-slate-800 text-emerald-400 border-slate-700' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                  }`}>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatTime(timeLeft)}</span>
                  </span>
                )}
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                  isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                }`}>
                  {Object.keys(selectedAnswers).length} / {questions.length} Answered
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          
          {/* Card Selection View (When no exam is actively selected) */}
          {!selectedYear ? (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  isDarkMode ? 'bg-emerald-950 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  ESSLCE Exam Repository
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-3">Select Entrance Exam</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                  Choose an exam year and launch in <strong>Practice Mode</strong> (instant explanations) or <strong>Exam Mode</strong> (timed full test).
                </p>
              </div>

              {/* Exam Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {examYears.map((item) => (
                  <div
                    key={item.year}
                    className={`p-6 rounded-3xl border shadow-sm flex flex-col justify-between space-y-6 transition hover:border-slate-400 ${
                      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isDarkMode ? 'bg-emerald-950 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                      }`}>
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                          {item.subject}
                        </span>
                        <h2 className="text-xl font-bold">{item.year} ESSLCE</h2>
                      </div>
                      <p className="text-xs text-slate-500">
                        Official national exam model questions configured directly from the question bank database.
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {/* Practice Mode Button */}
                      <button
                        onClick={() => startExamSession(item.year, 'practice')}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                          isDarkMode 
                            ? 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-800/50' 
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100'
                        }`}
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Practice Mode</span>
                      </button>

                      {/* Timed Exam Mode Button */}
                      <button
                        onClick={() => startExamSession(item.year, 'exam')}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                          isDarkMode 
                            ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                      >
                        <Clock className="w-4 h-4" />
                        <span>Timed Exam Mode</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Active Question List View */
            <div className="space-y-6">
              {/* Session Header Bar */}
              <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      activeMode === 'practice' 
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                        : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                    }`}>
                      {activeMode === 'practice' ? 'Practice Mode' : 'Timed Exam Mode'}
                    </span>
                    <span className="text-xs font-bold text-slate-400">• {selectedYear} ESSLCE</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mt-1">Questions Overview</h2>
                </div>

                <button
                  onClick={resetSelection}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-200 underline underline-offset-4 self-start sm:self-auto"
                >
                  Change Exam
                </button>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className={`p-12 text-center rounded-3xl border ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <p className="text-sm font-semibold animate-pulse text-slate-400">Loading questions from Supabase...</p>
                </div>
              ) : (
                /* Question List */
                <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  {questions.map((q, idx) => {
                    const isAnswered = !!selectedAnswers[q.id]
                    const isCorrect = selectedAnswers[q.id] === q.answer

                    return (
                      <div
                        key={q.id}
                        className={`p-5 rounded-2xl border space-y-3 transition ${
                          isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-sm sm:text-base leading-snug">
                            <span className="opacity-60 mr-1.5">Q{idx + 1}.</span> {q.question}
                          </p>
                          
                          {/* Status Indicator */}
                          {((activeMode === 'practice' && isAnswered) || submitted) && (
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0 ${
                              isCorrect 
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                            }`}>
                              {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                              <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                            </span>
                          )}
                        </div>

                        {/* Multiple Choice Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {q.options.map((opt) => {
                            const isOptionSelected = selectedAnswers[q.id] === opt
                            const isOptionCorrect = opt === q.answer

                            // Style Logic based on Practice Mode vs Exam Mode
                            let optionStyle = isDarkMode 
                              ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200' 
                              : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'

                            if (activeMode === 'practice' && isAnswered) {
                              if (isOptionCorrect) {
                                optionStyle = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-bold'
                              } else if (isOptionSelected) {
                                optionStyle = 'bg-rose-500/15 border-rose-500/40 text-rose-400 font-bold'
                              }
                            } else if (isOptionSelected) {
                              optionStyle = isDarkMode
                                ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-bold'
                                : 'bg-indigo-600 border-indigo-600 text-white font-bold'
                            }

                            return (
                              <button
                                key={opt}
                                disabled={submitted || (activeMode === 'practice' && isAnswered)}
                                onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt })}
                                className={`text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium border transition ${optionStyle}`}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}

                  {/* Submission and Results Footer */}
                  {!submitted ? (
                    <button
                      onClick={() => setSubmitted(true)}
                      disabled={Object.keys(selectedAnswers).length === 0}
                      className={`w-full py-4 font-bold rounded-2xl shadow-lg transition text-sm disabled:opacity-50 ${
                        isDarkMode
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      Submit Exam & Review Score
                    </button>
                  ) : (
                    <div className={`p-8 rounded-3xl text-center space-y-4 border ${
                      isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50 border-indigo-100'
                    }`}>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Exam Performance Summary</p>
                      <p className="text-4xl font-black">
                        {score} <span className="text-xl font-normal opacity-50">/ {questions.length}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-slate-400">
                        You completed the exam with a total score of <strong>{questions.length > 0 ? Math.round((score / questions.length) * 100) : 0}%</strong>.
                      </p>
                      <div className="flex gap-3 justify-center pt-2">
                        <button
                          onClick={() => {
                            setSubmitted(false)
                            setSelectedAnswers({})
                            setTimeLeft(1800)
                          }}
                          className={`px-5 py-2.5 font-bold rounded-xl text-xs transition flex items-center gap-1.5 ${
                            isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          }`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retake Exam</span>
                        </button>
                        <button
                          onClick={resetSelection}
                          className={`px-5 py-2.5 font-bold rounded-xl text-xs border transition ${
                            isDarkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-white border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          Choose Other Year
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
        </main>
      </div>

      <Footer isDarkMode={isDarkMode} />
    </div>
  )
}