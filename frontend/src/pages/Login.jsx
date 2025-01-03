import { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import AxiosClient from "../config/AxiosClient"
import Alert from "../components/Alert"
import logo from '../assets/logo.svg'

const Login = () => {

    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [alert,setAlert] = useState({})

    useEffect(() => {
        const getUser = async () =>{
            const user = localStorage.getItem('chat-app-user')
            if(user){
                const dataUser = await JSON.parse(user)
                navigate(`/setAvatar/${dataUser._id}`)
            }
        }
        getUser()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([email,password].includes('')){
            setAlert({
                msg:"All fields must be filled!!!",
                error:true
            })
            return
        }
        setAlert({})
        try{
            const {data} = await AxiosClient.post(`/users/login`,{email,password})
            setAlert({})
            localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            navigate(`/setAvatar/${data.user._id}`)
        }catch(error){
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(()=>{
                setAlert({})
            },3000)
        }
    }

    const {msg} = alert

    return(
        <>  
            <div className='flex flex-row justify-center items-center'>
                <img className='object-scale-down h-12 w-12 mx-2' src={logo} alt='logo'/>
                <h1 className='text-sky-600 text-center font-black uppercase text-6xl'>SNAPPY</h1>
            </div>
             {msg && <Alert alert={alert}/>}
            <form className='my-10 bg-white shadow rounded-lg px-10 py-5 ' onSubmit={handleSubmit}>
                <div className='my-5'>
                    <label className='text-gray-600 uppercase font-bold text-xl block' htmlFor='email'>Email:</label>
                    <input className='w-full mt-3 p-3 border bg-gray-50 rounded-xl' id='email' type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email} />
                </div>  
                <div className='my-5'>
                    <label className='text-gray-600 uppercase font-bold text-xl block' htmlFor='password'>Password:</label>
                    <input className='w-full mt-3 p-3 border bg-gray-50 rounded-xl' id='password' type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div> 
                <input className=' w-full bg-sky-600 text-white p-2 uppercase rounded-lg text-xl font-bold' type='submit' value='Log In'/> 
            </form>
            <nav className='block text-center'>
                <Link className='text-sky-600 uppercase text-md'to='register'> Don't have an account? Register here
                </Link>
            </nav>
        </>
    )
}

export default Login