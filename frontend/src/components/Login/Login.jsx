import React,{ useEffect, useState } from "react";
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/user.action.js";
// import { useAlert } from "react-alert";

// 
function Login() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const dispatch = useDispatch();
    // const alert = useAlert();
  
    // const { error } = useSelector((state) => state.user);
    // const { message } = useSelector((state) => state.like);

    const loginHandler = (e) => {
        e.preventDefault();
// loginUser() is an action creator function that returns another function (a thunk function) that takes dispatch as an argument.
        dispatch(loginUser(email, password));
    };

  return (
    <>
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Nib-Sociorama
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>


    </>
  )
}

export default Login;
