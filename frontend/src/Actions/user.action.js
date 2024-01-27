import axios from "axios";
import { LoginFailure,LoginRequest,LoginSuccess,RegisterRequest,
    RegisterSuccess,
    RegisterFailure,
    LoadUserRequest,
    LoadUserSuccess,
    LoadUserFailure,
    LogoutUserRequest,
    LogoutUserSuccess,
    LogoutUserFailure,
    clearErrorsUserSLice } from "../Reducers/userSlice.js";

import  {postOfFollowingRequest,
postOfFollowingSuccess,
postOfFollowingFailure,
clearErrorPostOfFollowingSlice} from "../Reducers/postOfFollowingSlice.js"

import {  allUsersRequest,
  allUsersSuccess,
  allUsersFailure,
  clearErrorsAllUsersSlice} from "../Reducers/allUserSlice.js"

import {
myPostsRequest,
myPostsSuccess,
myPostsFailure,
clearErrorsMyPostSlice,

} from "../Reducers/myPostSlice.js"

import {likeRequest,
    likeSuccess,
    likeFailure,
    addCommentRequest,
    addCommentSuccess,
    addCommentFailure,
    deleteCommentRequest,
    deleteCommentSuccess,
    deleteCommentFailure,
    newPostRequest,
    newPostSuccess,
    newPostFailure,
    updateCaptionRequest,
    updateCaptionSuccess,
    updateCaptionFailure,
    deletePostRequest,
    deletePostSuccess,
    deletePostFailure,
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
    clearErrorsLikeSlice,
    clearMessage,
} from "../Reducers/likeSlice.js"

import {
userPostsRequest,
userPostsSuccess,
userPostsFailure,
clearErrorsUserPostsSlice
} from "../Reducers/userPostSlice.js"

import {userProfileRequest,
    userProfileSuccess,
    userProfileFailure,
    clearErrorsUserProfileSlice} from "../Reducers/userProfileSlice.js"
import { response } from "express";



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
    await dispatch(LoginSuccess(response.data?.data?.loggedInUser))
    // console.log(res.payload.data.loggedInUser)
    // console.log("lol",response)


       
       
    } catch (error) {
        // dispatch({
        //     type: "LoginFailure",
        //     payload: error.response?.data.message,
        // })
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
  
// const getAllUsers = (name = "") => async (dispatch) => {
//     try {
//       // console.log("lol")
//       await dispatch(allUsersRequest())

//       // const response = await axios.get(`/api/v1/users?name=${name}`);
//       const response = await axios.post("/api/v1/user/all-users",{name},{headers:{
//         "Content-Type":"application/json"
//       }});
//       await dispatch(allUsersSuccess(response));
//     } catch (error) {
      
//       dispatch(allUsersFailure(error?.message));
//     }
// };

const getMyPosts = () => async (dispatch) => {
  try {
    await dispatch(myPostsRequest())

    const response = await axios.get("/api/v1/user/myPosts");
    await dispatch(myPostsSuccess(response))
  } catch (error) {
    await dispatch(myPostsFailure(error?.message))
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    await dispatch(LogoutUserRequest())

    await axios.get("/api/v1/user/logout");

    dispatch(LogoutUserSuccess());
  } catch (error) {
    dispatch(LogoutUserFailure());
  }
};

// const registerUser = (name, email, password, avatar) => async (dispatch) => {
//     try {
//       dispatch(RegisterRequest())

//       const response = await axios.post(
//         "/api/v1/user/register",
//         { name, email, password, avatar },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       dispatch(RegisterSuccess(response))
//     } catch (error) {
//       dispatch(RegisterFailure(error?.message));
//     }
// }

// const updateProfile = (name, email, avatar) => async (dispatch) => {
//   try {
//     dispatch(updateProfileRequest())

//     const response = await axios.put(
//       "/api/v1/user/updateProfile",
//       { name, email, avatar },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     dispatch(updateProfileSuccess(response));
//   } catch (error) {
//     dispatch(updateProfileFailure(error?.message))
//   }
// };

const updatePassword =(oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch(updatePasswordRequest())

      const response = await axios.put(
        "/api/v1/user/updatePassword",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(updatePasswordSuccess(response));
    } catch (error) {
      dispatch(updatePasswordFailure(error?.message));
    }
};

const deleteMyProfile = () => async (dispatch) => {
  try {
    dispatch(deleteProfileRequest());

    const response = await axios.delete("/api/v1/user/deleteUser");

    dispatch(deleteProfileSuccess(response))
  } catch (error) {
    dispatch(deleteProfileFailure(error?.message))
  }
};

const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());

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

    dispatch(forgotPasswordSuccess(response));
  } catch (error) {
    dispatch(forgotPasswordFailure(error?.message))
  }
};


const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch(resetPasswordRequest());

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

    dispatch(resetPasswordSuccess(response))
  } catch (error) {
    dispatch(resetPasswordFailure(error?.message));
  }
};

const getUserPosts = (id) => async (dispatch) => {
  try {
    dispatch(userPostsRequest());

    const response = await axios.get(`/api/v1/user/userposts/${id}`);
    dispatch(userPostsSuccess(response));
  } catch (error) {
    dispatch(userPostsFailure(error?.message));
  }
};

const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(userProfileRequest());

    const response = await axios.get(`/api/v1/user/${id}`);
    dispatch(userProfileSuccess(response))
  } catch (error) {
    dispatch(userProfileFailure(error?.message));
  }
};

const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch(followUserRequest());

    const response = await axios.get(`/api/v1/user/follow/${id}`);
    dispatch(followUserSuccess(response));
  } catch (error) {
    dispatch(followUserFailure(error?.message));
  }
};
export {
  loginUser,
  loadUser,
  getFollowingPosts,
  // getAllUsers,
  getMyPosts,logoutUser,
  // registerUser,
  // updateProfile,
  forgotPassword,updatePassword,deleteMyProfile,resetPassword,getUserPosts,getUserProfile,followAndUnfollowUser}