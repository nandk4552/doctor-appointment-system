import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
const BookingPage = () => {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctor, setdoctor] = useState([]);
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [isAvailable, setisAvailable] = useState();
  //login user data
  const getDoctorData = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        setdoctor(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============boooking function===============
  const handleBooking = async () => {
    try {
      setisAvailable(true);
      if (!date && !time) {
        return message.error("Please select date and time");
      }
      dispatch(showLoading());
      const { data } = await axios.post(
        " /api/v1/user/book-appointment",
        {
          userId: user._id,
          doctorId: params.doctorId,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(data);
      dispatch(hideLoading());
      if (data?.success) {
        message.success(data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  //handle check availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/booking-availability",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data?.success) {
        setisAvailable(true);
        message.success(data?.message);
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="title">Booking Page</h1>
      <div className="container border m-2">
        {doctor && (
          <div>
            <h4 className="text-capitalize fw-bold fs-3 lead">
              Dr. {doctor?.firstName} {doctor?.lastName}
            </h4>

            <h5 className="text-capitalize fw-semibold">
              Fees:{" "}
              <span className="text-secondary">
                ₹{doctor?.feesPerConsultation}/-
              </span>
            </h5>
            <h5 className="text-capitalize fw-semibold">
              timings:
              <span className="text-secondary">
                {doctor?.timings && doctor.timings[0]} -{" "}
                {doctor?.timings && doctor.timings[1]}
              </span>
            </h5>
          </div>
        )}

        <div className=" d-flex  flex-column w-50">
          <DatePicker
            format={"DD-MM-YYYY"}
            className="mb-3"
            onChange={(value) => {
              setdate(moment(value).format("DD-MM-YYYY"));
            }}
          />
          <TimePicker
            onChange={(value) => {
              settime(moment(value).format("HH:mm"));
            }}
            format="HH:mm"
            className="mb-3"
          />
          <button
            onClick={handleAvailability}
            className="btn btn-outline-secondary btn-sm "
          >
            <i className="fa-solid fa-check mx-2"></i>
            Check Availability
          </button>
          <button
            onClick={handleBooking}
            className="btn btn-outline-secondary btn-sm  d-flex align-items-center justify-content-center btn-purple"
          >
            <i className="fa-solid fa-book-medical mx-2"></i>
            Book Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
