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
} from "../Reducers/likeSlice.js"

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
    dispatch(addCommentRequest());

    const response = await axios.put(
      `/api/v1/post/comment/${id}`,
      {
        newComment,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(addCommentSuccess(response?.data?.message))
  } catch (error) {
    dispatch(addCommentFailure(error.message))
  }
};

const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch(deleteCommentRequest());

    const response = await axios.delete(`/api/v1/post/comment/${id}`, {
      commentId
    });
    
    dispatch(deleteCommentSuccess(response?.data?.message))
  } catch (error) {
    dispatch(deleteCommentFailure(error?.message));
  }
};

// const createNewPost = (caption, image) => async (dispatch) => {
//   try {
//     dispatch(newPostRequest());

//     const response = await axios.post(
//       `/api/v1/post/upload`,
//       {
//         caption,
//         image,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     dispatch(newPostSuccess(response));
//   } catch (error) {
//     dispatch(newPostFailure(error?.message));
//   }
// };

const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch(updateCaptionRequest());

    const response = await axios.put(
      `/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(updateCaptionSuccess(response));
  } catch (error) {
    dispatch(updateCaptionFailure(error?.message));
  }
};

const deletePost = (id) => async (dispatch) => {
  try {
    dispatch(deletePostRequest());

    const response = await axios.delete(`/api/v1/post/${id}`);
    dispatch(deletePostSuccess(response));
  } catch (error) {
    dispatch(deletePostFailure(error?.message));
  }
};

export {likePost,addCommentOnPost,deleteCommentOnPost,
  // createNewPost,
  updatePost,deletePost}

