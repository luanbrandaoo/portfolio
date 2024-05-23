import aftereffectsLogo from '../../assets/aftereffects.png'; 
import Window from '../window/window'; 

import {stateE} from '../programStore';

const Aftereffects = () => {
  return (
    <Window programName={'After Effects'} icon={aftereffectsLogo} initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}} initialState={stateE.FOCUSED}>
        <span>After Effects</span>
    </Window>
  );
}

export default Aftereffects;
