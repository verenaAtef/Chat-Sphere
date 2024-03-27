/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { ToastContainer } from "react-toastify";
const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    messages: [],
    oneChat: null,
    user: null,
    me: null,
    users: [],
  });
  const [socket, setSocket] = useState(null);
  const token = Cookies.get("jwt");
  useEffect(() => {
    const newSocket = io("https://chat-prod-dvbe.onrender.com", {
      withCredentials: true,
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (message) => {
        setData((prevData) => ({
          ...prevData,
          messages: [...prevData.messages, message],
        }));
      });
    }
  }, [socket]);
  useEffect(() => {
    if (socket && data.oneChat) {
      socket.emit("sendMessage", { chatId: data.oneChat._id });
    }
  }, [socket, data.oneChat]);
  useEffect(() => {
    if (socket) {
      socket.emit("addNewUser", data.me?._id);
    }
  }, [socket, data.me]);
  const createChat = async (id) => {
    try {
      const response = await axios.post(
        "https://chat-prod-dvbe.onrender.com/api/v1/chats/",
        { receivedId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
  const fetchChatData = async (meId, selectedUserId) => {
    try {
      let chatData = null;
      const chatResponse1 = await axios.get(
        `https://chat-prod-dvbe.onrender.com/api/v1/chats/find/${meId}/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      chatData = chatResponse1.data.data;
      if (!chatData) {
        const chatResponse2 = await axios.get(
          `https://chat-prod-dvbe.onrender.com/api/v1/chats/find/${selectedUserId}/${meId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        chatData = chatResponse2.data.data;
      }
      if (chatData) {
        setData((prevData) => ({ ...prevData, oneChat: chatData }));
        const messagesResponse = await axios.get(
          `https://chat-prod-dvbe.onrender.com/api/v1/messages/${chatData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData((prevData) => ({
          ...prevData,
          messages: messagesResponse.data.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };
  const sendMessage = async (content, chatId) => {
    try {
      const response = await axios.post(
        "https://chat-prod-dvbe.onrender.com/api/v1/messages/",
        { content, chatId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) => ({
        ...prevData,
        messages: [...prevData.messages, response.data],
      }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const getUser = async (selectedUserId) => {
    try {
      const res = await axios.get(
        `https://chat-prod-dvbe.onrender.com/api/v1/users/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) => ({ ...prevData, user: res.data.data }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://chat-prod-dvbe.onrender.com/api/v1/users/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData((prevData) => ({ ...prevData, users: response.data.data }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const deleteChat = async (chatId) => {
    try {
      await axios.delete(
        `https://chat-prod-dvbe.onrender.com/api/v1/chats/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const res = await axios.get(
            "https://chat-prod-dvbe.onrender.com/api/v1/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData((prevData) => ({ ...prevData, me: res.data.data }));
          fetchUsers();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <DataContext.Provider
      value={{
        data,
        fetchChatData,
        sendMessage,
        deleteChat,
        getUser,
        createChat,
      }}
    >
      {children}
      <ToastContainer />
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

// let onlineUsers = [];

// io.on('connection', (socket) => {
//     console.log('new connection', socket.id);

//     // Add new user
//     socket.on('addNewUser', (userId) => {
//         if (!onlineUsers.some(user => user.userId === userId)) {
//             onlineUsers.push({
//                 userId,
//                 socketId: socket.id,
//             });
//         }
//         console.log('onlineUsers', onlineUsers);
//         io.emit('getOnlineUsers', onlineUsers);
//     });

//     // Add message
//     socket.on('sendMessage', (message) => {
//         const user = onlineUsers.find((user) => user.userId === message.recipientId);
//         console.log('sending from socket to:', message.recipientId);
//         console.log('Message', message);

//         if (user) {
//             io.to(user.socketId).emit('getMessage', message);
//             io.to(user.socketId).emit('getNotification', {
//                 senderId: message.senderId,
//                 isRead: false,
//                 date: new Date(),
//             });
//         }
//     });
// });
