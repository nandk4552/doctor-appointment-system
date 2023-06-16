import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Row, Col, Input, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import moment from "moment";
const Profile = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get single doctor details
  const getDoctorInfo = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data?.success) {
        setDoctor(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user?._id,
          timings: [
            moment(values?.timings[0]).format("HH:mm"),
            moment(values?.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data?.success) {
        message.success(data?.message);
        navigate("/");
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="title">Manage Profile</h1>
      {doctor && (
        <Form
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}
          onFinish={handleFinish}
          layout="vertical"
          className="m-3"
        >
          <h4 className="heading">Personal Details</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name={"firstName"}
                required
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input type="text" placeholder="Enter your name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name={"lastName"}
                required
                rules={[
                  { required: true, message: "Please enter your Last name" },
                ]}
              >
                <Input type="text" placeholder="Enter your last name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name={"phone"}
                required
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input type="text" placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="email address"
                name={"email"}
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                ]}
              >
                <Input type="email" placeholder="Enter your email address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="website" name={"website"}>
                <Input type="text" placeholder="Enter your website link" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name={"address"}
                required
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input type="text" placeholder="Enter your address" />
              </Form.Item>
            </Col>
          </Row>
          <h4 className="heading  ">Professional Details:</h4>

          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="specialization"
                name={"specialization"}
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter your specialization",
                  },
                ]}
              >
                <Input type="text" placeholder="Enter your specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="experience"
                name={"experience"}
                required
                rules={[
                  { required: true, message: "Please enter your experience" },
                ]}
              >
                <Input type="text" placeholder="Enter your experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="fees Per Consultation"
                name={"feesPerConsultation"}
                required
                rules={[
                  {
                    required: true,
                    message: "Please enter your fees Per Consultation",
                  },
                ]}
              >
                <Input
                  type="number"
                  placeholder="Enter your Fees Per Consultation"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="timings"
                name="timings"
                required
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker format={"HH:mm"} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <div className="d-flex   align-items-center mb-5 pb-5">
                <button className="btn-purple shadow-sm">
                  <i className="fa-regular fa-pen-to-square mx-2"></i>
                  Update Profile
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
