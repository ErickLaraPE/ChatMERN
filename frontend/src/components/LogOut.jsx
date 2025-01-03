
import { useNavigate } from "react-router-dom"

const LogOut = () => {

    const navigate = useNavigate()
    const handleClick = async ()=>{
        localStorage.clear()
        navigate('/')
    }
    return(
        <div className="flex justify-center items-center rounded-lg mr-2 bg-red-500 cursor-pointer">
            <button className='p-1.5 hover:bg-red-900 rounded-lg text-white' onClick={handleClick}>X</button>
        </div>
    )
}

export default LogOut