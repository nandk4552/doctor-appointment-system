import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  docotorAppointmentsController,
  getDoctorByIdController,
  getDoctorInfoController,
  updateAppointmentStatusController,
  updateProfileController,
} from "../controllers/doctorController.js";

const router = express.Router();

// POST || get single doctor info || /api/v1/doctor/getDoctorInfo/:id
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

//POST || update doctor profile || /api/v1/doctor/updateProfile
router.post("/updateProfile", authMiddleware, updateProfileController);

// POST || get single doctor info || /api/v1/doctor/get-single-doctor-info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET || get appointments || /api/v1/doctor/doctor-appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  docotorAppointmentsController
);

//POST || update appointment status || /api/v1/doctor/update-appointment-status
router.post(
  "/update-appointment-status",
  authMiddleware,
  updateAppointmentStatusController
);

export default router;
