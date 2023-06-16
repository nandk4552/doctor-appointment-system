import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Table, message } from "antd";
const Doctors = () => {
  const [doctors, setdoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data?.success) {
        setdoctors(data?.data);
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const { data } = await axios.post(
        "/api/v1/admin/change-account-status",
        { doctorId: record._id, userId: record.userId, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        message.success(data?.message);
        getDoctors();
      }
    } catch (error) {
      message.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record?.firstName} {record?.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex">
          {record?.status === "pending" ? (
            <span className="badge text-bg-warning">Pending</span>
          ) : (
            <span className="badge text-bg-success">Approved</span>
          )}
        </div>
      ),
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record?.status === "pending" ? (
            <button
              onClick={() => handleAccountStatus(record, "approved")}
              className="shadow-sm btn btn-outline-success btn-sm fw-semibold"
            >
              <i className="fa-solid fa-thumbs-up me-2 d-flex align-items-center justify-content-center"></i>
              Approve
            </button>
          ) : (
            <button className="shadow-sm btn btn-danger btn-sm fw-semibold d-flex align-items-center justify-content-center ">
              <i className="fa-solid fa-circle-xmark me-1"></i> Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="title">All Doctors</h1>
      <div className="container-fluid shadow-sm">
        <Table columns={columns} dataSource={doctors} />
      </div>
    </Layout>
  );
};

export default Doctors;
