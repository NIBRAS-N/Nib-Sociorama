import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    loading:false,
    users:null,
    error:null
}
export const allUsersSlice = createSlice({
  name:"allUsersSlice",
  initialState,
  reducers: {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrorsAllUsersSlice: (state) => {
      state.error = null;
    },
}});

export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFailure,
    clearErrorsAllUsersSlice
} = allUsersSlice.actions

export default allUsersSlice.reducer