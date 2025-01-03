import Robot from '../assets/robot.gif'


const Welcome = ({currentUser}) => {

    return(
        <div className='flex flex-col justify-center items-center text-2xl text-white '>
            <img className='h-60' src={Robot} alt="Robot" />
            <h1>
                Welcome, <span className='text-sky-900 font-bold uppercase'>{currentUser.name}</span>
            </h1>
            <h3>Please select a chat to start messaging</h3>
        </div>
    )
}

export default Welcome