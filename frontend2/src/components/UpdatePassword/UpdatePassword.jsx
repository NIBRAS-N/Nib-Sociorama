import "./UpdatePassword.css";
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {updatePassword,logoutUser} from "../../Actions/user.actions.js"
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
  
    const dispatch = useDispatch();
    const navigate = useNavigate()
  
    const { error, loading, message } = useSelector((state) => state.like);
  
    const submitHandler = async(e) => {
      e.preventDefault();
      await dispatch(updatePassword(oldPassword, newPassword));
        // navigate("/account")
        await dispatch(logoutUser())
    };
  
    useEffect(() => {
      if (error) {
        Swal.fire({
            position: "bottom",
            icon: "warning",
            title: `${error}` ,
            showConfirmButton: false,
            timer: 3000
        });
        dispatch(clearErrorsLikeSlice());
      }
  
      if (message) {
        Swal.fire({
            position: "bottom",
            icon: "warning",
            title: `${message}` ,
            showConfirmButton: false,
            timer: 3000
        });
        dispatch(clearMessage());
      }
    }, [dispatch, error,message]);
  
    return (
      <div className="updatePassword">
        <form className="updatePasswordForm" onSubmit={submitHandler}>
          <Typography variant="h3" style={{ padding: "2vmax" }}>
            Social Aap
          </Typography>
  
          <input
            type="password"
            placeholder="Old Password"
            required
            value={oldPassword}
            className="updatePasswordInputs"
            onChange={(e) => setOldPassword(e.target.value)}
          />
  
          <input
            type="password"
            placeholder="New Password"
            required
            className="updatePasswordInputs"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
  
          <Button disabled={loading} type="submit">
            Change Password
          </Button>
        </form>
      </div>
    );
  };
  
  export default UpdatePassword;