import React,{useEffect,useState} from "react";
import { Avatar, Typography, Button } from "@mui/material";
import { useDispatch , useSelector } from "react-redux";
import "./UpdateProfile.css"
import Loader from "../Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { updateProfile,loadUser } from "../../Actions/user.actions.js";
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"
import { clearErrorsUserSLice } from "../../Slices/userSlice.js";
import Swal from 'sweetalert2';

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {loading ,error , user } = useSelector((state)=>state.user)
    const {loading:updateLoading ,error:updateError , message } = useSelector((state)=>state.like)

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState(null);
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

    const handleImageChange = (e)=>{
        const file = e.target.files[0]

        if(file) setAvatar(file);

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPrev(Reader.result);

                
            } 
        };

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
        navigate("/account")
    };

    useEffect(() => {
        if (error) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `${error}` ,
                showConfirmButton: false,
                timer: 3000
            });
          dispatch(clearErrorsUserSLice());
        }
    
        if (updateError) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `${updateError}` ,
                showConfirmButton: false,
                timer: 3000
              });
          dispatch(clearErrorsLikeSlice());
        }
    
        if (message) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `${message}` ,
                showConfirmButton: false,
                timer: 3000
              });
          dispatch(clearMessage());
        }
    }, [dispatch, error, updateError, message]);
  

    return loading ? (
        <Loader />
      ) : (
        <div className="updateProfile">
          <form className="updateProfileForm" onSubmit={submitHandler}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
              Social Aap
            </Typography>
    
            <Avatar
              src={avatarPrev}
              alt="User"
              sx={{ height: "10vmax", width: "10vmax" }}
            />
    
            <input type="file" accept="image/*" onChange={handleImageChange} />
    
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="updateProfileInputs"
              required
              onChange={(e) => setName(e.target.value)}
            />
    
            <input
              type="email"
              placeholder="Email"
              className="updateProfileInputs"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <Button disabled={updateLoading} type="submit">
              Update
            </Button>
          </form>
        </div>
      );
};

export default UpdateProfile;
