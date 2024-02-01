import { Button,Typography } from "@mui/material";
import React,{useEffect,useState,UseStatet} from "react"
import { useDispatch, useSelector  } from "react-redux";
import { createNewPost } from "../../Actions/post.actions.js";
import { loadUser } from "../../Actions/user.actions.js";
import "./NewPos.css"
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const NewPost = () =>{

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image,setImage] = useState(null)
    const [caption,setCaption] = useState("")
    const [image2 , setImage2] = useState(null)
    const {loading , error , message} = useSelector((state)=>state.like)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        if(file){
          setImage(file)
        }
        else {
          console.log("no image file found")
        }
        // console.log(file)
        const Reader = new FileReader();
        // Reader.readAsDataURL(file);
        if (file && file.type.match('image.*')) {
            Reader.readAsDataURL(file);
        }
        Reader.onload = () => {
          if (Reader.readyState === 2) {
            
            setImage2(Reader.result);
            
          }
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(createNewPost(caption, image));
        await dispatch(loadUser());
        navigate("/account")
    };

    useEffect(() => {
      if(error){
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: `${error}` ,
            showConfirmButton: false,
            timer: 2000
        });
        dispatch(clearErrorsLikeSlice())
      }
      if(message){
        Swal.fire({
            position: "top-end",
            icon: "warning",
            title: `${message}` ,
            showConfirmButton: false,
            timer: 2000
        });
        dispatch(clearMessage())
      }
    }, [dispatch,error,message]);
    
    return (
        <div className="newPost">
          <form className="newPostForm" onSubmit={submitHandler}>
            <Typography variant="h3">New Post</Typography>
    
            {image2 && <img src={image2} alt="post" />}
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input
              type="text"
              placeholder="Caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button disabled={loading} type="submit">
              Post
            </Button>
          </form>
        </div>
      );
}

export default NewPost;