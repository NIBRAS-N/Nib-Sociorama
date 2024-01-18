import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption:{
        type:String
    },
    image:{
        public_id:String,   
        url:String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
            
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment:{
                type:String,
                required:true
            }
        }

    ]

},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)