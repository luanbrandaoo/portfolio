import { useEffect } from 'react';
import Desktop from './components/desktop/desktop';
import Taskbar from './components/taskbar/taskbar';

export default function App() {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col select-none">
      <Desktop />
      <Taskbar />
    </div>
  );
}