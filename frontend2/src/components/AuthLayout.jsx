import React , {useEffect,useState} from "react"
import { useSelector , useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom'
// import { loadUser } from "../Actions/user.action"
import {Loader,Login} from "../index.js"

export default function Protected({children,authentication=true}){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true)
    const [checkAuth,setCheckAuth] = useState(false)

    
    
    
    const {isAuthenticated} = useSelector((state)=>state.user)
    // console.log(isAuthenticated)
    
    useEffect(() => {  
      if(isAuthenticated) {setCheckAuth(true),setLoader(false) }
      else setCheckAuth(false),setLoader(true)
      // else navigate("/")
      // if(authentication && isAuthenticated !== authentication){
        
      //   navigate("/login")
      // }
      // else if(!authentication && isAuthenticated!==authentication){
        
      //   navigate("/")
      // }

      // setLoader(false)
      
    }, [isAuthenticated,authentication]);


    return loader && !checkAuth ? <Login/> : <>{children}</>
}