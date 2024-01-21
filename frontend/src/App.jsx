import React from 'react'
import Header from './components/Header/Header.jsx'
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from 'react-router-dom'
import { loadUser } from './Actions/user.action.js';
import { useEffect } from "react";
function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(loadUser());

  }, [dispatch]);

  const {isAuthenticated} = useSelector((state)=>state.user)
  return (
    <>
      {isAuthenticated && <Header/>}
      <main>
          <Outlet/>
      </main>
      
    </>
  )
}

export default App
