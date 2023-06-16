import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (data.success) {
        message.success(`Registered successfully`);
        navigate("/login");
      } else {
        dispatch(hideLoading());
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form-container ">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="card p-5 shadow"
        >
          <h3 className="text-center text-uppercase fw-bold">
            Register into to DA
          </h3>
          <Form.Item label="Name" name={"name"}>
            <Input type="text" placeholder="Enter name" required />
          </Form.Item>
          <Form.Item label="Email" name={"email"}>
            <Input type="text" placeholder="Enter email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" placeholder="Enter password" required />
          </Form.Item>
          <h6 className="mb-3">
            Already a user ?{" "}
            <Link to="/login" className="text-warning fw-bold">
              Login Here !User created
            </Link>
          </h6>
          <button type="submit" className="btn btn-primary shadow-sm">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
