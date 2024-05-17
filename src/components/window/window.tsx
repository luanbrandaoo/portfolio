import React from 'react';

import './window.css';
import logo from '../../assets/folderwithfile.png';


const Janela = ({ children }) => {
  return (
    <div className="h-[32rem] w-[42rem] bg-silver window">
      <div className="h-9 w-auto titleBox bg-windowblue flex flex-row justify-between">
        <div className='flex flex-row gap-2 align-center'>
          <img src={logo} className="h-6"></img>
          <span className='text-white font-ms font-normal text-start'>Program name</span>
        </div>
        <div className='flex flex-row gap-1 align-center m-px'>
          <div className='bg-silver h-6 w-6 windowButtons flex align-center justify-center'>
            <span className='text-black font-ms font-black text-window -m-1'>_</span>
          </div>
          <div className='bg-silver h-6 w-6 windowButtons flex align-center justify-center'>
            <div className='border-black border-2 border-t-4 h-3 w-3 m-1'></div>
          </div>
          <div className='bg-silver h-6 w-6 windowButtons flex align-center justify-center'>
            <span className='text-black font-ms font-black text-window -m-px'>X</span>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Janela;
