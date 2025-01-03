import { useState,useEffect } from "react"
import logo from '../assets/logo.svg'
const Contacts = ({contacts,currentUser,handleChatChange}) => {

    const [currentName,setCurrentName] = useState(undefined) // state of the current user name
    const [currentUserImage,setCurrentUserImage] = useState(undefined) // state of the current user image
    const [currentSelected,setCurrentSelected] = useState(undefined) // state for changing style depending on index of contact selected

    useEffect(() => {
        if(currentUser){
            setCurrentName(currentUser.name)
            setCurrentUserImage(currentUser.avatarImage)
        }
    },[currentUser])

    const changeCurrentChat = (index,contact) => {
        setCurrentSelected(index)// set the index of the contact selected
        handleChatChange(contact) // pass the contact obj of the contact selected
    }
    return(
        <>
            {currentUserImage && currentName && (
                <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-violet-950">
                  <div className="flex justify-center items-center gap-1">
                    <img className='h-8' src={logo} alt='logo'/>
                    <h3 className="text-white text-center font-black uppercase text-4xl">Snappy</h3>
                  </div>
                  <div className="flex flex-col items-center text-center overflow-auto gap-2">
                    {contacts.map((contact,index) => {
                        return(
                            <div className={`bg-gray-800 hover:bg-gray-400 mb-2 w-80 h-12 cursor-pointer text-center rounded-md p-1.5 gap-2 flex items-center ${index === currentSelected ? 'bg-gray-400':''}`}
                                 key={index}
                                 onClick={()=>changeCurrentChat(index,contact)}
                            >
                                <img 
                                        src={`data:image/svg+xml;base64,${contact.avatarImage}`} 
                                        className="justify-start h-12"
                                        alt='avatar'
                                />
                                <h3 className="text-white text-md">{contact.name}</h3> 
                            </div>
                        )
                    })}
                  </div>
                  <div className="flex justify-center items-center gap-8 bg-gray-600">
                        <img 
                           className="h-12"
                           src={`data:image/svg+xml;base64,${currentUserImage}`} 
                           alt='avatar'
                        />
                        <h2 className="text-white text-2xl">{currentName}</h2>
                  </div>
                </div>
            )}
        </>
    )
}

export default Contacts