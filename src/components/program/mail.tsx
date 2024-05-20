import mailLogo from '../../assets/mail.png'; 
import Window from '../window/window'; 


const Mail = () => {
  return (
    <Window programName={'Mail'} icon={mailLogo}>
        <span>Mail</span>
    </Window>
  );
}

export default Mail;
