import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { Question } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'What is the primary focus of this course?',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correctAnswer: 0
  },
  {
    id: 'q2',
    question: 'Which concept is most important in this module?',
    options: ['Concept 1', 'Concept 2', 'Concept 3', 'Concept 4'],
    correctAnswer: 1
  },
  {
    id: 'q3',
    question: 'How would you apply this theory in practice?',
    options: ['Method X', 'Method Y', 'Method Z', 'Method W'],
    correctAnswer: 2
  }
];

export const QuizScreen = () => {
  const { courseId } = useLocation().pathname.split('/').slice(-1)[0] as any;
  const course = MOCK_COURSES.find(c => c.id === courseId);
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (course) {
      const timer = setTimeout(() => {
        setQuestions(MOCK_QUESTIONS);
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [course]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-20 h-20 bg-[#FFCBE1]/10 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
          <BookOpen className="text-[#FFCBE1] w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold mb-2">Preparing Your Quiz...</h2>
        <p className="text-gray-500 text-center max-w-xs">Getting your questions ready based on the course content.</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="text-emerald-500 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
        <p className="text-gray-500 mb-8">You scored {score} out of {questions.length}</p>
        
        <div className="w-full max-w-xs space-y-3">
          <button 
            onClick={() => navigate(`/course/${courseId}`)}
            className="w-full py-4 bg-[#BCDEEC] text-white rounded-xl font-bold hover:bg-[#BCDEEC]/90 transition-all"
          >
            Back to Course
          </button>
          <button 
            onClick={() => {
              setIsLoading(true);
              setShowResult(false);
              setCurrentIdx(0);
              setScore(0);
              setTimeout(() => {
                setQuestions(MOCK_QUESTIONS);
                setIsLoading(false);
              }, 1500);
            }}
            className="w-full py-4 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-all"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  const handleNext = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pl-20">
      <header className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-400">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold uppercase tracking-widest text-[#FFCBE1]">Quiz</h1>
          <p className="text-[10px] text-gray-500 font-medium">Question {currentIdx + 1} of {questions.length}</p>
        </div>
        <div className="w-6"></div>
      </header>

      <div className="px-6 py-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold mb-6 leading-relaxed">
            {currentQuestion?.question}
          </h2>
          
          <div className="grid gap-3">
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={cn(
                  "w-full p-4 rounded-2xl text-left text-sm transition-all border-2",
                  selectedOption === idx 
                    ? "bg-[#BCDEEC]/5 border-[#BCDEEC] text-[#BCDEEC] font-semibold" 
                    : "bg-white border-gray-100 text-gray-800 hover:border-gray-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold",
                    selectedOption === idx ? "border-[#BCDEEC] bg-[#BCDEEC] text-white" : "border-gray-200 text-gray-400"
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="w-full py-4 bg-[#BCDEEC] text-white rounded-xl font-bold hover:bg-[#BCDEEC]/90 transition-all disabled:opacity-50 disabled:grayscale"
        >
          {currentIdx === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};
