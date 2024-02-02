import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading:false,
    user:{},
    error:null
}



export const userProfileSlice = createSlice({
    name:"userProfileSlice",
    initialState,
    reducers : {
    userProfileRequest: (state) => {
      state.loading = true;
    },
    userProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorsUserProfileSlice: (state) => {
      state.error = null;
    },
}});

export const  {
    userProfileRequest,
    userProfileSuccess,
    userProfileFailure,
    clearErrorsUserProfileSlice
} = userProfileSlice.actions

export default userProfileSlice.reducer