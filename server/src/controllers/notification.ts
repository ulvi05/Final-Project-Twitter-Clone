import { Request, Response } from "express";
import Notification from "../mongoose/schema/notification";

const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const notifications = await Notification.find({
      to: userId,
      from: { $ne: userId },
    }).populate({
      path: "from",
      select: "username profileImage",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const deleteNotification = async (req: Request, res: Response) => {
//   try {
//     const notificationId = req.params.id;
//     const userId = req.user?._id;
//     const notification = await Notification.findById(notificationId);

//     if (!notification) {
//       res.status(400).json({ error: "Notification not found" });
//       return;
//     }

//     if (notification.to.toString() !== userId?.toString()) {
//       res
//         .status(403)
//         .json({ error: "You are not allowed to delete this notification" });
//       return;
//     }

//     await Notification.findByIdAndDelete(notificationId);
//     res.status(200).json({ message: "Notification deleted successfully" });
//   } catch (error) {
//     console.log("Error in deleteNotification: ", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

export default {
  getNotifications,
  deleteNotifications,
  //   deleteNotification,
};
