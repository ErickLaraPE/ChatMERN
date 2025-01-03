import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import axios from 'axios'
import AxiosClient from '../config/AxiosClient'
import loader from '../assets/loader.gif'
import {Buffer} from 'buffer'

const SetAvatar = () => {

    const navigate = useNavigate()
    const api = "https://api.multiavatar.com/45678945" //API for random image avatars
    const [avatars,setAvatars] = useState([])   // state for avatars image
    const [isLoading,setIsLoading]=useState(true)   //flag state for API of getting Avatars
    const [selectedAvatar,setSelectedAvatar] = useState(undefined) // state for selected Avatar
    const [alert,setAlert] = useState({}) // Alert if the user does not pick up an avatar image

    const {msg} = alert

    useEffect(() => {
        const getAvatars = async () => {
            const data = [] // empty array
            for(let i = 0; i < 4; i ++) {
                const image = await axios.get(`${api}/${Math.round(Math.random()*1000)}`) // image random from API random avatar
                const buffer = Buffer.from(image.data)  
                data.push(buffer.toString("base64")) // adding an image random avatar to the empty array
            }
            setAvatars(data) // set the random avatar images to the avatar state
            setIsLoading(false) // changing the state of the flag meaning that the API query has finished
        }
        getAvatars()
    },[])

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){ // there is no selected avatar image, show an alert
            setAlert({
                msg: 'You must pick a profile avatar to continue',
                error:true
            })
            setTimeout(()=>{
              setAlert({})
            },3000)
        } else {
            const user = await JSON.parse(localStorage.getItem('chat-app-user')) //get the json object of the local storage
            const {data} = await AxiosClient.post(`/users/setAvatar/${user._id}`,{ // update in the DB the image selected and receive the isSet and the image of the user
                image:avatars[selectedAvatar] // avatar where index is selectedAvatar
            })
            if(data.isSet){ // put the values updated in the json object of the local storage
                user.isAvatarImageSet = true 
                user.avatarImage = data.image
                localStorage.setItem('chat-app-user',JSON.stringify(user))
                navigate('/chat')
            }
        }
    }

    return(
        <>
            {isLoading? <div><img src={loader} alt='loader'/></div> : (
             <>
                {msg && <Alert alert={alert}/>}
                <h1 className='mt-20 mb-3 text-sky-600 text-center font-black uppercase text-xl'> Pick an avatar as your profile picture </h1>
                <div className='my-3 flex flex-row gap-4 justify-center'>
                    {avatars.map((avatar,index) => {
                      return(
                        <div key={index} className={`rounded-2xl border-4 border-solid p-1 flex justify-center items-center ${selectedAvatar === index ? "border-sky-600" : "border-transparent"}`}>
                            <img 
                               className='object-scale-down h-12 w-12'
                               src={`data:image/svg+xml;base64,${avatar}`} 
                               alt='avatar'
                               onClick={()=>setSelectedAvatar(index)}  />
                        </div>
                      )
                    })}
                </div>
                <button className='my-2 hover:bg-sky-800 w-full bg-sky-600 text-white p-2 uppercase rounded-lg text-xl font-bold' onClick={() => setProfilePicture()}>Set as profile picture</button>
             </>
            )}
        </>
    )
}

export default SetAvatar