import { useState } from "react"

const ChatInput = ({handleSendMsg}) => {

    const [msg,setMsg] = useState('') // state of messages

    const sendChat = (event) => {
        event.preventDefault()
        if(msg.length > 0) {
          handleSendMsg(msg) // the message is pass to the chat container in order to be sent to the DB through API
          setMsg('')
        }
    }
    return(
        <div className="grid grid-cols-[95%_5%] items-center bg-gray-400 p-1 ">
            <form className="w-full rounded-lg flex content-center gap-1 bg-gray-400"
                  onSubmit={(e)=>sendChat(e)}>
                <input className='w-full text-white text-md pl-1 bg-gray-400' 
                       type='text' 
                       placeholder="Type your message"
                       value={msg}      
                       onChange={(e)=>setMsg(e.target.value)} 
                />
                <input className='ml-8 rounded-md flex justify-center p-1 items-center bg-violet-400' value='Send' type='submit' />
            </form>
        </div>
    )
}
export default ChatInput