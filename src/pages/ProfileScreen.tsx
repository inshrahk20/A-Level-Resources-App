import { useState } from 'react';
import { Settings, Plus, ChevronLeft, Clock } from 'lucide-react';
import { User } from '../types';
import { StudyLogModal } from '../components/StudyLogModal';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ProfileScreen = ({ user, onLogout, onUpdateUser }: { user: User, onLogout: () => void, onUpdateUser: (user: User) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSaveSession = (session: any) => {
    const updatedUser = {
      ...user,
      studySessions: [...(user.studySessions || []), session]
    };
    onUpdateUser(updatedUser);
  };

  const sessions = user.studySessions || [];
  
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const hasSession = (day: number) => {
    return sessions.some(s => {
      const d = new Date(s.date);
      return d.getDate() === day && d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
    });
  };

  return (
    <div className="pb-24 pt-6 px-6 max-w-4xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden">
            <img src={user.avatar} alt="Profile" referrerPolicy="no-referrer" />
          </div>
          <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#FFCBE1] text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <Settings className="w-4 h-4" />
          </button>
        </div>
        <h1 className="text-2xl">{user.name}</h1>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Streak', value: '12', icon: '🔥' },
          { label: 'Study Hrs', value: (sessions.reduce((acc, s) => acc + s.durationMinutes, 0) / 60).toFixed(1), icon: '⏱️' },
          { label: 'Badges', value: '8', icon: '🏆' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-2xl border border-gray-100 text-center shadow-sm">
            <span className="text-2xl mb-1 block">{stat.icon}</span>
            <span className="text-lg font-bold block">{stat.value}</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">Study Calendar</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-[#BCDEEC]/10 text-[#BCDEEC] px-4 py-2 rounded-xl text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
            Log Session
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">
              {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() - 1)))}
                className="p-2 hover:bg-gray-50 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setSelectedDate(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)))}
                className="p-2 hover:bg-gray-50 rounded-lg rotate-180"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-center text-[10px] font-bold text-gray-400 uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[...padding, ...days].map((day, i) => (
              <div 
                key={i} 
                className={cn(
                  "aspect-square flex items-center justify-center rounded-xl text-xs font-medium relative",
                  day ? "hover:bg-gray-50 cursor-pointer" : "",
                  day && hasSession(day) ? "bg-[#BCDEEC]/10 text-[#BCDEEC] font-bold" : "text-gray-600"
                )}
              >
                {day}
                {day && hasSession(day) && (
                  <div className="absolute bottom-1 w-1 h-1 bg-[#BCDEEC] rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg mb-4">Recent Sessions</h2>
        <div className="space-y-3">
          {sessions.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
              <Clock className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No study sessions logged yet.</p>
            </div>
          ) : (
            [...sessions].reverse().slice(0, 5).map(session => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-lg">
                    {session.subject === 'Mathematics' ? '🔢' : session.subject === 'Physics' ? '⚛️' : session.subject === 'Urdu' ? '✍️' : '💻'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{session.subject}</h4>
                    <p className="text-[10px] text-gray-400">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#BCDEEC]">{session.durationMinutes}m</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <button 
        onClick={onLogout}
        className="w-full py-4 rounded-2xl bg-red-50 text-red-500 font-bold hover:bg-red-100 transition-all"
      >
        Log Out
      </button>

      <StudyLogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveSession} 
      />
    </div>
  );
};
