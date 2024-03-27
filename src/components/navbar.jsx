/* eslint-disable no-unused-vars */
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AnchorTemporaryDrawer from "./UserProfile";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../assets/logo-color.png";

export default function DrawerAppBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("https://chat-prod-dvbe.onrender.com/api/v1/auth/logout")
      .then((res) => {
        localStorage.removeItem("user");
        Cookies.remove("jwt", res.data.token);
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          paddingLeft: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#78aaa1",
          color: "white",
        }}
      >
        <div>
          <p style={{ fontSize: "20px", color: "white" }}>Chatsphere</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "50%",
            alignItems: "center",
          }}
        >
          <AnchorTemporaryDrawer />
          <LogoutOutlinedIcon fontSize="large" onClick={handleLogout} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
