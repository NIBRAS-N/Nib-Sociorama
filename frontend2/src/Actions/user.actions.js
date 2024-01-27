import axios from "axios";
import Swal from 'sweetalert2';
import { LoginFailure,LoginRequest,LoginSuccess,RegisterRequest,
    RegisterSuccess,
    RegisterFailure,
    LoadUserRequest,
    LoadUserSuccess,
    LoadUserFailure,
    LogoutUserRequest,
    LogoutUserSuccess,
    LogoutUserFailure,
    clearErrorsUserSLice } from "../Slices/userSlice.js";

import {  postOfFollowingRequest,
    postOfFollowingSuccess,
    postOfFollowingFailure,
    clearErrorPostOfFollowingSlice}from "../Slices/postOfFollowingSlice.js"

import { allUsersRequest,
    allUsersSuccess,
    allUsersFailure,
    clearErrorsAllUsersSlice} from "../Slices/allUserSlice.js"

import {
  myPostsRequest,
myPostsSuccess,
myPostsFailure,
clearErrorsMyPostSlice,

} from "../Slices/myPostSlice.js"

const loginUser = (email,password) => async(dispatch) =>{
        try {
            // dispatch(login(userData))
            // dispatch({
            //     type:"LoginRequest"
            // });
            await dispatch(LoginRequest())
            const response = await axios.post(
                "/api/v1/user/login",
                {email,password},
                {
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            )    
        // const res = await dispatch({
        //     type:"LoginSuccess",
        //     payload:response.data
        // })
        const abc = await dispatch(LoginSuccess(response.data?.data?.loggedInUser))
        // console.log(res.payload.data.loggedInUser)
        // console.log("lol",response)
    
        if(abc){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `welcome ${response.data?.data?.loggedInUser?.name}, You logged in succesfully` ,
                showConfirmButton: false,
                timer: 2000
              });
        }
           
           
        } catch (error) {
            // dispatch({
            //     type: "LoginFailure",
            //     payload: error.response?.data.message,
            // })
            
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `email password vule gesos naki?` ,
                    showConfirmButton: false,
                    timer: 2000
                  });
            
            await dispatch(LoginFailure(error?.message))
        }
    }
    
const loadUser = () => async (dispatch) => {
    try {
    
        await dispatch(LoadUserRequest());
      
          const response = await axios.get("/api/v1/user/me");
            // console.log(response)    
          await dispatch(LoadUserSuccess(response?.data?.data));
    
        } catch (error) {
    
          dispatch(LoadUserFailure(error?.message));
    
        }
};
    
const getFollowingPosts = () => async (dispatch) => {
    try {
      await dispatch(postOfFollowingRequest());
  
      const response = await axios.post(
        "/api/v1/post/following-post",
        {}, 
        {headers:{
          "Content-Type":"application/json"
        }}
    );
      await dispatch(postOfFollowingSuccess(response?.data.data));

    } catch (error) {
      await dispatch(postOfFollowingFailure(error?.message))
    }
};

// name = ""
  
const getAllUsers = () => async (dispatch) => {
    try {
      // console.log("lol")
      await dispatch(allUsersRequest())

      // const response = await axios.get(`/api/v1/users?name=${name}`);

      const response = await axios.post("/api/v1/user/all-users",{},{headers:{
        "Content-Type":"application/json"
      }});
      await dispatch(allUsersSuccess(response?.data?.data));
    } catch (error) {
      
      dispatch(allUsersFailure(error?.message));
    }
};

const getMyPosts = () => async (dispatch) => {
  try {
    await dispatch(myPostsRequest())

    const response = await axios.get("/api/v1/user/my/posts");
    await dispatch(myPostsSuccess(response?.data?.data))
  } catch (error) {
    await dispatch(myPostsFailure(error?.message))
  }
};

export {loadUser,loginUser,getFollowingPosts,getAllUsers,getMyPosts}