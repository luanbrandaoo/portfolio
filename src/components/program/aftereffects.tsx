import React, { useState, useEffect, useRef } from 'react';

import aftereffectsLogo from '../../assets/aftereffects.png'; 
import Window from '../window/window'; 

import {stateE} from '../programStore';
import YouTube from 'react-youtube';
import './programStyles.css'

const videos = [
  { title: 'Sample video 1', videoId: 'aqz-KE-bpKQ', duration: 635, fps: 30, size: '1920x1080', color: '#FF0000' },
  { title: 'Sample video 2', videoId: 'aqz-KE-bpKQ', duration: 635, fps: 30, size: '1920x1080', color: '#FF0000' },
];

const thumbnailLink = (videoId, resolution = 'default') => {
  return `https://img.youtube.com/vi/${videoId}/${resolution}.jpg`;
};

const CompElement = ({title, videoId, onClick}) => {
  return (
    <div className='flex flex-row gap-1.5 p-1 -mb-1' onClick={onClick}>
      <img src={thumbnailLink(videoId)} className="h-2.5 w-3.5 object-cover object-center" />
      <span className='font-ms font-normal text-mini text-white leading-3'>{title}</span>
    </div>
  );
}

const TimestampMini = ({time}) => {
  return (
    <div className='w-12 flex flex-row justify-center'>
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <span className='font-ms font-normal text-mini text-white leading-3'>{time}</span>
        <div className='w-px h-2 bg-white' />
      </div>
    </div>
  );
}

