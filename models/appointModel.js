import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      requied: true,
    },
    doctorId: {
      type: String,
      requied: true,
    },
    doctorInfo: {
      type: Object,
      requied: true,
    },
    userInfo: {
      type: Object,
      requied: true,
    },
    date: {
      type: String,
      requied: true,
    },
    status: {
      type: String,
      requied: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("Appointment", appointmentSchema);
export default appointmentModel;
