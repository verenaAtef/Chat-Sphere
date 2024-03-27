/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { compareAsc, format } from "date-fns";

function UpdateProfile() {
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isValidate = () => {
    let result = true;
    if (isNaN(parseInt(age))) {
      result = false;
      toast.error("Age must be a number");
    }

    if (!/^(01|02|03)\d{9}$/.test(phoneNumber)) {
      result = false;
      toast.error("Please enter a valid Egyptian Phone Number");
    }

    // if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthDay)) {
    //   result = false;
    //   toast.error("Birth day must be in the format dd/mm/yyyy");
    // }
    return result;
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwt");
      try {
        const response = await axios.get(
          "https://chat-prod-dvbe.onrender.com/api/v1/users/me",
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (response.data.status === "success") {
          const userData = response.data.data;
          setAge(userData.age);
          setEmail(userData.email);
          setName(userData.name);
          setBirthDay(userData.birthDay);
          setLocation(userData.location);
          setPhoto(userData.photo);
          setGender(userData.gender);
          setPhoneNumber(userData.phoneNumber);
          // console.log(response.data);
        }
      } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const setData = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!isValidate()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("location", location);
    formData.append("age", parseInt(age));
    formData.append("photo", photo);
    formData.append("phoneNumber", phoneNumber);
    formData.append("birthDay", birthDay);
    formData.append("gender", gender);
    const token = Cookies.get("jwt");
    try {
      const response = await axios.patch(
        "https://chat-prod-dvbe.onrender.com/api/v1/users/updateMe",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      // console.log(response);
      if (response.data.status === "success") {
        // console.log("Update profile Successful");
        toast.success("Update profile Successful");
      }
    } catch (error) {
      // console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const backTo = (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    navigate("/chat");
  };
  const isLoading =
    !name &&
    !email &&
    !age &&
    !gender &&
    !phoneNumber &&
    !location &&
    !birthDay;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width:
              windowWidth > 900 ? "25%" : windowWidth < 500 ? "80%" : "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: "#78aaa1" }}> profile</h1>
          <label htmlFor="file-upload">
            <img
              src={photo}
              alt="Profile"
              style={{
                width: "120px",
                marginTop: "15px",
                height: "120px",
                cursor: "pointer",
              }}
            />
          </label>
          <TextField
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <TextField
            id="outlined-basic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
            required
            type="text"
            size="small"
            style={{ display: "block", marginBottom: "5%", marginTop: "2%" }}
          />

          <TextField
            id="outlined-basic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            required
            type="text"
            size="small"
            style={{ display: "block", marginBottom: "5%", marginTop: "2%" }}
          />
          <TextField
            id="outlined-basic"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            label="Age"
            required
            type="text"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <FormControl
            style={{ marginBottom: "5%", width: "330px", textAlign: "center" }}
            size="small"
          >
            <InputLabel id="demo-select-small-label">Gender</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            label="phone Number"
            required
            type="text"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <TextField
            id="outlined-basic"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            label="Location"
            required
            type="text"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <TextField
            id="outlined-basic"
            value={birthDay ? format(new Date(birthDay), "MM/dd/yyyy") : ""}
            onChange={(e) => setBirthDay(e.target.value)}
            label="BirthDay"
            required
            type="text"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              gap:"10px"
            }}
          >
             <Button
              // className="btn"
              type="submit"
              onClick={backTo}
              style={{
                borderRadius: "5px",
                width: "200px",
                backgroundColor:"white",
                color:"#78aaa1",
                border:"1px solid"
              }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              type="submit"
              onClick={setData}
              className="btn"
              style={{
                borderRadius: "5px",
                width: "200px",
                marginRight: "10px",
              }}
              disabled={loading || isLoading}
            >
              {loading ? "Loading..." : "Update"}
            </Button>
           
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}
export default UpdateProfile;