const ProjectWindow = () => {
  const [selected, setSelected] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const [timestamps, setTimestamps] = useState([]);
  const [currentTime, setCurrentTime] = useState('00:00:00:00');
  const [videoPercentage, setVideoPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const timestampline = useRef(null);
  const [timestamplineWidth, setTimestamplineWidth] = useState(0);

  useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setTimestamplineWidth(width);
        const numTimestamps = Math.floor(width / 40);
        const interval = selectedVideo.duration / numTimestamps;
        const newTimestamps = [];
        for (let i = 0; i <= numTimestamps; i++) {
          const seconds = Math.floor(i * interval);
          const minutes = Math.floor(seconds / 60);
          const remainingSeconds = seconds % 60;
          newTimestamps.push(`${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`);
        }
        setTimestamps(newTimestamps);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (timestampline.current) {
      resizeObserver.observe(timestampline.current);
    }

    return () => {
      if (timestampline.current) {
        resizeObserver.unobserve(timestampline.current);
      }
    };
  }, [timestampline, selectedVideo]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        const hours = Math.floor(currentTime / 3600);
        const minutes = Math.floor((currentTime % 3600) / 60);
        const seconds = Math.floor(currentTime % 60);
        const frames = Math.floor((currentTime % 1) * selectedVideo.fps);
        setCurrentTime(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`);
        
        const percentage = (currentTime / selectedVideo.duration);
        setVideoPercentage(percentage);
        console.log(percentage);
      }
    }, 1000 / selectedVideo.fps);

    return () => clearInterval(interval);
  }, [isPlaying, playerRef, selectedVideo]);

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    playerRef.current.addEventListener('onStateChange', (e) => {
      if (e.data === 1) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    });
  };

  const playerPosition = (timestamplineWidth-39)*videoPercentage;

  const videoOptions = {
    playerVars: {
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      fs: 0,
      iv_load_policy: 3,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div className='relative h-full w-full'>
      <div className='h-full w-full flex flex-col gap-1'>
        <div className='h-3/5 w-full flex flex-row gap-1'>
          <div
            className={`bg-aftereffects flex flex-col h-full w-1/5 ${selected === 0 ? 'shadow-[0_0_0_0.25rem_#a2790f]' : ''}`}
            onClick={() => setSelected(0)}>
            <div className='h-12 w-full'>
              <div className='flex flex-row gap-2 m-1'>
                <img src={thumbnailLink(selectedVideo.videoId)} className="h-8 w-8 object-cover object-center" />
                <div className='flex flex-col'>
                  <span className='font-ms font-semibold text-mini text-white leading-3'>{selectedVideo.title}</span>
                  <span className='font-ms font-light text-mini text-white leading-3'>{selectedVideo.size}</span>
                  <span className='font-ms font-light text-mini text-white leading-3'>{selectedVideo.fps} fps</span>
                </div>
              </div>
            </div>
            <div className='h-full w-full border-t-2 border-windowsilver'>
              {videos.map((video, index) => (
                <CompElement key={index} title={video.title} videoId={video.videoId} onClick={() => setSelectedVideo(videos[index])} />
              ))}
            </div>
          </div>
          <div
            className={`h-full w-3/5 ${selected === 1 ? 'shadow-[0_0_0_0.25rem_#a2790f]' : ''}`}
            onClick={() => setSelected(1)}>
            <div className='h-full w-full'>
              <YouTube videoId={selectedVideo.videoId} opts={videoOptions} onReady={onPlayerReady} className="youtube-video" iframeClassName="youtube-video" />
            </div>
          </div>
          <div
            className={`bg-aftereffects h-full w-1/5 ${selected === 2 ? 'shadow-[0_0_0_0.25rem_#a2790f]' : ''}`}
            onClick={() => setSelected(2)}>
          </div>
        </div>
        <div className={`h-2/5 w-full flex flex-row gap-1 ${selected === 3 ? 'shadow-[0_0_0_0.25rem_#a2790f]' : ''}`}
          onClick={() => setSelected(3)}>
          <div className='bg-aftereffects h-full w-1/5'>
            <div className='h-8 w-full border-b border-border2 flex justify-center pt-1'>
              <span className='font-ms font-semibold text-big text-afterorange'>{currentTime}</span>
            </div>
          </div>
          <div className='bg-aftereffects h-full w-4/5'>
            <div className='h-8 w-full border-b border-border2 flex flex-row' ref={timestampline}>
              <div className='h-8 w-full absolute pt-4' style={{paddingLeft: `${12+playerPosition}px`}}>
                <svg className="fill-current text-afterorange" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                  <path d="M3.62 1.213q-.29.29-.302.715l.006 7.981q0 .425.209.93.21.505.506.802l2.323 2.323a.97.97 0 0 0 .715.29q.425 0 .715-.29l2.323-2.323q.296-.296.505-.801c.209-.505.207-.645.204-.924l.006-7.993q0-.413-.296-.709-.29-.29-.715-.302l-5.49.006a.97.97 0 0 0-.709.296"/>
                </svg>
              </div>
              {timestamps.map((timestamp, index) => (
                <TimestampMini key={index} time={timestamp} />
              ))}
            </div>
            <div className='h-full w-full'>
              <div className='h-full w-px absolute bg-afterorange' style={{marginLeft: `${19+playerPosition}px`}}/>
              
            </div>
          </div>
        </div>
      </div>
      <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
        
      </div>
    </div>
  );
};

const WelcomePage = () => {

  return (
    <div className='w-1/2 aspect-square bg-aftereffects'>
      <div className='w-full h-16 bg-gradient-to-r from-purple-400 to-violet-500 p-2'>
        <h1 className='text-fuchsia-900 font-ms text-big'>AE</h1>
        <h2 className='text-fuchsia-900 font-ms text-clock -mt-1'>Adobe After Effects</h2>
      </div>
    </div>
  );
};

const Aftereffects = () => {
  return (
    <Window programName={'After Effects'} icon={aftereffectsLogo} 
      initialPosition={{x: 50, y: 50}} initialSize={{width: 700, height: 400}} 
      minimumSize={{width: 280, height: 150}}
      initialState={stateE.FOCUSED}>
      <div className='h-full w-full'> 
        <ProjectWindow />
      </div>
    </Window>
  );
}

export default Aftereffects;
