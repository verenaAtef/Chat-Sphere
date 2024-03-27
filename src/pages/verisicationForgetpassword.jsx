/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import img from "../assets/Two factor authentication-bro.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
function Verificationforget() {
  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isValidate = () => {
    let result = true;
    if (resetCode === "" || resetCode === null) {
      result = false;
      toast.warning("Please enter code");
    }

    return result;
  };

  const verifyCode = (e) => {
    e.preventDefault();
    if (!isValidate()) return;
    setLoading(true);
    axios
      .post(
        "https://chat-prod-dvbe.onrender.com/api/v1/auth/verifyResetCode",
        { resetCode },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res);
          // console.log("Verification successful");
          toast.success("Verification Successful");
          Cookies.set("jwt", res.data.token);
          setTimeout(() => {
            navigate("/resetpassword");
          }, 5000);
        } else {
          Cookies.remove("jwt", res.data.token);
        }
      })
      .catch((error) => {
        // console.error(error);
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "95vh",
        }}
      >
        <div
          style={{
            marginInline: "5%",
            display: "flex",
            flexDirection: windowWidth > 900 ? "row" : "column",
            justifyContent: "center",
            width: "70%",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              display: windowWidth < 900 ? "block" : "none",
              fontSize: "30px",
              textAlign: "center",
            }}
          >
            Verification Forget Password{" "}
          </h1>
          <div
            style={{
              width: "50vw",
              height: windowWidth > 900 ? "95vh" : "30vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={img} alt="" style={{ width: "90%", height: "80%" }} />
          </div>
          <div
            style={{
              width: "50vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                marginBottom: "10px",
                display: windowWidth > 900 ? "block" : "none",
                fontSize: "40px",
                textAlign: "center",
              }}
            >
              Verification Forget Password{" "}
            </h1>
            <p style={{ color: "#78aaa1", fontSize: "20px" }}>
              We have sent you a unique code for verification
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
                gap: "20px",
              }}
            >
              <TextField
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
                type="text"
                size="small"
                sx={{ width: "150px" }}
              />
            </div>
            <Button
              variant="outlined"
              onClick={verifyCode}
              type="submit"
              className="btn"
              style={{ borderRadius: "5px", width: "100%" }}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Verificationforget;
