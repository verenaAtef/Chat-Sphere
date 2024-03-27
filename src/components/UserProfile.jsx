/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useData } from "../contexts/dataContext";

export default function AnchorTemporaryDrawer() {
  const [state, setState] = useState({});
  const { data } = useData();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Stack
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      style={{ backgroundColor: "#f0f2f5", position: "relative" }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Stack
        sx={{
          top: "0px",
          height: "50px",
          display: "flex",
          backgroundColor: "#78aaa1",
          justifyContent: "space-between",
          paddingBottom: "10px",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
          width: "100%",
          color: "#fff",
        }}
      >
        <ArrowBackIcon
          style={{ marginInline: "30px", cursor: "pointer" }}
          onClick={toggleDrawer(anchor, false)}
        />
        <Typography
          sx={{ fontSize: "1.2rem", fontWeight: "500", letterSpacing: "0.5px" }}
        >
          Profile
        </Typography>
        <Typography>
          <Link to="/updateprofile">
            <EditIcon style={{ fontSize: 30, color: "white" }} />
          </Link>
        </Typography>
      </Stack>
      <Avatar
        alt="Remy Sharp"
        src={data.me && data.me.photo}
        sx={{
          width: 220,
          height: 220,
          position: "absolute",
          top: "80px",
          left: "50px",
        }}
      />
      <Stack
        padding={"10px 0px 0px 30px"}
        sx={{
          height: "100px ",
          width: " 100%",
          position: "absolute",
          top: "300px",
        }}
      >
        <Typography>
          <Typography color={"#78aaa1"} fontSize={"25px"}>
            Your name
          </Typography>
          <Typography marginTop={"15px"}>{data.me && data.me.name}</Typography>
        </Typography>
      </Stack>
    
      <Stack
        padding={"10px 0px 0px 30px"}
        sx={{
          height: "100px ",
          width: " 91.5%",
          position: "absolute",
          top: "440px",
        }}
      >
        <Typography>
          <Typography color={"#78aaa1"} fontSize={"25px"}>
            E-mail
          </Typography>
          <Typography marginTop={"15px"}>{data.me && data.me.email}</Typography>
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <div>
      <Button onClick={toggleDrawer("left", true)}>
        <Avatar
          alt="Remy Sharp"
          src={data.me && data.me.photo}
          style={{ width: "40px", height: "40px", left: "20px" }}
        />
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <ToastContainer />
    </div>
  );
}
