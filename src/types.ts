export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'Physics' | 'Engineering' | 'Coding' | 'Mathematics' | 'Urdu' | 'Computer Science';
  thumbnail: string;
  lessons: Lesson[];
  progress?: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  duration: string;
  completed?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  savedCourses: string[];
  progress: Record<string, number>; // courseId -> progress percentage
  studySessions?: StudySession[];
}

export interface StudySession {
  id: string;
  subject: string;
  date: string; // ISO string
  durationMinutes: number;
  notes?: string;
}

export interface StudyEvent {
  id: string;
  title: string;
  date: string; // ISO string
  type: 'session' | 'deadline' | 'reminder';
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  questions: Question[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
