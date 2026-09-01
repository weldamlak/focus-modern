'use client'

<<<<<<< HEAD
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
=======
import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'
import Footer from './Footer'
import {
  GraduationCap,
  BookOpen,
  User as UserIcon,
  LogOut,
  RefreshCw,
  Pencil,
  Upload,
  X,
  Check,
  ArrowRight,
  Settings,
  Home,
  Sun,
  Moon,
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
} from 'lucide-react'

interface DashboardProps {
  user: User
<<<<<<< HEAD
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
=======
  isDarkMode?: boolean
  onToggleDarkMode?: () => void
  onSignOut: () => void
  onOpenExams: () => void
  onGoHome: () => void
  onSwitchAccount?: () => void
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
}

export default function Dashboard({
  user,
<<<<<<< HEAD
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
=======
  isDarkMode = false,
  onToggleDarkMode,
  onSignOut,
  onOpenExams,
  onGoHome,
  onSwitchAccount,
}: DashboardProps) {
  // Extract User Metadata
  const currentAvatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || ''
  const currentName = user.user_metadata?.full_name || user.user_metadata?.name || 'Student'
  const email = user.email || ''

  // State Management
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(currentName)
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Upload Local Image File to Supabase Storage Bucket ('avatars')
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setMessage(null)

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Please select an image file to upload.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true })

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName)

      // Add cache buster timestamp to ensure live UI preview updates
      const updatedUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`
      setAvatarUrl(updatedUrl)
      setMessage({ type: 'success', text: 'Image uploaded! Click "Save Changes" to apply.' })
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error uploading file' })
    } finally {
      setUploading(false)
    }
  }

  // Update Profile Metadata via Supabase Auth
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        avatar_url: avatarUrl,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      await supabase.auth.refreshSession()
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
    }
    setLoading(false)
  }

  const handleSwitchAccount = () => {
    if (onSwitchAccount) {
      onSwitchAccount()
    } else {
      onSignOut()
    }
  }

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      <div>
        {/* Navigation Navbar */}
        <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
            
            <div className="flex items-center gap-4 sm:gap-6">
              <button onClick={onGoHome} className="flex items-center gap-2 text-xl sm:text-2xl font-black">
                <GraduationCap className={`w-7 h-7 ${isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}`} />
                <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>FOCUS <span className={isDarkMode ? 'text-emerald-400' : 'text-indigo-600'}>2018</span></span>
              </button>

              <nav className={`hidden sm:flex items-center gap-1 p-1 rounded-full text-xs font-semibold ${
                isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}>
                <button 
                  onClick={onGoHome} 
                  className={`px-4 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                    isDarkMode ? 'hover:bg-slate-700 hover:text-white' : 'hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Home</span>
                </button>
                <button 
                  onClick={onOpenExams} 
                  className={`px-4 py-1.5 rounded-full transition flex items-center gap-1.5 ${
                    isDarkMode ? 'hover:bg-slate-700 hover:text-white' : 'hover:bg-white hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Exams Hub</span>
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle Button */}
              {onToggleDarkMode && (
                <button
                  onClick={onToggleDarkMode}
                  className={`p-2 rounded-xl transition ${
                    isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title="Toggle Mode"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* User Avatar */}
              <div className={`flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 sm:border-l ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt={fullName} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 object-cover shadow-sm" />
                ) : (
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full font-bold flex items-center justify-center text-sm shadow-sm ${
                    isDarkMode ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-600 text-white'
                  }`}>
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className={`text-sm font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{fullName}</p>
                  <p className="text-xs text-slate-500 leading-tight truncate max-w-[120px]">{email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleSwitchAccount}
                className={`p-2 sm:px-3.5 sm:py-2 font-medium rounded-xl text-xs transition flex items-center justify-center ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title="Switch Account"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline ml-1.5">Switch</span>
              </button>

              <button
                onClick={onSignOut}
                className={`p-2 sm:px-4 sm:py-2 font-medium rounded-xl text-xs transition flex items-center justify-center ${
                  isDarkMode ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline ml-1.5">Sign Out</span>
              </button>
            </div>

          </div>
        </header>

        {/* Main Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">

          {/* User Hero Banner */}
          <div className={`p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left transition-colors ${
            isDarkMode 
              ? 'bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 border border-emerald-500/20 text-white' 
              : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white'
          }`}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
              
              <div className="relative group flex-shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={fullName} className="w-20 h-20 rounded-2xl border-2 border-white/40 shadow-md object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-white/20 border-2 border-white/40 font-bold flex items-center justify-center text-3xl shadow-md">
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute -bottom-1 -right-1 bg-white text-slate-900 p-2 rounded-full shadow-md hover:scale-110 transition"
                  title="Edit Photo"
                >
                  <Pencil className="w-3 h-3 text-indigo-600" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">{fullName}</h1>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-medium transition backdrop-blur-sm flex items-center gap-1"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>
                <p className="opacity-80 text-xs sm:text-sm truncate max-w-xs">{email}</p>
              </div>

            </div>

            <button
              onClick={onOpenExams}
              className={`w-full sm:w-auto px-6 py-3.5 font-bold rounded-2xl shadow-lg transition text-sm flex items-center justify-center gap-2 active:scale-95 ${
                isDarkMode 
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950' 
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Launch Exam Center</span>
            </button>
          </div>

          {/* Alert Message */}
          {message && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm font-semibold border flex items-center gap-2 ${
              message.type === 'success'
                ? isDarkMode ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isDarkMode ? 'bg-rose-950/60 text-rose-300 border-rose-800' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>{message.text}</span>
            </div>
          )}

          {/* Profile Edit Collapsible Section */}
          {isEditing && (
            <div className={`p-5 sm:p-8 rounded-3xl shadow-sm border space-y-6 ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className={`flex items-center justify-between border-b pb-4 ${
                isDarkMode ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <UserIcon className={isDarkMode ? 'text-emerald-400' : 'text-indigo-600'} />
                  <span>Edit Profile</span>
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className={`p-1.5 rounded-lg transition ${
                    isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-5 max-w-xl">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 focus:ring-emerald-500 text-white' 
                        : 'bg-white border-slate-200 focus:ring-indigo-500 text-slate-900'
                    }`}
                    placeholder="Enter your display name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
                    Profile Picture
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label className={`flex items-center justify-center gap-2 px-4 py-3 border rounded-xl cursor-pointer text-xs font-semibold transition active:scale-95 ${
                      isDarkMode 
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-900/40' 
                        : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
                    }`}>
                      <Upload className="w-4 h-4" />
                      <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                    {avatarUrl && (
                      <span className="text-xs text-slate-400 text-center sm:text-left truncate">
                        Custom avatar selected
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading || uploading}
                    className={`flex-1 sm:flex-none px-6 py-3 font-semibold rounded-xl text-xs transition disabled:opacity-50 ${
                      isDarkMode ? 'bg-emerald-500 hover:bg-emerald-600 text-slate-950' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className={`flex-1 sm:flex-none px-6 py-3 font-semibold rounded-xl text-xs transition ${
                      isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cards Hub Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Exam Center Card */}
            <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4 flex flex-col justify-between transition-colors ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? 'bg-emerald-950 text-emerald-400' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Exam Center</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Access your Supabase-backed question bank and practice exams.
                </p>
              </div>
              <button
                onClick={onOpenExams}
                className={`w-full py-2.5 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 ${
                  isDarkMode 
                    ? 'bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-400' 
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600'
                }`}
              >
                <span>Start Practice</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Account Switcher Card */}
            <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4 flex flex-col justify-between transition-colors ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Account Switcher</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Log out and sign in with a different account to start fresh.
                </p>
              </div>
              <button
                onClick={handleSwitchAccount}
                className={`w-full py-2.5 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>Switch Account</span>
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Settings Card */}
            <div className={`p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4 flex flex-col justify-between sm:col-span-2 md:col-span-1 transition-colors ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="space-y-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Settings className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Profile Details</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload custom avatars from your phone or update your display name.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`w-full py-2.5 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>Edit Profile</span>
                <Pencil className="w-4 h-4" />
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* Embedded Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  )
>>>>>>> 05b4a5e2156bc4b5936f8014f7afc0c5d0586506
}