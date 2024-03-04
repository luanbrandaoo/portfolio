import { useState } from 'react'
import Taskbar from './components/taskbar'

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <main className="flex-grow">
        Main content
      </main>
      <Taskbar />
    </div>
  );
}