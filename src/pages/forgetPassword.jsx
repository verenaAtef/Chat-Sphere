/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import img from "../assets/Forgot password-bro.png";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useEffect } from "react";
function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
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

  const navigate = useNavigate();

  const isValidate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please enter an email");
    }

    return result;
  };

  const sendCode = (e) => {
    e.preventDefault();
    if (!isValidate()) return;
    setLoading(true);

    axios
      .post("https://chat-prod-dvbe.onrender.com/api/v1/auth/forgetPassword", {
        email,
      })
      .then((res) => {
        if (res.data.status === "success") {
          // console.log(res.data);
          toast.success("Code Send Successfully ");
          setTimeout(() => {
            navigate("/verificationforget");
          }, 5000);
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  
  const backTo = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    navigate("/login");
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
            Forget password
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
              Forget password
            </h1>
            <p style={{ color: "#78aaa1", fontSize: "20px" }}>
              Enter the email address associated with your account
            </p>
            <TextField
              id="outlined-basic"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
              type="email"
              variant="outlined"
              size="small"
              sx={{ display: "block", marginBottom: "5%" }}
            />
            <div style={{display :"flex" , gap:"10px"}}>
            <Button
              // className="btn"
              variant="outlined"
              type="submit"
              onClick={backTo}
              style={{
                borderRadius: "5px",
               width:"120px",
               backgroundColor:"white",
               color:"#78aaa1",
               border:"1px solid"

              }}
            >
              Back
            </Button>
            <Link
              to={"/Verificationcode"}
              style={{ color: " white ", textDecoration: "none" }}
            >
              <Button
                variant="outlined"
                type="submit"
                onClick={sendCode}
                className="btn"
                style={{ borderRadius: "5px", width: "100%" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Continue"}
              </Button>
            </Link>
            
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Forgetpassword;
