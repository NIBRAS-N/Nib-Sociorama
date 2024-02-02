import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/user.actions.js";
import "./ForgotPassword.css";
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"
import Swal from 'sweetalert2';
import { Link} from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
        Swal.fire({
            position: "bottom",
            icon: "warning",
            title: `${error}`,
            showConfirmButton: false,
            timer: 2000
        });
      dispatch(clearErrorsLikeSlice());
    }
    if (message) {
        Swal.fire({
            position: "bottom",
            icon: "success",
            title: `${message}`,
            showConfirmButton: false,
            timer: 2000
        });
      dispatch(clearMessage());
    }
  }, [ error, dispatch, message]);
  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Link to={"/login"}>login</Link>
        <Button disabled={loading} type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;