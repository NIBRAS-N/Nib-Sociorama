import React, { useState } from 'react'
import Header from './components/Header/Header.jsx'
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from 'react-router-dom'
import { loadUser } from './Actions/user.action.js';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {Login} from './components/index.js'
function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [loader,setLoader] = useState(true)
  useEffect(async() => {

    await dispatch(loadUser());
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
  ):<h1>Loading....</h1>
}

export default App
