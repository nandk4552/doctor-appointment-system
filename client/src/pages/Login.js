import React from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());

      if (data?.success) {
        //* saving token in local storage
        localStorage.setItem("token", data?.token);
        message.success(`Logged in successfully`);
        navigate("/");
      } else {
        dispatch(hideLoading());
        message.error(data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="card p-5 shadow"
        >
          <h3 className="text-center text-uppercase fw-bold">
            Login into to DA
          </h3>
          <Form.Item label="Email" name={"email"}>
            <Input type="text" placeholder="Enter email" required />
          </Form.Item>
          <Form.Item label="Password" name={"password"}>
            <Input type="password" placeholder="Enter password" required />
          </Form.Item>
          <h6 className="mb-3">
            Not a user ?{" "}
            <Link to="/register" className="text-warning fw-bold">
              Register Here !
            </Link>
          </h6>
          <button type="submit" className="btn btn-primary shadow-sm">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
