import LogOut from "./LogOut"
import ChatInput from "./ChatInput"
import { useState,useEffect } from "react"
import AxiosClient from "../config/AxiosClient"

const ChatContainer = ({currentChat,currentUser}) => {
    
    const [messages,setMessages] = useState([]) //state of messages

    useEffect(() => {
      const getMessages = async () => {
        const response = await AxiosClient.post(`/messages/getmsg/`,{ //get the messages from the API
              from:currentUser._id,
              to:currentChat._id
        })
        setMessages(response.data) // set the messages to the message state
      }
      getMessages()
    },[currentChat])

    const handleSendMsg = async (msg) => {
        await AxiosClient.post(`/messages/addmsg/`,{ //add the message to the DB using the API
             from:currentUser._id,
             to:currentChat._id,
             message:msg
        })
    }
    return(
        <>
          { currentChat && (
           <div className="pt-1 bg-gray-500">
            <div className="flex justify-between items-center p-0.5">
              <div className='gap-1 flex items-center'>
                 <img 
                   src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} 
                   className="h-8"
                   alt='avatar'
                 />
                 <h3 className="text-white text-md">{currentChat.name}</h3> 
              </div>
              <LogOut/>
            </div> 
            <div className="pt-4 pb-12 mb-60 flex flex-col gap-1 overflow-auto">
              {messages.map((message,index) => {
                return(
                  <div>
                      <div className={`flex items-center w-full p-1 text-sm  text-white ${message.fromSelf ? 'justify-end' : 'justify-start'}`} key={index}>
                          <p className={`p-2 rounded-lg ${message.fromSelf ? 'bg-violet-500' : 'bg-violet-900'}`}>
                              {message.message}
                          </p>
                      </div>
                  </div>
                )
              })}
            </div>
            <ChatInput handleSendMsg={handleSendMsg}/>
           </div>
          )}
        </>
    )
}
export default ChatContainer