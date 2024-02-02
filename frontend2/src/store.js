import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./Slices/userSlice.js";
import postOfFollowingSlice from "./Slices/postOfFollowingSlice.js";
import allUsersSlice from "./Slices/allUserSlice.js";
import likeSlice from "./Slices/likeSlice.js";
import myPostsSlice from "./Slices/myPostSlice.js"
import userPostsSlice from "./Slices/userPostSlice.js";
import userProfileSlice from "./Slices/userProfileSlice.js";
// import userProfileSlice from "./Reducers/userProfileSlice.js";
// import userPostsSlice from "./Reducers/userPostSlice.js";

const store = configureStore({
  reducer:{
    user:userReducer,
    postOfFollowing:postOfFollowingSlice,
    allUsers: allUsersSlice,
    like:likeSlice,
    myPosts: myPostsSlice,
    userProfile: userProfileSlice,
    userPosts: userPostsSlice,
  }
})
export default store