import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Bookmark, Download, Play, BrainCircuit } from 'lucide-react';
import { MOCK_COURSES } from '../constants';

export const LessonDetailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [courseId, lessonId] = location.pathname.split('/').slice(-2);
  const course = MOCK_COURSES.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);

  if (!lesson) return <div className="p-6 text-center">Lesson not found</div>;

  return (
    <div className="pb-24">
      <div className="bg-black aspect-video relative">
        {lesson.videoUrl ? (
          <iframe 
            src={lesson.videoUrl} 
            className="w-full h-full" 
            allowFullScreen 
            title={lesson.title}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/40 flex-col gap-2">
            <Play className="w-12 h-12" />
            <span className="text-sm">Video content not available</span>
          </div>
        )}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-xl flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl mb-2">{lesson.title}</h1>
            <span className="text-sm text-gray-500">{course?.title}</span>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-500 leading-relaxed mb-8">
          <p>{lesson.content}</p>
        </div>

        <div className="bg-[#BCDEEC]/5 rounded-3xl p-6 border border-[#BCDEEC]/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#BCDEEC] rounded-xl flex items-center justify-center">
              <BrainCircuit className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Stuck on this lesson?</h3>
              <p className="text-xs text-gray-500">Ask our assistant for help</p>
            </div>
          </div>
          <Link to="/chat" className="block w-full text-center py-3 text-sm bg-[#BCDEEC] text-white rounded-xl font-bold hover:bg-[#BCDEEC]/90 transition-all">
            Ask Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};
