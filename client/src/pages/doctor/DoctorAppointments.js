import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, message } from "antd";
import moment from "moment";
import Layout from "../../components/Layout/Layout";
const DoctorAppointments = () => {
  const [appointments, setapppointments] = useState([]);

  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get("/api/v1/doctor/doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data?.success) {
        setapppointments(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorAppointments();
  }, []);
  const handleStatus = async (record, status) => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/update-appointment-status",
        {
          appointmentsId: record?._id,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        message.success(data?.message);
        getDoctorAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  //antd table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      render: (text, record) => (
        <span className="text-capitalize">
          {record.doctorInfo?.firstName} {record.doctorInfo?.lastName}
        </span>
      ),
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorInfo?.phone}</span>,
    },

    {
      title: "DATE & TIME",
      dataIndex: "date",
      render: (text, record) => (
        <span className="badge text-bg-warning">
          {moment(record?.date).format("DD-MM-YYYY")} -{" "}
          {moment(record?.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record?.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn mx-2 btn-outline-success btn-sm"
                onClick={() => handleStatus(record, "approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  console.log(appointments);
  return (
    <Layout>
      <h1 className="title">Appointments</h1>
      <div className="container-fluid">
        <Table columns={columns} dataSource={appointments} />
      </div>
    </Layout>
  );
};

export default DoctorAppointments;
