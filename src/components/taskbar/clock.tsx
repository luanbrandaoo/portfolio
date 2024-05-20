import { useState, useEffect } from 'react';
import './taskbarComponents.css';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return (
        <div className="h-8 w-20 clock flex align-center justify-center">
            <span className="text-black font-ms font-thin text-clock mt-1 ml-1">{formattedTime}</span>
        </div>
    );
}

export default Clock;
