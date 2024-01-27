import React , {useEffect,useState} from "react"
import { useSelector , useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom'
import { loadUser } from "../Actions/user.action"


export default function Protected({children,authentication=true}){
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true)

    const {isAuthenticated} = useSelector((state)=>state.user)
    

    // console.log(isAuthenticated,authentication)
    useEffect(() => {  
      
      if(authentication && isAuthenticated != authentication){
        // console.log("lol from login")
        navigate("/login")
      }
      else if(!authentication && isAuthenticated!=authentication){
        // console.log("lol from home")
        navigate("/")
      }

      setLoader(false)
      
    }, [isAuthenticated,authentication,navigate]);


    return loader ? <h1>Loading...</h1> : <>{children}</>
}