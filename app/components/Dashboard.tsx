'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import {
  Trophy,
  Target,
  Flame,
  BookOpen,
  LogOut,
  Home,
  User as UserIcon,
  CheckCircle2,
  TrendingUp,
  Award,
  Edit3,
  X,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'

interface DashboardProps {
  user: User
  onSignOut: () => void
  onOpenExams: () => void
  onGoHome: () => void
  isDarkMode?: boolean
}

interface TestResult {
  id: string
  created_at: string
  score_percentage: number
  total_questions?: number
  correct_answers?: number
  subject?: string
}

interface Profile {
  display_name: string
  avatar_url: string
}

export default function Dashboard({
  user,
  onSignOut,
  onOpenExams,
  onGoHome,
  isDarkMode = false
}: DashboardProps) {
  const [profile, setProfile] = useState<Profile>({
    display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
    avatar_url: user.user_metadata?.avatar_url || ''
  })
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState(profile.display_name)
  const [newAvatarUrl, setNewAvatarUrl] = useState(profile.avatar_url)

  useEffect(() => {
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    setIsLoading(true)
    try {
      // Fetch Profile Details
      const { data: profileData } = await supabase
        .from('profiles')
        .select('display_name, avatar_url')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile({
          display_name: profileData.display_name || profile.display_name,
          avatar_url: profileData.avatar_url || profile.avatar_url
        })
        setNewDisplayName(profileData.display_name || profile.display_name)
        setNewAvatarUrl(profileData.avatar_url || profile.avatar_url)
      }

      // Fetch Recent Exam Results
      const { data: scoreData } = await supabase
        .from('user_exam_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (scoreData) {
        setResults(scoreData)
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updates = {
        id: user.id,
        display_name: newDisplayName,
        avatar_url: newAvatarUrl,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error

      setProfile({ display_name: newDisplayName, avatar_url: newAvatarUrl })
      setIsEditModalOpen(false)
    } catch (err) {
      console.error('Failed to update profile:', err)
    }
  }

  // Analytics Computation
  const totalExams = results.length
  const averageScore = totalExams
    ? Math.round(results.reduce((acc, curr) => acc + curr.score_percentage, 0) / totalExams)
    : 0
  const highestScore = totalExams
    ? Math.max(...results.map((r) => r.score_percentage))
    : 0

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans p-4 sm:p-8 ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ─── HEADER / TOP NAV ─── */}
        <header
          className={`rounded-3xl p-6 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-gray-100'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
              <div
                className={`w-16 h-16 rounded-2xl overflow-hidden border-2 flex items-center justify-center relative shadow-md ${
                  isDarkMode ? 'border-emerald-500/40 bg-slate-800' : 'border-indigo-500/40 bg-indigo-50'
                }`}
              >
                {profile.avatar_url ? (
                  <Image src={profile.avatar_url} alt="Profile" fill className="object-cover" />
                ) : (
                  <UserIcon className={`w-8 h-8 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-slate-800 rounded-lg shadow border border-gray-200 dark:border-slate-700">
                <Edit3 className="w-3 h-3 text-slate-600 dark:text-slate-300" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black">{profile.display_name}</h1>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                  isDarkMode ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                }`}>
                  Student
                </span>
              </div>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onGoHome}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                isDarkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-gray-200 hover:bg-gray-50 text-slate-700'
              }`}
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <button
              onClick={onOpenExams}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 ${
                isDarkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <BookOpen className="w-4 h-4" /> Launch Exams
            </button>
            <button
              onClick={onSignOut}
              aria-label="Sign Out"
              className={`p-2.5 rounded-xl border transition ${
                isDarkMode ? 'border-slate-800 hover:bg-red-950/30 text-slate-400 hover:text-red-400' : 'border-gray-200 hover:bg-red-50 text-slate-400 hover:text-red-600'
              }`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* ─── METRIC OVERVIEW CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Average Score</span>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400' : 'bg-indigo-50 text-indigo-600'}`}>
                <Target className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black">{isLoading ? '--' : `${averageScore}%`}</div>
            <p className="text-[11px] text-gray-400 mt-1">Across overall national tests</p>
          </div>

          <div className={`p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Exams Completed</span>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400' : 'bg-blue-50 text-blue-600'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black">{isLoading ? '--' : totalExams}</div>
            <p className="text-[11px] text-gray-400 mt-1">Practiced series sets</p>
          </div>

          <div className={`p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Highest Mark</span>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400' : 'bg-amber-50 text-amber-600'}`}>
                <Trophy className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black">{isLoading ? '--' : `${highestScore}%`}</div>
            <p className="text-[11px] text-gray-400 mt-1">Personal record high</p>
          </div>

          <div className={`p-6 rounded-3xl border shadow-sm ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-gray-400">Study Streak</span>
              <div className={`p-2.5 rounded-xl ${isDarkMode ? 'bg-emerald-950/60 text-emerald-400' : 'bg-orange-50 text-orange-600'}`}>
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-black">3 Days</div>
            <p className="text-[11px] text-gray-400 mt-1">Active daily goal</p>
          </div>
        </div>

        {/* ─── GRAPH & RECENT ACTIVITY ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Performance Line Chart */}
          <div className={`lg:col-span-2 p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
                    Performance Trend
                  </h2>
                  <p className="text-xs text-gray-400">Your score trajectory over previous exams</p>
                </div>
              </div>

              {results.length > 0 ? (
                <div className="h-56 w-full flex items-end gap-3 pt-6 pb-2 px-2">
                  {results.slice(-7).map((res, index) => (
                    <div key={res.id || index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {res.score_percentage}%
                      </span>
                      <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-xl h-full flex items-end overflow-hidden p-1">
                        <div
                          className={`w-full rounded-lg transition-all duration-500 ${
                            isDarkMode ? 'bg-gradient-to-t from-emerald-600 to-teal-400' : 'bg-gradient-to-t from-indigo-600 to-blue-500'
                          }`}
                          style={{ height: `${res.score_percentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 truncate w-full text-center">
                        Test {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-56 w-full flex flex-col items-center justify-center text-center p-6 border border-dashed rounded-2xl border-gray-200 dark:border-slate-800">
                  <Sparkles className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-xs font-semibold text-gray-400">No test data logged yet.</p>
                  <button onClick={onOpenExams} className="mt-3 text-xs font-bold text-indigo-500 dark:text-emerald-400 flex items-center gap-1">
                    Take your first exam <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Exam Quick Launch */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-gray-100'
          }`}>
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2 mb-1">
                <Award className={`w-5 h-5 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
                Target Exam Series
              </h2>
              <p className="text-xs text-gray-400 mb-6">Ethiopian National Examinations (ESSLCE)</p>

              <div className="space-y-3">
                {['2017 Series', '2016 Series', '2015 Series'].map((series, i) => (
                  <div
                    key={series}
                    onClick={onOpenExams}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isDarkMode
                        ? 'border-slate-800 hover:bg-slate-800/60'
                        : 'border-gray-100 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <h3 className="text-xs font-bold">{series}</h3>
                      <p className="text-[10px] text-gray-400">Model & Past Papers</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenExams}
              className={`w-full mt-6 py-3 rounded-2xl text-white text-xs font-bold shadow-md transition ${
                isDarkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Browse Exam Catalog
            </button>
          </div>
        </div>

      </div>

      {/* ─── PROFILE EDIT MODAL ─── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-100 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Edit Student Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-red-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-400">Display Name</label>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none focus:ring-2 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 focus:ring-emerald-500' : 'bg-gray-50 border-gray-200 focus:ring-indigo-500'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 text-gray-400">Avatar Image URL</label>
                <input
                  type="url"
                  value={newAvatarUrl}
                  onChange={(e) => setNewAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none focus:ring-2 ${
                    isDarkMode ? 'bg-slate-800 border-slate-700 focus:ring-emerald-500' : 'bg-gray-50 border-gray-200 focus:ring-indigo-500'
                  }`}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                    isDarkMode ? 'border-slate-800 text-slate-300' : 'border-gray-200 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-md ${
                    isDarkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}