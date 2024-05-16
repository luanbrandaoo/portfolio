import { useState } from 'react'
import Desktop from './components/desktop/desktop'
import Taskbar from './components/taskbar/taskbar'


export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Desktop />
      <Taskbar />
    </div>
  );
}