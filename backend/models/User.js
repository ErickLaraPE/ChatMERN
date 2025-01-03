timport mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default: ""
    }
},{
    timestamps:true,
});
// Antes de grabarse el modelo, se hashea el password ingresado para ser almacenado en la BD de forma hasheada
userSchema.pre('save',async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
// method for comparing the password entered in the login page with the current password in the DB associated to that email entered
userSchema.methods.testPassword = async function(passwordForm){ 
    return await bcrypt.compare(passwordForm,this.password)
}

const User = mongoose.model("User",userSchema)

export default User