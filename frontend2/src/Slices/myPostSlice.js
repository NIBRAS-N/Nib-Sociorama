import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading:false,
    posts:null,
    error:null
}


export const myPostsSlice = createSlice({
    name:"myPostsSlice",
    initialState,
    reducers: {

        myPostsRequest: (state) => {
        state.loading = true;
        },
        myPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        },
        myPostsFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        },
        clearErrorsMyPostSlice: (state) => {
        state.error = null;
        },
}});
  
export const {
myPostsRequest,
myPostsSuccess,
myPostsFailure,
clearErrorsMyPostSlice,

} = myPostsSlice.actions

export default myPostsSlice.reducer 