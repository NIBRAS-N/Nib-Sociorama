import axios from "axios";
import { LoginFailure,LoginRequest,LoginSuccess,RegisterRequest,
    RegisterSuccess,
    RegisterFailure,
    LoadUserRequest,
    LoadUserSuccess,
    LoadUserFailure,
    LogoutUserRequest,
    LogoutUserSuccess,
    LogoutUserFailure,
    clearErrors } from "../Reducers/userSlice.js";

const loginUser = (email,password) => async(dispatch) =>{
    try {
        // dispatch(login(userData))
        // dispatch({
        //     type:"LoginRequest"
        // });
        await dispatch(LoginRequest())
        const response = await axios.post(
            "/api/v1/user/login",
            {email,password},
            {
                headers:{
                    "Content-Type":"application/json"
                }
            }
        )    
    // const res = await dispatch({
    //     type:"LoginSuccess",
    //     payload:response.data
    // })
    await dispatch(LoginSuccess(response.data?.data?.loggedInUser))
    // console.log(res.payload.data.loggedInUser)
    // console.log("lol",response)


       
       
    } catch (error) {
        // dispatch({
        //     type: "LoginFailure",
        //     payload: error.response?.data.message,
        // })
        await dispatch(LoginFailure(error?.message))
    }
}


const loadUser = () => async (dispatch) => {
    try {

      await dispatch(LoadUserRequest());
  
      const response = await axios.get("/api/v1/user/me");
        // console.log(response)    
      await dispatch(LoadUserSuccess(response?.data?.data));

    } catch (error) {

      dispatch(LoadUserFailure(error?.message));

    }
};

export {loginUser,loadUser}