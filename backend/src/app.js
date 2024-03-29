import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}));
app.use(express.static("public"))
app.use(cookieParser())

import postRouter from "../src/routes/post.routes.js"
import userRouter from "../src/routes/user.routes.js"


app.use("/api/v1/post",postRouter)
app.use("/api/v1/user",userRouter)

export {app}