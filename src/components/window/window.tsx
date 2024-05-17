import React from 'react';

import './window.css';
import logo from '../../assets/folderwithfile.png';


const Janela = ({ children }) => {
  return (
    <div className="h-[32rem] w-[42rem] bg-silver window">
      <div className="h-9 w-auto titleBox bg-windowblue">
        <div className='flex flex-row gap-2 align-center'>
          <img src={logo} className="h-6"></img>
          <span className='text-white font-ms font-normal text-start'>Program name</span>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Janela;
