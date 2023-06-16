import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  changeAccountStatusController,
  getAllDoctorsController,
  getAllUsersController,
} from "../controllers/adminController.js";

const router = express.Router();

// GET || users || /api/v1/admin/users
router.get("/getAllUsers", authMiddleware, getAllUsersController);

//GET || DOctors || /api/v1/admin/doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);

//POST || ACCOUNT STATUS || /api/v1/admin/change-account-status

router.post(
  "/change-account-status",
  authMiddleware,
  changeAccountStatusController
);

export default router;
