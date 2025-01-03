import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '../config/AxiosClient'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'

const Chat = () => {
    
    const navigate = useNavigate()
    const [contacts,setContacts] = useState([]) // array state of contacts, people that are in the DB apart from the current user
    const [currentUser,setCurrentUser] = useState(undefined) //state of current user
    const [currentChat,setCurrentChat] = useState(undefined) //state of current chat
    const [isLoaded,setIsLoaded] = useState(false) //flag state of the current user JSON

    useEffect(() => {
        const getCurrentUser = async () => {
            if(!localStorage.getItem('chat-app-user')){ // if there is no object in the local storage, go back to login page
                navigate('/')
            } else {
              setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user'))) // get the JSON object of the user in the local storage and add to the current user state
              setIsLoaded(true)
            }
        }
        getCurrentUser()
    },[])

    useEffect(() => {
        const getAllContacts = async () => {
            if(currentUser){
                if(currentUser.isAvatarImageSet){ // if the current user has set his avatar image, get all the user from the API
                    const data = await AxiosClient.get(`/users/allusers/${currentUser._id}`)
                    setContacts(data.data) // add the data to the array of contacts
                } else { // go back to set avatar page
                  navigate(`/setAvatar/${currentUser._id}`)
                }
            }
        }
        getAllContacts()
    },[currentUser])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }
    return(
        <div className='flex w-screen h-screen flex-col items-center bg-gray-800'>
          <div className='w-full h-full bg-gray-900 grid grid-cols-[25%_75%]'>
            <Contacts contacts={contacts} currentUser={currentUser} handleChatChange={handleChatChange} />
            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser}/> // if the current chat has not been selected show the welcome message
            ) : (
              <ChatContainer currentChat={currentChat} currentUser={currentUser}/> //show the chat container
            )}
          </div>
        </div>
    )
}
export default Chat