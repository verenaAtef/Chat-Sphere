/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useEffect } from "react";
import { Typography } from "@mui/material";
// import { Box } from "@mui/system";
import { useData } from "../contexts/dataContext";
import DeleteIcon from "@mui/icons-material/Delete";
const Navbar = ({ selectedUserId }) => {
  const { data, deleteChat, getUser } = useData();
  const handleDeleteClick = async () => {
    console.log(selectedUserId);
    if (!selectedUserId) return;
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the conversation?"
    );
    if (isConfirmed) {
      try {
        await deleteChat(selectedUserId);
        console.log(selectedUserId);
      } catch (error) {
        console.error("Error deleting chat:", error);
      }
    }
  };
  useEffect(() => {
    if (selectedUserId) {
      getUser(selectedUserId);
      console.log(getUser(selectedUserId));
    }
  }, [selectedUserId]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "5px",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#78aaa1",
        height: "23px",
        width: "95%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.user && (
          <div style={{ position: "relative" }}>
            <img
              src={data.user.photo}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
          </div>
        )}
        <Typography variant="subtitle1" style={{ margin: "0" }}>
          {data.user ? data.user.name : ""}
        </Typography>
      </div>
      <div onClick={handleDeleteClick}>
        <DeleteIcon style={{ fontSize: "30px", color: "white" }} />
      </div>
    </div>
  );
};

export default Navbar;
