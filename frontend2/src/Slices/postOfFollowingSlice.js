import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    loading:false,
    posts:null,
    error:null
}
  
const postOfFollowingSlice = createSlice({
  name:"postOfFollowingSlice",
  initialState,
  reducers: {
    postOfFollowingRequest: (state) => {
      state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorPostOfFollowingSlice: (state) => {
      state.error = null;
    },
}});

export const {
    postOfFollowingRequest,
    postOfFollowingSuccess,
    postOfFollowingFailure,
    clearErrorPostOfFollowingSlice
} = postOfFollowingSlice.actions

export default postOfFollowingSlice.reducer