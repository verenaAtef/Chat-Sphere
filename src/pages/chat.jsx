/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ChatUI from "../components/chatUi";
import Users from "../components/userschat";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Chat() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showChat, setShowChat] = useState(false);
  // const [showChatButton, setShowChatButton] = useState(window.innerWidth < 800);
  const handleToggleChat = () => {
    setShowChat(false);
  };
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);
  useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    setShowChat(true);
  };
  const [me, setMe] = useState(null);
  useEffect(() => {
    fetchUsers();
  }, []);
  const token = Cookies.get("jwt");
  const fetchUsers = async () => {
    try {
      const Meresponse = await axios.get(
        "https://chat-prod-dvbe.onrender.com/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMe(Meresponse.data.data);
    } catch (error) {
      // console.error("Error fetching current user: " + error.message);
      // toast.error(error.message);
    }
  };
  return (
    <>
      <div style={{ display: "flex", paddingLeft: "10px", gap: "0" }}>
        <div
          style={{
            width: windowWidth > 800 ? "30%" : "100%",
            display:
              (windowWidth < 800 && !showChat) || windowWidth > 800
                ? "flex"
                : "none",
          }}
        >
          <Users onUserSelect={handleUserSelect} me={me} />
        </div>
        <div
          style={{
            width: windowWidth > 800 ? "70%" : "100%",
            display:
              (windowWidth < 800 && !selectedUserId) || !showChat
                ? "none"
                : "flex",
          }}
        >
          <ChatUI
            selectedUserId={selectedUserId}
            me={me}
            onlineUser={{ id: 1, name: "John", isOnline: true }}
          />
        </div>
        <IconButton
          onClick={handleToggleChat}
          style={{
            display:
              windowWidth > 800 || (windowWidth < 800 && !showChat)
                ? "none"
                : "flex",
            alignSelf: "center",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <ToastContainer />
      </div>
    </>
  );
}

export default Chat;
