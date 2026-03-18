import { Link } from 'react-router-dom';
import { Search, BrainCircuit } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { User } from '../types';

export const HomeScreen = ({ user }: { user: User }) => {
  return (
    <div className="pb-24 pt-6 px-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl">Hello, Scholar!</h1>
          <p className="text-gray-500">Ready to learn something new today?</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
          <img src={user.avatar} alt="Avatar" referrerPolicy="no-referrer" />
        </div>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search courses, topics..." 
          className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#BCDEEC]/10 outline-none"
        />
      </div>

      <section className="mb-8">
        <div className="bg-[#BCDEEC] rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl mb-2">Assistant</h2>
            <p className="text-white/80 text-sm mb-4 max-w-[200px]">Got a tough question? Ask our assistant!</p>
            <Link to="/chat" className="inline-block bg-[#FFCBE1] text-white px-6 py-2 rounded-xl text-sm font-semibold">
              Try Now
            </Link>
          </div>
          <BrainCircuit className="absolute -right-8 -bottom-8 w-40 h-40 text-white/10" />
        </div>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">Recommended Courses</h2>
          <Link to="/courses" className="text-[#BCDEEC] text-sm font-semibold">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {MOCK_COURSES.map(course => (
            <Link key={course.id} to={`/course/${course.id}`} className="min-w-[280px] group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all group-hover:shadow-md">
                <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFCBE1] mb-1 block">{course.category}</span>
                  <h3 className="text-base mb-1 line-clamp-1">{course.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#BCDEEC]" style={{ width: '0%' }}></div>
                    </div>
                    <span className="text-[10px] font-medium text-gray-500">0%</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-12 pt-8 border-t border-gray-100 text-center">
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Developed by Inshrah</p>
      </footer>
    </div>
  );
};
