import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, message } from "antd";

const Users = () => {
  const [users, setusers] = useState([]);
  //get users
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Beare ${localStorage.getItem("token")}`,
        },
      });
      if (data?.success) {
        setusers(data?.data);
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // antd table cols
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record?.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger btn-sm">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="title">All Users</h1>

      <div className="container-fluid shadow-sm">
        <Table columns={columns} dataSource={users} />
      </div>
    </Layout>
  );
};

export default Users;
