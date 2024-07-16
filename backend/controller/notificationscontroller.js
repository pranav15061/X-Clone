import Notification from "../model/notificationmodel.js";

export const getNotifications = async (req, res) => {
  try {
    const userid = req.user._id;

    const notifications = await Notification.find({ to: userid }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ to: userid }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userid = req.user._id;

    await Notification.deleteMany({ to: userid });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications function", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//  For only, sample not used further
// export const deleteNotification = async(req,res)=>{
//     try {

//            const userid=req.user._id;
//            const {id:notificationsid}=req.params;

//            const notifications = await Notification.findById(notificationsid);

//            if(!notifications)
//             {
//                 return res.status(404).json({error:"Notifications not found"});
//             }

//             if(notifications.to.toString()!==userid.toString()) {
//                 return res.status(403).json({error:"You are not allowed to delete this notification"});
//             }

//             await Notification.findByIdAndDelete(notificationsid);

//             res.status(200).json({message:"Notifications deleted successfully"});
//     } catch (error) {
//         console.log("Error in deleteNotifications function", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }
