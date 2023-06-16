import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointModel.js";
import userModel from "../models/userModel.js";
export const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    if (doctor) {
      res.status(200).send({
        success: true,
        message: "Doctor data fetched successfully",
        data: doctor,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single doctor info",
      error,
    });
  }
};

// to update doctor profile
export const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      { new: true }
    );
    if (doctor) {
      res.status(201).send({
        success: true,
        message: "Doctor profile updated successfully",
        data: doctor,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating doctor profile",
      error,
    });
  }
};

// get single doctor information call back function

export const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    if (doctor) {
      res.status(200).send({
        success: true,
        message: "Single doctor info fetched successfully",
        data: doctor,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting doctor by id",
      error,
    });
  }
};

// getAppointmentsController function
export const docotorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({
      userId: req.body.userId,
    });
    const appointment = await appointmentModel.find({
      docotorId: req.body.doctorId,
    });
    res.status(200).send({
      success: true,
      message: "Appointments fetched successfully",
      data: appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting appointments",
      error,
    });
  }
};

// update appointment status callback function
export const updateAppointmentStatusController = async (req, res) => {
  try {
    //getting from frontend
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status },
      { new: true }
    );
    //notify doctor that you got a new appointment
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status-updated",
      message: `your appointment status has been updated as ${status}`,
      onClickPath: `/docot/doctor-appointments`,
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment status updated ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erro while updating status",
      error,
    });
  }
};
