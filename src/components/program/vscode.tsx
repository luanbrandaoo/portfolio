import vscodeLogo from '../../assets/vscode.png'; 
import Window from '../window/window'; 

import {stateE} from '../programStore';

const VScode = () => {
  return (
    <Window programName={'VS Code'} icon={vscodeLogo} initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}} initialState={stateE.FOCUSED}>
        <span>VS Code</span>
    </Window>
  );
}

export default VScode;
