import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userRegister,userLogin,followUser,logout,updatePassword,updateProfile,deleteUser,myProfile, getAllUser,getUserProfile,forgotPassword,resetPassword,getMyPosts,getUserPosts } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

// router.route("/user/login").post(createPost)

router.route("/register").post(upload.single("avatar"),userRegister)
router.route("/login").post(userLogin)
router.route("/follow/:id").get(verifyJWT,followUser)
router.route("/logout").post(verifyJWT,logout)
router.route("/updatePassword").put(verifyJWT,updatePassword)
router.route("/updateProfile").put(verifyJWT,upload.single("avatar"),updateProfile)
router.route("/deleteUser").delete(verifyJWT,deleteUser)
router.route("/me").get(verifyJWT,myProfile)
router.route("/all-users").post(verifyJWT,getAllUser)
router.route("/:id").get(verifyJWT,getUserProfile)
router.route("/my/posts").get(verifyJWT,getMyPosts)
router.route("/userposts/:id").get(verifyJWT , getUserPosts);
router.route("/forgot/password").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)


export default router;