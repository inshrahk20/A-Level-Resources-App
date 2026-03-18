import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Play, BrainCircuit } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

export const CourseDetailScreen = () => {
  const { id } = useLocation().pathname.split('/').slice(-1)[0] as any;
  const course = MOCK_COURSES.find(c => c.id === id);
  const navigate = useNavigate();

  if (!course) return <div className="p-6 text-center">Course not found</div>;

  return (
    <div className="pb-24">
      <div className="relative h-64">
        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <span className="text-xs font-bold uppercase text-[#FFCBE1] mb-2 block">{course.category}</span>
          <h1 className="text-2xl mb-3">{course.title}</h1>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">{course.description}</p>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-[#BCDEEC] flex items-center justify-center text-[10px] text-white font-bold">
                +12
              </div>
            </div>
            <span className="text-xs text-gray-500 font-medium">Joined by 1.2k students</span>
          </div>

          <h2 className="text-lg mb-4">Course Content</h2>
          <div className="grid gap-3 mb-8">
            {course.lessons.map((lesson, idx) => (
              <Link 
                key={lesson.id} 
                to={`/lesson/${course.id}/${lesson.id}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all border border-transparent hover:border-[#BCDEEC]/10"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#BCDEEC] font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">{lesson.title}</h4>
                  <span className="text-[10px] text-gray-500">{lesson.duration}</span>
                </div>
                <Play className="w-5 h-5 text-[#BCDEEC]" />
              </Link>
            ))}
          </div>

          <div className="bg-[#FFCBE1]/5 border border-[#FFCBE1]/10 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-[#FFCBE1] rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-[#FFCBE1]/20">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold mb-2">Ready for a challenge?</h3>
            <p className="text-sm text-gray-500 mb-6">Test your knowledge with a quiz for this course.</p>
            <Link to={`/quiz/${course.id}`} className="bg-[#FFCBE1] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#FFCBE1]/90 transition-all">
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
