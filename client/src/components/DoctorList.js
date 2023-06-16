import React from "react";
import { useNavigate } from "react-router-dom";
const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => navigate(`/doctor/book-appointment/${doctor?._id}`)}
        className="card shadow-sm pointer m-2"
      >
        <div className="card-header text-capitalize ">
          Dr. {doctor?.firstName} {doctor?.lastName}
        </div>
        <div className="card-body">
          <p className="text-capitalize fw-semibold">
            specialization:{" "}
            <span className=" text-secondary ">{doctor?.specialization}</span>
          </p>
          <p className="text-capitalize fw-semibold">
            Experience:{" "}
            <span className="text-secondary">{doctor?.experience} yrs</span>
          </p>
          <p className="text-capitalize fw-semibold">
            fees Per Consultation:{" "}
            <span className="text-secondary">
              ₹{doctor?.feesPerConsultation}/-
            </span>
          </p>
          <p className="text-capitalize fw-semibold">
            timings:{" "}
            <span className="text-secondary">
              {doctor?.timings[0]} - {doctor?.timings[1]}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
