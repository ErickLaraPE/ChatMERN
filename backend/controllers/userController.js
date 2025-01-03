import User from "../models/User.js"
//import generateId from "../helpers/generateId.js"
//import generateJWT from "../helpers/generateJWT.js"

const register = async (req,res) => {
    // Evitar registros duplicados
    const { email } = req.body
    const userExist = await User.findOne({email})
    if(userExist){
        const error = new Error("User already signed in")
        return res.status(400).json({msg: error.message})
    }
    try {
        const user = new User(req.body)
        //user.token = generateId();
        await user.save()
        res.json({
            msg: "User created correctly"
        })
    } catch (error) {
        console.log(error.response.data.msg)
    }       
}

const authenticate = async(req,res) => {
    const {email, password} = req.body
    // Comprobar que el usuario existe
    const user = await User.findOne({email})
    if(!user){
      const error = new Error('User does not exist');
      return res.status(404).json({msg: error.message});
    }
    // Comprobar su password
    if(await user.testPassword(password)){
        res.json({ user
            //_id: user._id,
            //name: user.name,
            //email:user.email,
            //token:generateJWT(user._id)
        })
        console.log('es correcto')
    } else {
        console.log('es incorrecto')
        const error = new Error("The password is incorrect");
        return res.status(403).json({ msg: error.message })
    }
}

const setAvatar = async(req,res) => {

    const {image} = req.body

    try{
        const userId = req.params.id
        const avatarImage = image
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage,
        })
        return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage})
    }catch(error){
        console.log(error.response.data.msg)
    }
}

const getAllUsers = async(req,res) => {
    try{
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "email","name","avatarImage","_id"
        ])
        return res.json(users)
    } catch(error){
        console.log(error.response.data.msg)
    }
}

export { register,authenticate,setAvatar,getAllUsers }