import { Outlet} from "react-router-dom"
const ChatLayout = () => {
    return(
        <>
        
        
            <div className='bg-gray-100'>

                <div className='md:flex md:min-h-screen'>
                    
                    <main className='p-10 flex-1'>
                        <Outlet/>
                    </main>
                </div>
            </div> 
        
    </>
    )
}
export default ChatLayout