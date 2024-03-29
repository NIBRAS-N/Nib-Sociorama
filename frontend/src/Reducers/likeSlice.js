import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    message:null,
    error:null
}

export const likeSlice = createSlice({
    name:"likeSlice",
    initialState,
    reducers: {
    likeRequest: (state) => {
        state.loading = true;
    },
    likeSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    likeFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    addCommentRequest: (state) => {
        state.loading = true;
    },
    addCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteCommentRequest: (state) => {
        state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCommentFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    newPostRequest: (state) => {
        state.loading = true;
    },
    newPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    newPostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateCaptionRequest: (state) => {
        state.loading = true;
    },
    updateCaptionSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateCaptionFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deletePostRequest: (state) => {
        state.loading = true;
    },
    deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
        state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    deleteProfileRequest: (state) => {
        state.loading = true;
    },
    deleteProfileSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    forgotPasswordRequest: (state) => {
        state.loading = true;
    },
    forgotPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    followUserRequest: (state) => {
        state.loading = true;
    },
    followUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    followUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearErrorsLikeSlice: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
}});

export const {
    likeRequest,
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
} = likeSlice.actions


export default likeSlice.reducer