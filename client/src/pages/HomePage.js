import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setdoctors] = useState([]);
  //login user data
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data?.success) {
        setdoctors(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);
  return (
    <Layout>
      <h1 className="title">Doctors List</h1>
      <div className="container">
        <Row>
          {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
