import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CourseListScreen = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Physics', 'Mathematics', 'Urdu', 'Computer Science'];

  const filteredCourses = filter === 'All' 
    ? MOCK_COURSES 
    : MOCK_COURSES.filter(c => c.category === filter);

  return (
    <div className="pb-24 pt-6 px-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-6">Explore Courses</h1>
      
      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              filter === cat ? "bg-[#BCDEEC] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredCourses.map(course => (
          <Link key={course.id} to={`/course/${course.id}`} className="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <img src={course.thumbnail} alt={course.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" referrerPolicy="no-referrer" />
            <div className="flex flex-col justify-center py-1">
              <span className="text-[10px] font-bold uppercase text-[#FFCBE1] mb-1">{course.category}</span>
              <h3 className="text-base mb-1 line-clamp-1">{course.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{course.description}</p>
              <div className="flex items-center gap-2 mt-auto">
                <BookOpen className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] text-gray-400 font-medium">{course.lessons.length} Lessons</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
