import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from 'react-router-dom'
import { loadUser } from "./Actions/user.actions.js";
import { useEffect } from "react";
import {Loader,Header} from "./index.js"

function App() {

  
  const dispatch = useDispatch();
  const [loader,setLoader] = useState(true)
  

  useEffect(() => {

    dispatch(loadUser());
    setLoader(false)
  }, [dispatch]);

  const {isAuthenticated} = useSelector((state)=>state.user)
  
  
  return !loader ?  (
    <>
      {isAuthenticated && <Header/>}
      <main>
          <Outlet/>
      </main>
      
    </>
  ):<Loader/>
}

export default App
