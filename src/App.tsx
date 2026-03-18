import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { BrainCircuit } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './pages/HomeScreen';
import { CourseListScreen } from './pages/CourseListScreen';
import { CourseDetailScreen } from './pages/CourseDetailScreen';
import { LessonDetailScreen } from './pages/LessonDetailScreen';
import { ChatScreen } from './pages/ChatScreen';
import { QuizScreen } from './pages/QuizScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { User } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bw_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('bw_user', JSON.stringify(updatedUser));
  };

  const handleLogin = () => {
    const newUser: User = {
      id: '1',
      name: 'Felix Scholar',
      email: 'felix@example.com',
      avatar: 'https://storage.googleapis.com/m-infra-ais-pre-assets/ddzqvtyiqqjqtdufs4j4q4/713132578163/78112591-956f-4796-9311-570a96933560.png',
      savedCourses: [],
      progress: {},
      studySessions: []
    };
    setUser(newUser);
    localStorage.setItem('bw_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bw_user');
  };

  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 md:pl-20">
        <AnimatePresence>
          {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
        </AnimatePresence>

        {!showSplash && (
          <>
            {!user ? (
              <div className="min-h-screen bg-[#BCDEEC] flex flex-col items-center justify-center p-6">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
                >
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-[#BCDEEC] rounded-2xl flex items-center justify-center mb-4">
                      <BrainCircuit className="text-white w-10 h-10" />
                    </div>
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-gray-500 text-sm">Sign in to continue learning</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#BCDEEC]/10" 
                      defaultValue="felix@example.com" 
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#BCDEEC]/10" 
                      defaultValue="password" 
                    />
                  </div>

                  <button 
                    onClick={handleLogin} 
                    className="w-full py-4 mb-4 bg-[#BCDEEC] text-white rounded-xl font-bold hover:bg-[#BCDEEC]/90 transition-all"
                  >
                    Sign In
                  </button>

                  <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-100"></div>
                    <span className="text-xs text-gray-400 font-medium">OR</span>
                    <div className="flex-1 h-px bg-gray-100"></div>
                  </div>

                  <button 
                    onClick={handleLogin} 
                    className="w-full py-4 rounded-xl border border-gray-200 flex items-center justify-center gap-3 font-semibold hover:bg-gray-50 transition-all"
                  >
                    <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                    Continue with Google
                  </button>
                </motion.div>
              </div>
            ) : (
              <>
                <Navbar />
                <main className="animate-in fade-in duration-500">
                  <Routes>
                    <Route path="/" element={<HomeScreen user={user} />} />
                    <Route path="/courses" element={<CourseListScreen />} />
                    <Route path="/course/:id" element={<CourseDetailScreen />} />
                    <Route path="/lesson/:courseId/:lessonId" element={<LessonDetailScreen />} />
                    <Route path="/chat" element={<ChatScreen />} />
                    <Route path="/quiz/:courseId" element={<QuizScreen />} />
                    <Route path="/profile" element={<ProfileScreen user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />} />
                  </Routes>
                </main>
              </>
            )}
          </>
        )}
      </div>
    </Router>
  );
}
