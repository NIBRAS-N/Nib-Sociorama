import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/user.actions.js";
import "./ResetPassword.css";
import Swal from 'sweetalert2';
import {clearErrorsLikeSlice,clearMessage} from "../../Slices/likeSlice.js"
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.like);

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(resetPassword(params.token, newPassword));
    navigate("/login")
  };
  // console.log(params.token)

  useEffect(() => {
    if (error) {
        Swal.fire({
            position: "bottom",
            icon: "warning",
            title: `token expired or ${error}`,
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
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Social Aap
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token!</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;