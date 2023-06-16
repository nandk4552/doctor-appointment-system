import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

// to get all users and display it on the admin panel
export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};
//to get all doctors
export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "doctos data list",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting doctors",
      error,
    });
  }
};

// to change account status  of doctors
export const changeAccountStatusController = async (req, res) => {
  try {
    // form  frontend
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );
    //finding the user and sending the notification to the user
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your doctor account status request has been ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();

    res.status(201).send({
      success: true,
      message: "Account status updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while changing account status",
      error,
    });
  }
};
