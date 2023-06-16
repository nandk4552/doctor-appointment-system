import React from "react";
import Layout from "../components/Layout/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user?.seennotification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
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
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/delete-all-notification",
        {
          userId: user._id,
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
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something wen wrong!");
    }
  };

  return (
    <Layout>
      <h1 className="title">Notifications</h1>
      <Tabs>
        <Tabs.Items tab="UnRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4 className="p-2 fw-semibold pointer" onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((msg) => (
            <div
              style={{ cursor: "pointer" }}
              className="card"
              onClick={() => navigate(msg?.onClickPath)}
            >
              <div className="card-text">{msg?.message}</div>
            </div>
          ))}
        </Tabs.Items>
        <Tabs.Items tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h6
              className="p-2 fw-semibold text-danger mx-2  pointer text-bg-warning  rounded shadow-sm   "
              onClick={handleDeleteAllRead}
            >
              Delete All Read
              <i className="fa-solid fa-trash ms-2"></i>
            </h6>
          </div>
          {user?.seennotification.map((notification) => (
            <div
              style={{ cursor: "pointer" }}
              className="card"
              onClick={() => navigate(notification?.onClickPath)}
            >
              <div className="card-text">{notification?.message}</div>
            </div>
          ))}
        </Tabs.Items>
      </Tabs>
    </Layout>
  );
};

export default Notification;
