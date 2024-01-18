import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { sendEmail } from "../middlewares/sendEmail.middleware.js";
import crypto from "crypto"
const generateToken = async(userId) =>{
    try {
        console.log(userId)
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        
        // console.log("opore",accessToken)
        return accessToken


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const userRegister = asyncHandler( async (req,res)=>{
    const {email,name,password} = req.body;

    if([email,name,password].some((item)=>item?.trim()==="")){
        throw new ApiError(400,"all fields are required");
    }

    const existedUser = await User.findOne({
        $or:[
            {email},
            {name}
        ]
    }
    )
    if(existedUser) throw new ApiError(409, "User with email or username already exists")
    
    const user = await User.create({
        name,
        email,
        password,
        avatar:{public_id:"sample_id",url:"sample_url"}
    })
    
    const token = await generateToken(user?._id);

    const createdUser = await User.findById(user?._id).select(
        "-password"
    )

    if(!createdUser) throw new ApiError(500,"something went wrong registering the user")

    

    const options = {
        expires: new Date(Date.now()+90*24*60*1000),
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken",token,options)
    .json(new ApiResponse(201,{user:createdUser,token},"User registered Successfully")
    )

    // return res.status(201).json(
    //     new ApiResponse(200,createdUser,"User registered Successfully")
    // )
})

const userLogin = asyncHandler( async (req,res) => {
    
    const {name,email,password} = req.body;
    
    if(!name && !email) {
        throw new ApiError(400,"Email or name must be provided");
    }
    
    const user = await User.findOne({
        $or:[
            {email},{name}
        ]
    })

    if(!user){ 
        throw new ApiError(404,"user does not exist");    
    }
    // console.log(password," ",user)
    const passwordCheck = await user.isPasswordCorrect(password) 

    if(!passwordCheck) throw new ApiError(401, "Invalid user credentials")


    const token = await generateToken(user?._id);
    // console.log("niche",token)
    const loggedInUser = await User.findById(user?._id).select("-password")

    const options = {
        expires: new Date(Date.now()+90*24*60*1000),
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken",token,options)
    .json(new ApiResponse(200,{user:loggedInUser,token},"User logged in successfully")
    )

})

const followUser = asyncHandler(async (req,res)=>{
    // get the user je follow korbe as loggedinUser[mane je loggedin theke follow button e click korse]
    // get the user  jake follow korbe as userTofollow
    // Note: [loggedinUser  jodi age theke userToFollow ke follow kore rakhe tyle unfollow hoye jabe . jodi na kore rakhe tyle follow hobe]
    // loggedinUser er follow array er moddhe dekho userTofollow er id ase kina.
    // baki process easy
    // console.log(req.params.id.toString() , " " , req?.user._id.toString())
    const var1 = req.params.id;
    const var2 = req?.user._id;
    if(var1.toString() === var2.toString())
            throw new ApiError(400,"You cant follow Yourself");


    const userTofollow = await User.findById(req.params.id)
    const loggedinUser = req?.user;

    if(!userTofollow) throw new ApiError(404,"User not found")


    const checkExistedFollowing = await loggedinUser.following.includes(req.params.id)

    // console.log("Hello",checkExistedFollowing)

    if(checkExistedFollowing){
        const index = loggedinUser.following.indexOf(req.params.id);
        const deleteExistedFollowing = loggedinUser.following.splice(index,1);
        const index2 = userTofollow.followers.indexOf(req.user._id)
        const deleteExistedFollower = userTofollow.followers.splice(index2,1)
        await loggedinUser.save({ validateBeforeSave: false })
        await userTofollow.save({ validateBeforeSave: false })
        res.status(200).json(new ApiResponse(200,{userTofollow,loggedinUser},"Unfollow done"))
    } 

    else{

        

        console.log()
        
        const insertInFollowingArray = await loggedinUser.following.push(req.params.id);

        if(!insertInFollowingArray) throw new ApiError(400,"couldnt insert in the following array")

        const insertInFollowersArray = await userTofollow.followers.push(req.user._id);

        if(!insertInFollowersArray)throw new ApiError(400,"couldnt insert in the follower array")

        await loggedinUser.save({ validateBeforeSave: false })
        await userTofollow.save({ validateBeforeSave: false })

        res.status(200).json(new ApiResponse(200,{userTofollow,loggedinUser},"Following successfully done"))
    }

})

const logout = asyncHandler(async(req,res)=>{
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true
    }
    res.cookie("accessToken",null,options).status(200).json(new ApiResponse(200,{},"User logged Out successfully"))
})

const updatePassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req?.user._id);
    const checking = await user.isPasswordCorrect(oldPassword)
    if(!checking){
        res.status(400).json(new ApiResponse(400,user,"Old password is not correct"))
    }
    else{
        user.password = newPassword
        await user.save({ validateBeforeSave: false })
        res.status(200).json(new ApiResponse(200,user,"Password Updated successfully"))
    }
})

const updateProfile = asyncHandler(async (req,res) =>{
    const {name,email} = req.body;

    if(!name && !email) throw new ApiError(400,"Name and email field must be completed")

    if(req.user.name === name.toLowerCase() && req.user.email === email) throw new ApiError(400,"old username or email")

    if(name) req.user.name= name.toLowerCase()
    if(email) req.user.email = email

    await req.user.save({ validateBeforeSave: false })

    res.status(200).json(new ApiResponse(200,req.user,"Updated successfully"))
})

const deleteUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req?.user._id)
    

    const allPosts  = user.posts;
    // deleting all post of the current user
    allPosts?.map(async(item)=>{
        const post = await Post.findById(item)
        // console.log("item",post)
        const deleting = await Post.deleteOne(item);
        if(!deleting) throw new ApiError(400,"something went wrong during deleting the post")
    })

    // deleting the follwing persons followers array[user er following array te je id ase, oy id er following array thekew remove kora lagbe]

    const fol_lowing= user?.following;
    
    fol_lowing?.map(async(item)=>{
        const user2 = await User.findOne(item);
        if(!user2)throw new ApiError(400,"something went wrong during finding my following person")

        const followerOfUser2 = user2.followers; 

        const index = followerOfUser2.indexOf(item)
        const deleteFollowing = await followerOfUser2.splice(index,1)

        if(!deleteFollowing)ApiError(400,"something went wrong during deleting from followers array")

        await user2.save({ validateBeforeSave: false });
        // console.log(followerOfUser2);
        // console.log(user2," ",user2.followers);
    })

    // deleting the follwer persons followings array[user er following array te je id ase, oy id er following array thekew remove kora lagbe]

    const fol_lower= user?.followers;
    
    fol_lower?.map(async(item)=>{
        const user2 = await User.findOne(item);
        if(!user2)throw new ApiError(400,"something went wrong during finding my follower person")

        const followingOfUser2 = user2.following; 

        const index = followingOfUser2.indexOf(item)
        const deleteFollower = await followingOfUser2.splice(index,1)

        if(!deleteFollower)ApiError(400,"something went wrong during deleting from following array")

        await user2.save({ validateBeforeSave: false });
        // console.log(followerOfUser2);
        // console.log(user2," ",user2.followers);
    })

    //  deleting the user

    const removing = await User.deleteOne(user?._id);
    if(!removing) throw new ApiError(400,"something went wrong during deleting the Uer")


    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true
    }
    res.cookie("accessToken",null,options)
   


    //Problem: .toArray() method is not working while trying to convert aggrgate  cursor into array
    // const allPost = await Post.aggregate([
    //     {
    //         $match:{owner:user._id}
    //     },
    //     {
    //         $group:{
    //             _id:"$_id"
    //         }
    //     }
    // ])
    // const allPostArray = await allPost.toArray()
    // console.log(typeof(allPostArray))
    // // allPost?.map(async(item)=>{
    // //     // const delDoc = await Post.deleteOne({_id:item._id})
    // //     console.log(item._id)
    // // })
    res.status(200).json(new ApiResponse(200,{allPosts,user},"User and his posts removed from database"));
})

const myProfile = asyncHandler(async (req,res)=>{
    const user = await User.findById(req?.user._id).populate("posts").populate("followers").populate("following")
    // console.log(user)
    if(!user) throw new ApiError(200,"something went wrong during fetching my profile")
    res.status(200).json(new ApiResponse(200,user,"all my details are fetched"))
})

const getUserProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req?.params.id).populate("posts").populate("followers").populate("following")
    if(!user) throw new ApiError(400,"User id not found")
    return res.status(200).json(new ApiResponse(200,user,`All details of ${user.name} fetched`))
})

const getAllUser = asyncHandler(async (req,res) =>{
    const user = await User.find({}).populate("posts").populate("followers").populate("following")
    if(!user) throw new ApiError(400,"User id not found")
    return res.status(200).json(new ApiResponse(200,user,`All details of ${user.name} fetched`))
})

const forgotPassword = asyncHandler(async (req,res)=>{
    const {email} = req.body
    if(!email) throw new ApiError(400,"Enter a email")

    const user = await User.findOne({email:email})
    console.log(email," ",user)
    if(!user) throw new ApiError(400,"no user found with this email")

    const resetPasswordToken = await user.getResetPasswordToken();

    const saving = await user.save({validateBeforeSave:false})

    if(!saving) throw new ApiError(400,"something wrong creating reset Password token")

    const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetPasswordToken}`

    const message = `Reset Your password by clicking on the link below : \n\n ${resetUrl} `


    try {
        await sendEmail({
            email:user.email,
            subject:"Reset Password", 
            message
        })
        res.status(200).json(new ApiResponse(200,email,"email successfully sent"))
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false})

        throw new ApiError(400,"COuldnt send the email")
    }

})

const resetPassword = asyncHandler(async (req,res)=>{
    const passwordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({
        $and:[
            {resetPasswordToken:passwordToken},
            {resetPasswordExpire:{$gt:Date.now()}}
        ]
    })
    console.log(user)
    if(!user) throw new ApiError(400,"invalid password token or time expired")

    else{
        const {password}= req.body
        if(!password) throw new ApiError(400,"enter a password")
        user.password=password

        user.resetPasswordToken=undefined
        user.resetPasswordExpire=undefined

        const saving = await user.save({validateBeforeSave:false})



        if(!saving) throw new ApiError(400,"user model not saved")


        res.status(200).json(new ApiResponse(200,user,"password reset done"))
    }

})
export {userRegister,userLogin,followUser,logout,updatePassword,updateProfile,deleteUser,myProfile,getAllUser,getUserProfile,forgotPassword,resetPassword}   