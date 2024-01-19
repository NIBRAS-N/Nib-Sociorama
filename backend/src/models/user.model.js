import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import crypto from "crypto"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a name"]
    },

    avatar:{
        public_id:String,
        url:String,
    },

    email:{
        type:String,
        required:[true,"please enter a email"],
        unique:[true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"password must be included"],
        minlength:[6,"Password must be at least 6 characters"],
        // select:false
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type : Date
    }
},{timestamps:true});   


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    // console.log("from Model",this.password," ",password)    
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.getResetPasswordToken = async function(){

    const resetToken = await crypto.randomBytes(20).toString("hex")
    
    console.log(resetToken)

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire = Date.now()+ 1000*60*10

    return resetToken;


    
}



// userSchema.methods.generateRefreshToken = function(){
//     return jwt.sign(
//         {
//             _id: this._id,
            
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }


export const User = mongoose.model("User",userSchema);