import Swal from 'sweetalert2';
import axios from "axios";
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
  } from "../Slices/likeSlice.js"

  
const likePost = (id) => async (dispatch) => {
    try {
      await dispatch(likeRequest());
  
      const response = await axios.get(`/api/v1/post/${id}`);
       await dispatch(likeSuccess(response?.data?.message))
      
    } catch (error) {
      await dispatch(likeFailure(error?.message))
      
        
      
    }
};


const addCommentOnPost = (id, newComment) => async (dispatch) => {
  try {
    await dispatch(addCommentRequest());

    const response = await axios.put(
      `/api/v1/post/comment/${id}`,
      {
        newComment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
     
    const abc = await dispatch(addCommentSuccess(response?.data?.message))
    if(abc){
      Swal.fire({
        position: "bottom",
        icon: "success",
        title: ` You comment added succesfully` ,
        showConfirmButton: false,
        timer: 2000
      });
    }
  
  } catch (error) {
    await dispatch(addCommentFailure(error.message))
    Swal.fire({
      position: "bottom",
      icon: "warning",
      title: ` something wrong while adding your comment` ,
      showConfirmButton: false,
      timer: 2000
    });
  }
};

const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    await dispatch(deleteCommentRequest());

    const response = await axios.delete(`/api/v1/post/comment/${id}`, {
      commentId
    });
    
    await dispatch(deleteCommentSuccess(response?.data?.message))
  } catch (error) {
    await dispatch(deleteCommentFailure(error?.message));
  }
};

export {likePost , addCommentOnPost,deleteCommentOnPost}