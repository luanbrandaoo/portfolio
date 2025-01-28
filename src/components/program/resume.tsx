import fileLogo from '../../assets/file.png'; 
import Window from '../window/window'; 

import {stateE} from '../programStore';

const Resume = () => {
  return (
    <Window programName={'Resume'} icon={fileLogo}
      initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}}
      minimumSize={{width: 280, height: 150}}
      initialState={stateE.FOCUSED}>
        <div className='w-full h-full'>
          <iframe
          className='w-full h-full'
          src="https://drive.google.com/file/d/1h0kv1zuTRvcGm5SnyI6RwxsHexgGgoLw/preview"
          allow="autoplay"></iframe>
        </div>
    </Window>
  );
}

export default Resume;
