import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import ChatLayout from './layout/ChatLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import SetAvatar from './pages/SetAvatar'

function App() {
  return(
      <Router>
        <Routes>
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/setAvatar/:id" element={<SetAvatar/>}/>
          </Route>

          <Route path="/chat" element={<ChatLayout/>}>
            <Route index element={<Chat/>}/>
          </Route>
        </Routes>
      </Router>  
  )
}

export default App
