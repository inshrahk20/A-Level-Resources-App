# A-Level Study Hub

A modern mobile-first education platform designed for A-level students. Features include course tracking, interactive lessons, and an AI-powered study assistant.

## Features

- **Course Management**: Browse and track progress across various A-level subjects.
- **Interactive Lessons**: Access video content and detailed study materials.
- **AI Assistant (Incha)**: Get instant help with complex topics using the integrated Gemini-powered chat.
- **AI Quizzes**: Test your knowledge with dynamically generated quizzes for each course.
- **Study Log**: Track your study sessions with a built-in calendar and streak system.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API (@google/genai)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/a-level-study-hub.git
   cd a-level-study-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/components`: Reusable UI components.
- `src/services`: API integrations and external services.
- `src/types.ts`: TypeScript interfaces and types.
- `src/constants.ts`: Mock data and application constants.
- `public`: Static assets and PWA configuration.

## License

MIT
