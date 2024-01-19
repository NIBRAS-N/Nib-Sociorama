import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const createPost = asyncHandler(async (req,res)=>{
    const {caption} = req.body;

    const bannerLocalPath = req.file?.path;

    if(!bannerLocalPath) {
        throw new ApiError(400, "banner file is required")
    }

    const banner =  await uploadOnCloudinary(bannerLocalPath)

    if(!banner) throw new ApiError(400,"Something went wrong on uploading banner")

    const newPost = await Post.create({
        caption,
        image:{
            public_id:banner.public_id,
            url:banner.url
        },
        owner:req.user?._id
    })
    // Now we want push this post in the user.model.js post field
    if(!newPost) throw new ApiError(400,"Something wrong while creating newPost")

    const user = await User.findById(req.user?._id)
    
    if(!user)throw new ApiError(400,"Something wrong in verifyJWT || from post.controller.js")
    
    // console.log(typeof(user.posts)," ",user.posts.length);

    const addedPost = await user.posts.push(newPost?._id);

    
    // console.log(addedPost, " " , user);

    if(!addedPost) throw new ApiError(400,"Post Not added in Users posts array")

    await user.save({ validateBeforeSave: false })
    
    res.status(201)
    .json(new ApiResponse(201,newPost,"Post create successfully"))
})


const likeAndUnlikePost = asyncHandler(async(req,res)=>{
    // find the post in database
    // If post is already liked, then unlike it.->delete the liker from the like array
        // save the like array
    // else in like array push the liker 
        // save post
    const post = await Post.findById(req.params.id);
    console.log(post)
    if(!post) throw new ApiError(400,"Post id not found from params");

    if(post.likes.includes(req?.user._id)){
        //to unlike the post
        const index = post.likes.indexOf(req.user._id);
        // console.log(index)
        
        
        const unlikePost = post.likes.splice(index,1);

        if(!unlikePost) throw new ApiError(400,"something went wrong removing the user from liked array in post controller");

        await post.save({ validateBeforeSave: false })

        return res.status(200).json(  new ApiResponse(201,post,"Post Unliked successfull"))


    }
    else{
        const userIdInLikeArray = post.likes.push(req?.user._id);

        if(!userIdInLikeArray) throw new ApiError(400,"Someone did wrong terribly");
        await post.save({ validateBeforeSave: false })

        return res.status(200).json(new ApiResponse(200,post,"Post Liked successfull"));
    }

})

const deletePost = asyncHandler(async(req,res)=>{
    // get the post Id
    //find the post
    // check if the owner id and user id are same
    // delete the post from Post model in mongodb
    // delete the post id from the post array in user model

    const post = await Post.findById( req.params.id)

    if(!post) throw new ApiError(401,"Post id not matched");

    if(post.owner.toString() !== req?.user._id.toString() ){
        throw new ApiError(400,"Your are not allowed to delete this post");
    }
    // console.log("post ",post)

    
    // post.remove()

    const deletePost = await Post.deleteOne({_id:req.params.id})
    if(!deletePost) throw new ApiError(400,"Post document not deleted from Post model");

    // console.log("deletePost ",deletePost);

    // await post.save({ validateBeforeSave: false })


    const user = await User.findById(req?.user._id);
    const index = await user.posts.indexOf(req.params.id)
    
    const userModelPostArrayDelete =  user.posts.splice(index,1);

    if(!userModelPostArrayDelete) throw new ApiError(400,"Post array from user model not deleted");

    await user.save({ validateBeforeSave: false })

    res.status(200).json(new ApiResponse(200,user,"post deleted successful"))
})

const getPostOfFollowing = asyncHandler(async (req,res)=>{
    //following er vitor je id thakbe tar document fetch kore ni ashbe
    // The populate method in Mongoose is used to automatically replace specified paths in a document with documents from other collections. This is particularly useful when dealing with references between documents.


    // const user = await User.findById(req?.user._id).populate("following", "posts")
    
    
    const user = await User.findById(req?.user._id)

    const posts = await Post.find({
        owner:{
            $in:user.following
        }
    })
    
    // same result will be this
    // const postOf = await Post.aggregate([{$match:{owner:{$in:user.following}}}])
    // console.log("lollollol",postOf)

   
    res.status(200).json(new ApiResponse(200,posts,"Getting all the post of my Following person"))
})

