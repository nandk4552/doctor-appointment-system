import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import moment from "moment";
//* register call back function
export const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //* replacing the plain text password with the hashed password
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller Error: ${error.message}`,
      error,
    });
  }
};
//* login call back function
export const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User does not exists",
      });
    }
    //* compare the password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    //* create a token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Login Controller Error: ${error.message}`,
    });
  }
};

// auth controller callback function
export const authController = async (req, res) => {
  try {
    const user = await userModel
      .findById({ _id: req.body.userId })
      .select("-password");

    if (!user) {
      return res.status(200).send({
        success: false,
        message: "User does not exists",
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Auth Controller Error",
      error,
    });
  }
};

// apply doctor controller callback function
export const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel.create({
      ...req.body,
      status: "pending",
    });
    await newDoctor.save();
    //* notify admin that you got a apply doctor request
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-req",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Apply Doctor Controller Error",
      error,
    });
  }
};

// get all notification controller callback function
export const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All Notifications are marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Notification Controller Error",
      error,
    });
  }
};

export const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ _id: req.body.userId })
      .select("-password");
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      data: updatedUser,
      message: "All Notifications deleted Successfully...!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete  all notifications",
    });
  }
};

export const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });

    if (doctors) {
      res.status(200).send({
        success: true,
        message: "Doctor list fetched successfully",
        data: doctors,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to get all doctors",
      error,
    });
  }
};

// book appointment controller callback function
export const bookAppointmentController = async (req, res) => {
  try {
    //convert date and time into iso format using moment
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    //notify doctor that you got a new appointment
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "new-appointment-request",
      message: `A New Appointment Request From ${req.body.userInfo.user.name}`,
      onClickPath: `/user/appointments`,
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Book Appointment Controller Error",
      error,
    });
  }
};

// book appointment controller callback function
export const bookAvailabilityController = async (req, res) => {
  try {
    //getting date and time
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    //delay of 1hr between current time and from time appointment
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();

    const docotorId = req.body.doctorId;

    const appointments = await appointmentModel.find({
      docotorId,
      date,
      //search fromtime - totime
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Appointment not available for this time",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments Available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Book Availability Controller Error",
      error,
    });
  }
};

// get appointments list controller callback function
export const userAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    if (appointments) {
      return res.status(200).send({
        success: true,
        message: "User appointments fetched successfully",
        data: appointments,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user appointment controller",
      error,
    });
  }
};
