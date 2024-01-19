import { Router } from "express";
import { createPost,likeAndUnlikePost,deletePost,getPostOfFollowing,upadateCaption,addComment, deleteComment } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/upload").post(verifyJWT,upload.single("image"),createPost)
router.route("/:id")
    .get(verifyJWT,likeAndUnlikePost)
    .put(verifyJWT,upadateCaption)
    .delete(verifyJWT,deletePost)
router.route("/following-post").post(verifyJWT,getPostOfFollowing)
router.route("/comment/:id").put(verifyJWT,addComment).delete(verifyJWT,deleteComment)
export default router;
    