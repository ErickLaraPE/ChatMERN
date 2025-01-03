import Message from "../models/Message.js"

const addMessage = async (req,res) => {
    try {
        const {from,to,message} = req.body

        const data = await Message.create({
            message:{text:message},
            users:[from,to],
            sender:from,
        })
        if(data){
            return res.json({ msg:"Message added succesfully"})
        }else{
            return res.json({ msg:"Failed to add message"})
        }
    } catch (error) {
        console.log(error.response.data.msg)
    }
}

const getAllMessages = async (req,res) => {
    try {
        const { from, to } = req.body
        const messages = await Message.find({
            users:{
                $all:[from,to],
            },
        }).sort({updatedAt:1})
        const projectMessages = messages.map((msg)=>{
            return{
              fromSelf: msg.sender.toString() === from,
              message: msg.message.text,
            }
        })
        res.json(projectMessages)
    } catch (error) {
        console.log(error.response.data.msg)  
    }
}

export { addMessage,getAllMessages }