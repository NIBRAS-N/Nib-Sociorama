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

import {
  updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFailure,
    deleteProfileRequest,
    deleteProfileSuccess,
    deleteProfileFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
    followUserRequest,
    followUserSuccess,
    followUserFailure,
} from "../Slices/likeSlice.js"

import {
  userPostsRequest,
  userPostsSuccess,
  userPostsFailure
} from "../Slices/userPostSlice.js"

import {
  userProfileRequest,
  userProfileSuccess,
  userProfileFailure
} from "../Slices/userProfileSlice.js"

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
                    title: `email password vule gesos naki? ${error}` ,
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
  
const getAllUsers = (name="",search=false) => async (dispatch) => {
    try {
      // console.log("lol")
      await dispatch(allUsersRequest())

      // const response = await axios.get(`/api/v1/users?name=${name}`);

      const response = await axios.post(`/api/v1/user/all-users?name=${name}`,{},{headers:{
        "Content-Type":"application/json"
      }});
      

      await dispatch(allUsersSuccess(response?.data?.data));
      if(search)
      {      Swal.fire({
              position: "top-end",
              icon: "success",
              title: ` ${response.data?.data?.length} User found` ,
              showConfirmButton: false,
              timer: 2000
            });
      }
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

const logoutUser = () => async (dispatch) => {
  try {
    await dispatch(LogoutUserRequest())

    const response = await axios.post("/api/v1/user/logout",{},{headers:{
      "Content-Type":"application/json"
    }});

    const abc = await dispatch(LogoutUserSuccess());
    
    if(abc){
      Swal.fire({
        position: "bottom",
        icon: "success",
        title: ` ${response.data?.data?.user?.name}, You logged out succesfully` ,
        showConfirmButton: false,
        timer: 2000
      });
    }

  } catch (error) {
     await dispatch(LogoutUserFailure());
     Swal.fire({
      position: "top-end",
      icon: "warning",
      title: ` Logout unseccssful , ${error?.message} ` ,
      showConfirmButton: false,
      timer: 2000
    });
  }
};

const registerUser = (name, email, password, avatar) => async (dispatch) => {
    try {
      await dispatch(RegisterRequest())

      const response = await axios.post(
        "/api/v1/user/register",
        { name, email, password, avatar },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await dispatch(RegisterSuccess(response?.data?.data))
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: ` ${response.data?.data?.user?.name}, You registered successfully` ,
        showConfirmButton: false,
        timer: 2000
      });
    } catch (error) {
      await dispatch(RegisterFailure(error?.message));
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: `Register Unsuccessful, might be username or email already used , ${error?.message} ` ,
        showConfirmButton: false,
        timer: 3000
      });
    }
}

const updateProfile = (name, email, avatar) => async (dispatch) => {
  try {
    await dispatch(updateProfileRequest())

    const response = await axios.put(
      "/api/v1/user/updateProfile",
      { name, email, avatar },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    await dispatch(updateProfileSuccess(response?.data?.message));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Update successful ` ,
      showConfirmButton: false,
      timer: 3000
    });
  } catch (error) {
    dispatch(updateProfileFailure(error?.message))
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: `${error}` ,
      showConfirmButton: false,
      timer: 3000
    });
  }
};

const updatePassword =(oldPassword, newPassword) => async (dispatch) => {
  try {
    await dispatch(updatePasswordRequest())

    const response = await axios.put(
      "/api/v1/user/updatePassword",
      { oldPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await dispatch(updatePasswordSuccess(response?.data?.message));
    Swal.fire({
      position: "bottom",
      icon: "success",
      title: `password updated successfully` ,
      showConfirmButton: false,
      timer: 3000
    });
  } catch (error) {
    dispatch(updatePasswordFailure(error?.message));
    Swal.fire({
      position: "bottom",
      icon: "warning",
      title: `${error}` ,
      showConfirmButton: false,
      timer: 3000
    });
  }
};


const deleteMyProfile = () => async (dispatch) => {
  try {
    await dispatch(deleteProfileRequest());

    const response = await axios.delete("/api/v1/user/deleteUser");

    await dispatch(deleteProfileSuccess(response?.data?.message))
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `account deleted successfully` ,
      showConfirmButton: false,
      timer: 3000
    });
  } catch (error) {
    await dispatch(deleteProfileFailure(error?.message))
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: `${error}` ,
      showConfirmButton: false,
      timer: 3000
    });
  }
};

const forgotPassword = (email) => async (dispatch) => {
  try {
    await dispatch(forgotPasswordRequest());

    const response = await axios.post(
      "/api/v1/user/forgot/password",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await dispatch(forgotPasswordSuccess(response?.data?.message));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `reset token sent  successfully ${response?.data?.message}` ,
      showConfirmButton: false,
      timer: 3000
    });
  } catch (error) {
    await dispatch(forgotPasswordFailure(error?.message))
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: `wrong on sending reset token , ${error}`  ,
      showConfirmButton: false,
      timer: 3000
    });
  }
};

const resetPassword = (token, password) => async (dispatch) => {
  try {
    await dispatch(resetPasswordRequest());

    const response = await axios.put(
      `/api/v1/user/password/reset/${token}`,
      {
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    await dispatch(resetPasswordSuccess(response?.data?.message))
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: `wrong on reset Password , ${error}`  ,
      showConfirmButton: false,
      timer: 3000
    });
    await dispatch(resetPasswordFailure(error?.message));
  }
};

const getUserPosts = (id) => async (dispatch) => {
  try {
    await dispatch(userPostsRequest());

    const response = await axios.get(`/api/v1/user/userposts/${id}`);
    await dispatch(userPostsSuccess(response?.data?.data));
  } catch (error) {
    Swal.fire({
      position: "bottom",
      icon: "warning",
      title: `wrong on getting user posts , ${error}`  ,
      showConfirmButton: false,
      timer: 3000
    });
    await dispatch(userPostsFailure(error?.message));
  }
};

const getUserProfile = (id) => async (dispatch) => {
  try {
    await dispatch(userProfileRequest());

    const response = await axios.get(`/api/v1/user/${id}`);
    await dispatch(userProfileSuccess(response?.data?.data))
  } catch (error) {
    Swal.fire({
      position: "bottom",
      icon: "warning",
      title: `wrong on getting user profile , ${error}`  ,
      showConfirmButton: false,
      timer: 3000
    });
    await dispatch(userProfileFailure(error?.message));
  }
};

const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    await dispatch(followUserRequest());

    const response = await axios.get(`/api/v1/user/follow/${id}`);
    await dispatch(followUserSuccess(response?.data?.message));
    Swal.fire({
      position: "bottom",
      icon: "success",
      title: ` ${response?.data?.message}`  ,
      showConfirmButton: false,
      timer: 3000
    });
  } catch (error) {
    Swal.fire({
      position: "bottom",
      icon: "warning",
      title: `wrong on follow or unfollow , ${error}`  ,
      showConfirmButton: false,
      timer: 3000
    });
    await dispatch(followUserFailure(error?.message));

  }
};
export {loadUser,loginUser,getFollowingPosts,getAllUsers,getMyPosts,logoutUser,registerUser,updateProfile,updatePassword,deleteMyProfile,forgotPassword , resetPassword , getUserPosts , getUserProfile , followAndUnfollowUser}