import express from 'express'
const router = express.Router()
import { register,authenticate,setAvatar,getAllUsers } from '../controllers/userController.js'
//import checkAuth from '../middleware/checkAuth.js'

//Sign-in, log-in, set Avatar an get all users 
router.post('/', register); //Crea un nuevo usuario
router.post('/login',authenticate)// login the chat page
router.post('/setAvatar/:id',setAvatar)
router.get('/allusers/:id',getAllUsers)

export default router