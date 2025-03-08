# Task Tracker

A React application for efficient task management with advanced features.

## Tech Stack

- **React.js** - UI components
- **Redux/Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **@hello-pangea/dnd** - Drag and drop functionality
- **Lucide React** - Icons
- **Vite** - Build tool

## Features Implemented

- **Task Management** - Create, edit, delete tasks
- **Status Tracking** - Toggle task completion
- **Filtering** - Filter by status (all/active/completed) or category  
- **Search** - Find tasks by title or category
- **Drag & Drop** - Reorder tasks with drag and drop
- **Statistics** - View task completion metrics
- **Responsive Design** - Works on mobile and desktop
- **Dark/Light Mode** - Theme toggle
- **Persistence** - Tasks saved to localStorage

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # UI components
├── redux/           # Redux store and slices
│   ├── store.js     
│   ├── taskSlice.js 
│   └── toggleMode.js
├── App.jsx          
└── TaskPage.jsx     # Main task page
```

## How to Run

```
npm install
npm run dev
```