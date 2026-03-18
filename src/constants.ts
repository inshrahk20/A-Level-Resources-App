import { Course } from './types';

export const MOCK_COURSES: Course[] = [
  {
    id: 'al-maths',
    title: 'A Level Mathematics',
    description: 'Master calculus, algebra, and statistics for your A-level exams.',
    category: 'Mathematics',
    thumbnail: 'https://ais-pre-ddzqvtyiqqjqtdufs4j4q4-713132578163.asia-southeast1.run.app/input_file_3.png',
    lessons: [
      {
        id: 'm1',
        title: 'Differentiation',
        content: 'Differentiation is a method used to compute the rate at which a dependent variable changes with respect to the change in the independent variable.',
        duration: '18:00'
      },
      {
        id: 'm2',
        title: 'Integration',
        content: 'Integration is the reverse process of differentiation. It is used to find areas under curves and volumes of solids.',
        duration: '20:00'
      },
      {
        id: 'm3',
        title: 'Trigonometric Identities',
        content: 'Master the fundamental identities that relate the sides and angles of triangles.',
        duration: '15:00'
      }
    ]
  },
  {
    id: 'al-physics',
    title: 'A Level Physics',
    description: 'Deep dive into quantum physics, electromagnetism, and mechanics.',
    category: 'Physics',
    thumbnail: 'https://ais-pre-ddzqvtyiqqjqtdufs4j4q4-713132578163.asia-southeast1.run.app/input_file_1.png',
    lessons: [
      {
        id: 'ap1',
        title: 'Quantum Phenomena',
        content: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles.',
        duration: '22:00'
      },
      {
        id: 'ap2',
        title: 'Nuclear Physics',
        content: 'Explore the constituents and interactions of atomic nuclei.',
        duration: '18:00'
      },
      {
        id: 'ap3',
        title: 'Electromagnetic Induction',
        content: 'Learn how changing magnetic fields can induce electric currents.',
        duration: '20:00'
      }
    ]
  },
  {
    id: 'al-urdu',
    title: 'A Level Urdu',
    description: 'Explore Urdu literature, grammar, and advanced composition.',
    category: 'Urdu',
    thumbnail: 'https://ais-pre-ddzqvtyiqqjqtdufs4j4q4-713132578163.asia-southeast1.run.app/input_file_2.png',
    lessons: [
      {
        id: 'u1',
        title: 'Urdu Poetry Analysis',
        content: 'Learn how to analyze classical and modern Urdu poetry, focusing on metaphors and cultural context.',
        duration: '25:00'
      },
      {
        id: 'u2',
        title: 'Urdu Prose & Fiction',
        content: 'Study the evolution of Urdu prose from Dastan to modern short stories.',
        duration: '22:00'
      },
      {
        id: 'u3',
        title: 'Advanced Grammar',
        content: 'Master the nuances of Urdu grammar and syntax for formal writing.',
        duration: '20:00'
      }
    ]
  },
  {
    id: 'al-cs',
    title: 'A Level Computer Science',
    description: 'Learn algorithms, data structures, and computer architecture.',
    category: 'Computer Science',
    thumbnail: 'https://ais-pre-ddzqvtyiqqjqtdufs4j4q4-713132578163.asia-southeast1.run.app/input_file_0.png',
    lessons: [
      {
        id: 'cs1',
        title: 'Data Structures',
        content: 'In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification.',
        duration: '20:00'
      },
      {
        id: 'cs2',
        title: 'Algorithms & Complexity',
        content: 'Study Big O notation and common sorting/searching algorithms.',
        duration: '25:00'
      },
      {
        id: 'cs3',
        title: 'Computer Architecture',
        content: 'Understand how CPUs, memory, and I/O devices work together.',
        duration: '22:00'
      }
    ]
  }
];
