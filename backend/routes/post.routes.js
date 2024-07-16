import express from 'express';
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost,deletePost,commentOnPost,likeUnlikePost,getallposts,getLikedPosts,getFollowingPosts,getUserPosts} from '../controller/postcontroller.js';

const router=express.Router();


router.get('/all',protectRoute,getallposts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/user/:username", protectRoute, getUserPosts);

router.post("/create", protectRoute, createPost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);



export default router;