/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import img from "../assets/Login-rafiki.png";
import google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const fullnameRegex = /^[a-zA-z]/
  const isValidate = () => {
    let result = true;

    if (fullname === "" || fullname === null) {
      result = false;
      toast.warning("Please enter a username");
    } else if (fullname.length < 3 ) {
      result = false;
      toast.error("Please enter a username greater than 3 characters");
    }else if (!fullnameRegex.test(fullname)) {
      result = false;
      toast.error("Please enter a username string");
    }

    if (email === "" || email === null) {
      result = false;
      toast.warning("Please enter an email");
    } else if (!emailRegex.test(email)) {
      result = false;
      toast.error("Please enter a valid email address");
    }

    if (password === "" || password === null) {
      result = false;
      toast.warning("Please enter a password");
    } else if (!passwordRegex.test(password)) {
      result = false;
      toast.error(
        "Please enter a strong password: at least one lowercase letter, one uppercase letter, one number, one symbol, and must be at least 8 characters long"
      );
    }

    if (confirmPassword === "" || confirmPassword === null) {
      result = false;
      toast.warning("Please enter a confirm password");
    } else if (password !== confirmPassword) {
      result = false;
      toast.error("Passwords do not match");
    }

    return result;
  };

  const navigate = useNavigate();
  const handleSignup = (e) => {
    e.preventDefault();

    if (loading) return;

    if (!isValidate()) return;

    setLoading(true);
    const formData = {
      name: fullname,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
    };

    axios
      .post("https://chat-prod-dvbe.onrender.com/api/v1/auth/signup", formData)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Successfully sign up");
          Cookies.set("jwt", res.data.token);

          setTimeout(() => {
            navigate("/verificationcode");
          }, 5000);
        }
      })
      .catch((error) => {
        // console.log("An error occurred while processing your request:", error);
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };

  const loginWithGoogle = (e) => {
    e.preventDefault();

    axios
      .get("https://chat-prod-dvbe.onrender.com/auth/google", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error);
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
            justifyContent: "center",
            width: "70%",
            alignItems: "center",
          }}
        >
          {windowWidth >= 900 && (
            <div
              style={{
                width: "50vw",
                height: "95vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "90%" }} />
            </div>
          )}
          <div
            style={{
              width: "50vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ color: "rgb(34, 34, 34)", marginBottom: "30px" }}>
              Create an account
            </h1>
            <TextField
              id="outlined-basic"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              label="Full Name"
              required
              type="text"
              variant="outlined"
              size="small"
              sx={{ display: "block", marginBottom: "5%" }}
            />
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
            <TextField
              id="outlined-basic"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              required
              type="password"
              variant="outlined"
              size="small"
              style={{ display: "block", marginBottom: "5%" }}
            />
            <TextField
              id="outlined-basic"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Confirm Password"
              required
              type="password"
              variant="outlined"
              size="small"
              style={{ display: "block", marginBottom: "5%" }}
            />
            <Button
              variant="outlined"
              onClick={handleSignup}
              className="btn"
              style={{ borderRadius: "5px", position: "relative" }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign up"}
            </Button>
            <ToastContainer />
            <div
              style={{
                display: "flex",
                width: "330px",
                justifyContent: "center",
                alignItems: "center",
                opacity: "0.7",
              }}
            >
              <hr style={{ width: "34%", height: "1px" }} />
              <p>OR Sign With</p>
              <hr style={{ width: "34%", height: "1px" }} />
            </div>
            <div
              style={{
                display: "flex",
                width: "330px",
                marginBottom: "30px",
                justifyContent: "space-around",
                opacity: "0.9",
                alignItems: "center",
              }}
            >
              <img
                src={google}
                alt=""
                style={{ width: "50px" }}
                onClick={loginWithGoogle}
              />
            </div>
            <p
              style={{ fontSize: "20px", textAlign: "center", width: "330px" }}
            >
              <span style={{ opacity: "0.8" }}>Already have an account?</span>
              <Link
                to={"/Login"}
                style={{ color: " #78aaa1 ", textDecoration: "none" }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
