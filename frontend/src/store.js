import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./Reducers/userSlice.js";
import postOfFollowingSlice from "./Reducers/postOfFollowingSlice.js";
import alluserSlice from "./Reducers/allUserSlice.js"
import likeSlice from "./Reducers/likeSlice.js";
import myPostsSlice from "./Reducers/myPostSlice.js";
import userProfileSlice from "./Reducers/userProfileSlice.js";
import userPostsSlice from "./Reducers/userPostSlice.js";

const store = configureStore({
  reducer:{
    user:userReducer,
    postOfFollowing:postOfFollowingSlice,
    allUsers: alluserSlice,
    like:likeSlice,
    myPosts: myPostsSlice,
    userProfile: userProfileSlice,
    userPosts: userPostsSlice,
  }
})
export default store