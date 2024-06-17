import './startMenu.css';

const ProgramStart = ({programName, logo}) => {

    return (
        <div className='h-[54px] w-full flex pl-4 items-center text-black hover:bg-windowblue hover:text-white'>
            <img src={logo} className={'h-10'} draggable="false"></img>
            <span className='ml-2 pb-1 font-ms font-light text-start'>{programName}</span>
        </div>
    );
};

export default ProgramStart;
