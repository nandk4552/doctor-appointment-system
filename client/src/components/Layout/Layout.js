import React from "react";
import "../../styles/Layout.css";
import { adminMenu, userMenu } from "../../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { Avatar, Badge } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  //logout function
  const handleLogout = () => {
    message.success("Logout Successfully");
    localStorage.clear();
    navigate("/login");
  };

  // ============doctor menu=====================
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "User Appointments",
      path: "/doctor/doctor-appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // ============doctor menu=====================
  // rendering menu list
  const SideBarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo  d-flex justify-content-center">
              <img
                src={
                  "https://ik.imagekit.io/fhe9c5aen/doctor-appointment_ms6cF-_uT.svg?updatedAt=1686384334508"
                }
                alt="logo"
                // className="h-50 w-50"
              />
            </div>
            <hr />
            <div className="menu">
              {SideBarMenu?.map((menu) => {
                const isActive = location.pathname === menu?.path;
                return (
                  <div
                    className={`menu-item ${isActive && "active"}`}
                    key={menu?.path}
                  >
                    <i className={menu?.icon}></i>
                    <Link to={menu?.path}>{menu?.name}</Link>
                  </div>
                );
              })}

              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login"> Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content mx-5">
                <Badge
                  count={user?.notification?.length}
                  onClick={() => navigate("/notification")}
                >
                  <i
                    className="fa-solid fa-bell ms-3"
                    style={{ marginRight: "5px" }}
                  >
                    {" "}
                  </i>
                </Badge>
                <Link className="mx-3" to="/profile">
                  {user?.name}
                </Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
