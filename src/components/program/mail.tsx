import mailLogo from '../../assets/mail.png'; 
import Window from '../window/window'; 

import {stateE} from '../programStore';

const Mail = () => {
  return (
    <Window programName={'Mail'} icon={mailLogo}
      initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}}
      minimumSize={{width: 280, height: 150}}
      initialState={stateE.FOCUSED}>
        <span>Mail</span>
    </Window>
  );
}

export default Mail;
