import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
const Appointments = () => {
  const [appointments, setapppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/user-appointments", {
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
    getAppointments();
  }, []);

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

export default Appointments;
