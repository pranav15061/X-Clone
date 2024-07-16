import express from 'express';
import { protectRoute } from "../middleware/protectRoute.js";
import { getNotifications,deleteNotifications} from '../controller/notificationscontroller.js';


const router=express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

//  For only, sample not used further
// router.delete("/:id", protectRoute, deleteNotification);


export default router;