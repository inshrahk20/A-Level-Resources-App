import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface StudyLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (session: any) => void;
}

export const StudyLogModal = ({ isOpen, onClose, onSave }: StudyLogModalProps) => {
  const [subject, setSubject] = useState('Mathematics');
  const [duration, setDuration] = useState('30');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Log Study Session</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Subject</label>
            <select 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#BCDEEC]/10"
            >
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Urdu</option>
              <option>Computer Science</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Duration (minutes)</label>
            <input 
              type="number" 
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#BCDEEC]/10"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Date</label>
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#BCDEEC]/10"
            />
          </div>
        </div>

        <button 
          onClick={() => {
            onSave({
              id: Math.random().toString(36).substr(2, 9),
              subject,
              durationMinutes: parseInt(duration),
              date: new Date(date).toISOString()
            });
            onClose();
          }}
          className="w-full py-4 font-bold bg-[#BCDEEC] text-white rounded-xl hover:bg-[#BCDEEC]/90 transition-all"
        >
          Save Session
        </button>
      </motion.div>
    </div>
  );
};