const upadateCaption = asyncHandler(async (req,res) =>{
    const post = await Post.findById(req.params.id);

    if(!post) throw new ApiError(400,"Post not found");

    else {
        
        const var1 = post.owner
        const var2 = req.user._id
        if(var1.toString()===var2.toString()){
            const {newCaption} = req.body

            console.log(newCaption," ",post.caption)   

            if(!newCaption) throw new ApiError(400,"all fields must be added")

            if(newCaption===post.caption)throw new ApiError(400,"This is old caption")

            else  post.caption = newCaption;

            await post.save({ validateBeforeSave: false })

            res.status(200).json(new ApiResponse(200,post,"Caption updated successfully"))
        }
        else{
            throw new ApiError(400,"You are not owner to change the caption")
        }
    }
})

const addComment = asyncHandler(async (req,res)=>{
    const user = req?.user;

    const {newComment} = req?.body;

    if(!newComment) throw new ApiError(400,"You need to add   comment");

    const post = await Post.findById(req.params.id)

    if(!post) throw new ApiError(400,"Post not found");

    const allComments = post.comments;

    const var2 = user._id;

    let existingUsersComment =false;
    let idx = -1;
    // cheking if the user previously commented or not
    allComments?.forEach((item,index) => {

        const var1 = item.user;
        // console.log(var1," ",var2);
        if(var1.toString() === var2.toString()  ) {
            existingUsersComment = true;
            idx=index
        }

    });
    // if comment is available of the current user then edit it
    // console.log(existingUsersComment,idx)
    if(existingUsersComment){
        
        allComments[idx].comment=newComment;    
        
        const saving = await post.save({validateBeforeSave:false})
        
        if(!saving) throw new ApiError(400,"couldnt save the updated comment");
        
        res.status(200)
        .json(new ApiResponse(200,post,"comment edited successfully done"))
    }
    // else push the comment in the comments array
    else{
       
        const addComments = await post.comments.push({user:user._id,comment:newComment})
    
        if(!addComments)throw new ApiError(400,"couldnt add new commment in model");

        const saving = await post.save({validateBeforeSave:false})
        
        if(!saving) throw new ApiError(400,"couldnt save the added comment");

        res.status(200)
        .json(new ApiResponse(200,post,"new comment added successfully done"))
    }



})

const deleteComment = asyncHandler(async (req,res)=>{
    
    // if the logged in user and posts owner is the same person then he can delete any comment . I just need to provide the comment id through req.body

    // else, if the logged in user is not the post owner then he can delete only his comment

    const post = await Post.findById(req.params.id)
    
    if(!post) throw new ApiError(200,"Post not found")

    else{
        const allComments = post.comments
        
        if(allComments.length === 0) throw new ApiError("There is No comments to delete")
        else{
            const abc = req?.user.id
            const abc2 = post.owner;
            // console.log(abc,abc2);
            // loggedin user and owner of post both are same
            if(abc.toString() ===  abc2.toString()){
                const {commentId} = req.body;

                if(!commentId) throw new ApiError(400,"commentId required")
                
                let deletedComment ;
                let idx=-1
                allComments?.forEach(async (item,index)=>{
                    const ownerOfComment = item.user;
                    if(item._id.toString() === commentId){
                        idx=index;
                        deletedComment = post.comments[index];
                        return await post.comments.splice(index,1);
                    } 
                })
                if(idx==-1) throw new ApiError(200,"The comment is not found")
                // console.log(deletedComment);
                await post.save({validateBeforeSave:false})
                res.status(200).json(new ApiResponse(200,deletedComment,"This comment is deleted and owner of the post and logged in user is same"))
            }
            else{

                let idx = -1;
    
                const var1 = req?.user._id
                let deletedComment;
                allComments?.forEach(async (item,index)=>{
                    const ownerOfComment = item.user;
                    if(ownerOfComment.toString() == var1.toString()){
                        idx=index;
                        deletedComment = post.comments[index];
                        return await post.comments.splice(index,1);
                    } 
                })
    
                // console.log(idx);
    
                if(idx===-1){
                    throw new ApiError(400,"Its not your comment to delete")
                }
                else{
                    
                    
                    await post.save({validateBeforeSave:false})
        
                    res.status(200).json(new ApiResponse(200,deletedComment,"This comment is deleted"))
                }

            }
        }
        
        
    }



})
export {createPost,likeAndUnlikePost,deletePost,getPostOfFollowing,upadateCaption,addComment  , deleteComment }