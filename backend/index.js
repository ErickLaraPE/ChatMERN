import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
dotenv.config();
connectDB()

const whitelist = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function(origin,callback){
        //console.log(origin)
        if(whitelist.includes(origin)){
        // Puede consultar la API
          callback(null,true)
        } else {
          // No esta permitido su request
          callback(new Error("Error from Cors"))
        }
  } 
};

app.use(cors(corsOptions))

//Routing
app.use('/api/users',userRoutes)
app.use('/api/messages',messageRoutes)

const PORT = process.env.PORT || 5000;

const servidor = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})


