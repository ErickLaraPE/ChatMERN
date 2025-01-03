import { useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosClient from '../config/AxiosClient'
import Alert from '../components/Alert'
import logo from '../assets/logo.svg'

const Register = () => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [alert,setAlert] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([name,email,password,confirmPassword].includes('')){
            setAlert({
                msg:'All fields must be filled!!!',
                error: true,
            })
            return
        }
        if(password !== confirmPassword){
            setAlert({
                msg:'Passwords entered must be the same!!!',
                error: true,
            })
            return
        }
        if(password.length < 6) {
            setAlert({
                msg:'Password is too short, add at least 6 characters',
                error:true
            })
            return
        }
        setAlert({})
        try {
              const {data} = await AxiosClient.post(`/users`,{name,email,password})
              setAlert({
                msg:data.msg,
                error:false
              })
              setName('')
              setEmail('')
              setPassword('')
              setConfirmPassword('')
              setTimeout(()=>{
                setAlert({})
              },3000)
        } catch(error){
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
            <form className='my-10 bg-white shadow rounded-lg px-10 py-5' onSubmit={handleSubmit}>
                <div className='my-5'>
                    <label className='text-gray-600 uppercase font-bold block text-xl' htmlFor='name'>Name:</label>
                    <input className=' w-full mt-3 p-3 border rounded-xl bg-gray-50' id='name' type='text' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name} />
                </div>  
                <div className='my-5'>
                    <label className='text-gray-600 uppercase font-bold block text-xl' htmlFor='email'>Email:</label>
                    <input className='w-full mt-3 p-3 border rounded-xl bg-gray-50' id='email' type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>  
                <div className='my-5'>
                    <label className='text-gray-600 uppercase font-bold block text-xl' htmlFor='password'>Password:</label>
                    <input className='w-full mt-3 p-3 border rounded-xl bg-gray-50' id='password' type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div>  
                <div className='my-5'>
                    <label className='text-gray-600 uppercase font-bold block text-xl' htmlFor='confirmPassword'>Confirm Password:</label>
                    <input className='w-full mt-3 p-3 border rounded-xl bg-gray-50' id='confirmPassword' type='password' placeholder='Confirm your password' onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
                </div>  
                <input className='w-full bg-sky-600 p-2 text-white uppercase rounded-lg text-xl font-bold' type='submit' value='Create User'/>
            </form>  
            <nav className='text-center block'>
                <Link className='text-sky-600 uppercase text-md' to='/'> Already have an account? Log in 
                </Link>
            </nav>
        </>
    )
}

export default Register