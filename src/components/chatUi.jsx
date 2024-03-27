/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Typography } from "@mui/material";
import { Box as MuiBox } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./navbarChat";
import { useData } from "../contexts/dataContext";
const ChatUI = ({ onlineUser, selectedUserId, me }) => {
  const { data, fetchChatData, sendMessage } = useData();
  const { messages, oneChat } = data;
  const [newMessage, setNewMessage] = useState("");
  const [labelValue, setLabelValue] = useState("");
  useEffect(() => {
    if (selectedUserId && me) {
      fetchChatData(me._id, selectedUserId);
    }
  }, [selectedUserId]);
  const handleSendMessage = async () => {
    if (newMessage.trim() === "" || !oneChat?._id) return;
    try {
      await sendMessage(newMessage, oneChat._id);
      setNewMessage("");
      setLabelValue("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message:", error);
    }
  };
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };
  const ChatMessage = ({ message }) => {
    if (
      !message ||
      !message.content ||
      !message.senderId ||
      !message.senderId._id
    ) {
      return null;
    }
    const messageBackground =
      message.senderId?._id === me?._id ? "#78aaa1" : "#E0E0E0";
    const time = message.createdAt
      ? new Date(message.createdAt).toLocaleTimeString()
      : "";
    const alignSelf =
      message.senderId?._id === me?._id ? "flex-end" : "flex-start";
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: alignSelf,
        }}
      >
        <MuiBox
          sx={{
            margin: "5px",
            flexDirection: "column",
            alignItems: alignSelf,
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: messageBackground,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <Typography variant="body1">{message.content}</Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ fontSize: "0.8rem" }}
          >
            {time}
          </Typography>
        </MuiBox>
      </div>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "95vh",
      }}
    >
      <Navbar selectedUserId={selectedUserId} onlineUser={onlineUser} />
      <Box
        sx={{ flexGrow: 1, overflowY: "auto", padding: "10px" }}
        key={data.message?._id}
      >
        {messages.length > 0 &&
          messages.map(
            (message, index) =>
              message && <ChatMessage key={index} message={message} />
          )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <TextField
          value={newMessage}
          onChange={handleInputChange}
          variant="outlined"
          label={labelValue || "Type a message"}
          fullWidth
          sx={{ borderRadius: "20px", marginRight: "10px" }}
        />
        <Button onClick={handleSendMessage}>
          <SendIcon style={{ color: "#78aaa1" }} />
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ChatUI;
