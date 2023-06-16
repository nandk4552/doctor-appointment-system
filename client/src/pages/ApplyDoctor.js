import React from "react";
import Layout from "../components/Layout/Layout";
import { Form, Row, Col, Input, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
const ApplyDoctor = () => {
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/apply-doctor",
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
  return (
    <Layout>
      <h1 className="title">Apply Doctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-3">
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
                { required: true, message: "Please enter your email address" },
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
              rules={[{ required: true, message: "Please enter your address" }]}
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
                { required: true, message: "Please enter your specialization" },
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
              <button className="btn-purple shadow-sm">Submit</button>
            </div>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
