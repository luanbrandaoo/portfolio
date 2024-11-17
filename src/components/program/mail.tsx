import mailLogo from '../../assets/mail.png'; 
import sendMail from '../../assets/sendmail.png';
import Window from '../window/window'; 
import './programStyles.css'

import {stateE} from '../programStore';

const Mail = () => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const from = (document.getElementById('from') as HTMLInputElement).value;
    const subject = (document.getElementById('subject') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    const userAgent = navigator.userAgent;

    let ip;
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ip = ipData.ip;
    } catch (error) {
      ip = `Error: ${error.message}`;
    }

    const metadata = `User Agent: ${userAgent}, IP: ${ip}`;

    const formData = new URLSearchParams();
    formData.append('entry.1569842579', from);
    formData.append('entry.748743113', subject);
    formData.append('entry.1472491415', message);
    formData.append('entry.1677656438', metadata);

    try {
      const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSf-5DWPvXNpe5vtJhIP-Ave6-YsQp-gh5_HOQsNQmwACkPM_A/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Window programName={'Mail'} icon={mailLogo}
      initialPosition={{x: 50, y: 50}} initialSize={{width: 500, height: 500}}
      minimumSize={{width: 280, height: 150}}
      initialState={stateE.FOCUSED}>
        <div className='flex flex-col p-0.5 gap-1 bg-silver w-full h-full'>
          <div className='flex flex-row gap-1.5'>
            <div className='flex flex-col gap-1 bg-silver w-full h-full'>
              <div className='flex flex-row gap-1.5'>
                <div className='h-8 min-w-20 button flex align-center justify-center'>
                  <span className="text-black font-ms font-normal text-start mt-1 ml-1">To:</span>
                </div>
                <div className='h-8 w-full input bg-white text-black font-ms flex align-center pt-1 pl-2'><u>Luan</u></div>
              </div>
              <div className='flex flex-row gap-1.5'>
                <div className='h-8 min-w-20 button flex align-center justify-center'>
                  <span className="text-black font-ms font-normal text-start mt-1 ml-1">From:</span>
                </div>
                <input id="from" className='h-8 w-full focus:outline-none input bg-white text-black font-ms pl-2' type="mail" />
              </div>
            </div>
            <button id="sendButton" className='h-16 min-w-16 send flex align-center justify-center' onClick={handleSubmit}>
            <img src={sendMail} className="h-8 mt-3" draggable="false"></img>
            </button>
          </div>
          <div className='flex flex-row gap-1.5'>
            <div className='h-8 min-w-20 flex align-center justify-center'>
              <span className="text-black font-ms font-normal text-start mt-1 ml-1">Subject:</span>
            </div>
            <input id="subject" className='h-8 w-full focus:outline-none text-top input bg-white text-black font-ms pl-2' type="text" />
          </div>
          <textarea id="message" className='h-full w-full resize-none focus:outline-none input p-1 pl-1.5 mt-1 bg-white text-black font-ms' />
        </div>
    </Window>
  );
}

export default Mail;
