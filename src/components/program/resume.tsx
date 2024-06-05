import fileLogo from '../../assets/file.png'; 
import Window from '../window/window'; 

import {stateE} from '../programStore';

const Resume = () => {
  return (
    <Window programName={'Résumé'} icon={fileLogo}
      initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}}
      minimumSize={{width: 280, height: 150}}
      initialState={stateE.FOCUSED}>
        <span>Resume</span>
    </Window>
  );
}

export default Resume;
