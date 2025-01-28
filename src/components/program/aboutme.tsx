import aboutmeLogo from '../../assets/aboutme.png';
import profileImage from '../../assets/profile.jpeg';

import Window from '../window/window'; 

import {stateE} from '../programStore';

const AboutMe = () => {
  return (
    <Window programName={'About Me'} icon={aboutmeLogo}
    initialPosition={{x: 100, y: 50}} initialSize={{width: 500, height: 500}}
    minimumSize={{width: 280, height: 150}}
    initialState={stateE.FOCUSED}>
        <div className="h-full w-full bg-silver flex flex-col gap-4 p-2 overflow-auto">
          <div className='flex flex-row'>
            <img src={profileImage} className="w-40 h-40 rounded-full"/>
            <div className="flex flex-col justify-center ml-4">
              <h1 className="font-ms text-black font-medium text-title">Luan Brandão</h1>
              <h2 className="font-ms text-black font-medium">Software Developer</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" className="h-6"/>
                <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" className="h-6"/>
                <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" className="h-6"/>
                <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++" className="h-6"/>
                <img src="https://img.shields.io/badge/Embedded_Systems-009688?style=for-the-badge&logo=arduino&logoColor=white" alt="Embedded Systems" className="h-6"/>
                <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" className="h-6"/>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-ms text-black font-medium text-title">📂 Projects</h1>
            <ul className="ml-6 space-y-2">
              <li className="flex items-center space-x-2">
                <span>🤖</span>
                <h2 className="font-ms text-black font-medium">Byte: An interactive autonomous robot</h2>
                <svg
                  className="w-4 h-4 text-black -ml-0.5 cursor-pointer"
                  fill="black"
                  viewBox="0 0 24 24"
                  onClick={() => window.open('https://github.com/luanbrandaoo/byte-robot', '_blank')}>
                  <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z" />
                  <path d="M5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z" />
                </svg>
              </li>
              <h2 className="font-ms text-black font-medium ml-4">🏆 MOSFCET 2023 Engineering Winner</h2>
              <li className="flex items-center space-x-2">
                <span>🖥️</span>
                <h2 className="font-ms text-black font-medium">Win95 Portfolio</h2>
                <svg
                  className="w-4 h-4 text-black -ml-0.5 cursor-pointer"
                  fill="black"
                  viewBox="0 0 24 24"
                  onClick={() => window.open('https://github.com/luanbrandaoo/portfolio', '_blank')}>
                  <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3z" />
                  <path d="M5 5h4V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4h-2v4H5V5z" />
                </svg>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="font-ms text-black font-medium text-title">🎓 Education</h1>
            <h2 className="font-ms text-black font-medium ml-6">🧑‍🎓 Exact Sciences / Computer Science</h2>
            <h3 className="font-ms text-black font-medium ml-10">🏫 Federal University of Juiz de Fora (UFJF)</h3>
          </div>
        </div>
    </Window>
  );
}

export default AboutMe;
