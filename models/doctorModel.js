import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
      trim: true, //remove space
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
      trim: true, //remove space
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please enter your address"],
    },
    specialization: {
      type: String,
      required: [true, "Please enter your specialization"],
    },
    experience: {
      type: String,
      required: [true, "please enter your experience"],
    },
    feesPerConsultation: {
      type: Number,
      required: [true, "Please enter your fees per consultation"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "Please enter your timings"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctors", doctorSchema);
