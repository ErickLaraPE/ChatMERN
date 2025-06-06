import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const checkAuth = async (req,res,next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
           token = req.headers.authorization.split(' ')[1]
           const decoded =  jwt.verify(token,process.env.JWT_SECRET)
           req.user = await User.findById(decoded.id).select("-password -token -createdAt -updatedAt -__v")
           return next();
        } catch (error) {
            return res.status(404).json({msg: 'An error occur'})
        }
    }
    
    if(!token) {
        const error = new Error("Invalid token")
        res.status(401).json({ msg: error.message })
    }
    next()
}

export default checkAuth