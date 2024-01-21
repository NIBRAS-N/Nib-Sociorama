import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./Reducers/userSlice.js";

const store = configureStore({
  reducer:{
    user:userReducer
  }
})
export default store