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
      data:{commentId}
    });
    
    await dispatch(deleteCommentSuccess(response?.data?.message))
    Swal.fire({
      position: "bottom",
      icon: "success",
      title: ` comment has been deleted` ,
      showConfirmButton: false,
      timer: 2000
    });
  } catch (error) {
    await dispatch(deleteCommentFailure(error?.message));
    Swal.fire({
      position: "bottom",
      icon: "warning",
      title: `${error?.message}` ,
      showConfirmButton: false,
      timer: 2000
    });
  }
};


const createNewPost = (caption, image) => async (dispatch) => {
  try {
    


    dispatch(newPostRequest());

    const response = await axios.post(
      `/api/v1/post/upload`,
      {
        caption,
        image
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch(newPostSuccess(response?.data?.message));
    
      
    
  } catch (error) {
    dispatch(newPostFailure(error?.message));
  }
};

const updatePost = (newCaption, id) => async (dispatch) => {
  try {
    dispatch(updateCaptionRequest());

    const response = await axios.put(
      `/api/v1/post/${id}`,
      {
        newCaption
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(updateCaptionSuccess(response?.data?.message));
  } catch (error) {
    dispatch(updateCaptionFailure(error?.message));
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());

    const response = await axios.delete(`/api/v1/post/${id}`);
    dispatch(deletePostSuccess(response?.data?.message));
    Swal.fire({
      position: "bottom",
      icon: "success",
      title: ` Post deleted successfully ` ,
      showConfirmButton: false,
      timer: 2000
    });
  } catch (error) {
    dispatch(deletePostFailure(error?.message));
    Swal.fire({
      position: "bottom",
      icon: "warning",
      title: ` something wrong while deleting your post` ,
      showConfirmButton: false,
      timer: 2000
    });
  }
};

export {likePost , addCommentOnPost,deleteCommentOnPost , createNewPost , updatePost , deletePost}