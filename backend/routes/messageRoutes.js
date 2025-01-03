import express from 'express'
const router = express.Router()
import { addMessage,getAllMessages } from '../controllers/messageController.js'

//Autenticacion, Registro y Confirmacion de Usuarios
router.post('/addmsg/', addMessage); //Crea un nuevo usuario
router.post('/getmsg/',getAllMessages)

export default router