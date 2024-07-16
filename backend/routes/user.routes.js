
import express from 'express';
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile,followUnfollowUser,getSuggestedUsers,updateUser,getfollowers} from '../controller/usercontroller.js';


const router=express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.get("/suggested", protectRoute, getSuggestedUsers);

router.get("/followers", protectRoute, getfollowers);

router.post("/update", protectRoute, updateUser);






export default router