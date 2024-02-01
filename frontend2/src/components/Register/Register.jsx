import { Avatar, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Register.css'
import { registerUser } from "../../Actions/user.actions.js";
import { useNavigate } from "react-router-dom";
import { clearErrorsUserSLice } from "../../Slices/userSlice.js";
import Swal from 'sweetalert2';

const Register = () =>{
    const [name,setName] = useState("")
    const [email , setEmail] = useState("")
    const [avatar , setAvatar] = useState(null)
    const [avatar2 , setAvatar2] = useState(null)
    const [password , setPassword] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading , error} = useSelector((state)=>state.user)

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // console.log(file)
        if(file){
          setAvatar(file)
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
            
            setAvatar2(Reader.result);
            
          }
        };
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(registerUser(name, email, password, avatar));
        navigate('/')
    };
    
    useEffect(() => {
      if(error){
        // Swal.fire({
        //     position: "top-end",
        //     icon: "warning",
        //     title: `Register Unsuccessful , ${error} ` ,
        //     showConfirmButton: false,
        //     timer: 2000
        // });
        dispatch(clearErrorsUserSLice())
      }
    }, [error,dispatch]);
    

    return (
        <div className="register">
          <form className="registerForm" onSubmit={submitHandler}>
            <Typography variant="h3" style={{ padding: "2vmax" }}>
              Social Aap
            </Typography>
    
            <Avatar
              src={avatar2}
              alt="User"
              sx={{ height: "10vmax", width: "10vmax" }}
            />
    
            <input type="file" accept="image/*" onChange={handleImageChange} />
    
            <input
              type="text"
              value={name}
              placeholder="Name"
              className="registerInputs"
              required
              onChange={(e) => setName(e.target.value)}
            />
    
            <input
              type="email"
              placeholder="Email"
              className="registerInputs"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <input
              type="password"
              className="registerInputs"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
    
            <Link to="/">
              <Typography>Already Signed Up? Login Now</Typography>
            </Link>
    
            <Button disabled={loading} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      );

}

export default Register;