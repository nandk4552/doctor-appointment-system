import express from "express";
import {
  authController,
  loginController,
  registerController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookAppointmentController,
  bookAvailabilityController,
  userAppointmentController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

//* router object
const router = express.Router();

//* routes
//* REGISTER || POST || /api/v1/user/register
router.post("/register", registerController);

//* LOGIN || POST || /api/v1/user/login
router.post("/login", loginController);

//* Auth || POST || /api/v1/user/getUserData
router.post("/getUserData", authMiddleware, authController);

//* Apply Doctor || POST || /api/v1/user/getUserData
router.post("/apply-doctor", authMiddleware, applyDoctorController);

//*get notification || POST || /api/v1/user/getUserData
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//*delete notification || POST || /api/v1/user/getUserData
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

// GET ALL DOCTORS
router.get("/get-all-doctors", authMiddleware, getAllDoctorsController);

/*
 ======
BOOK APPOINTMENT
======
*/
// POST || book appointment || /api/v1/user/book-appointment
router.post("/book-appointment", authMiddleware, bookAppointmentController);

// POST || Booking availability || /api/v1/user/booking-availability
router.post(
  "/booking-availability",
  authMiddleware,
  bookAvailabilityController
);

//GET || appointment list || /api/v1/user/user-appointments
router.get("/user-appointments", authMiddleware, userAppointmentController);
export default router;
