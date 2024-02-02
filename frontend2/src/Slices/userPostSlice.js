import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading:false,
    posts:null,
    error:null
}

export const userPostsSlice = createSlice({
    name:"userPostsSlice",
    initialState,
    reducers: {
    userPostsRequest: (state) => {
      state.loading = true;
    },
    userPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    userPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorsUserPostsSlice: (state) => {
      state.error = null;
    },
}});

export const  {
    
    userPostsRequest,
    userPostsSuccess,
    userPostsFailure,
    clearErrorsUserPostsSlice

} = userPostsSlice.actions

export default userPostsSlice.reducer