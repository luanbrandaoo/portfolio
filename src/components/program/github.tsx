import githubLogo from '../../assets/github.png'; 
import Window from '../window/window'; 

import {stateE} from '../programStore';

const Github = () => {
  return (
    <Window programName={'Github'} icon={githubLogo} 
      initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}} 
      minimumSize={{width: 280, height: 150}}
      initialState={stateE.FOCUSED}>
        <span>Github</span>
    </Window>
  );
}

export default Github;
