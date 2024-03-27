/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import personIcon from "../assets/person-icon-svg-2.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function CreateProfile() {
  const [photo, setPhoto] = useState(personIcon);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const locationRegex = /^[a-zA-z]/
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

  const isValidate = () => {
    let result = true;
    if (age === "" || age === null) {
      result = false;
      toast.warning("Please enter an Age");
    } else if (isNaN(parseInt(age))) {
      result = false;
      toast.error("Age must be a number");
    }

    if (phoneNumber === "" || phoneNumber === null) {
      result = false;
      toast.warning("Please enter a Phone Number");
    } else if (!/^(01|02|03)\d{9}$/.test(phoneNumber)) {
      result = false;
      toast.error("Please enter a valid Egyptian Phone Number");
    }

    if (location === "" || location === null) {
      result = false;
      toast.warning("Please enter a Location");
    }else if(!locationRegex.test(location)){
      result = false;
      toast.error("Please enter a Location string");
    }else if(location.length<4){
      result = false;
      toast.error("Please enter a Locationlength greater than 4 ");
    }
    if (gender === "" || gender === null) {
      result = false;
      toast.warning("Please enter a Gender");
    }
    if (birthDay === "" || birthDay === null) {
      result = false;
      toast.warning("Please enter a Birth Day");
    } else if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthDay)) {
      result = false;
      toast.error("Birth day must be in the format dd/mm/yyyy");
    }
    return result;
  };
  const navigate = useNavigate();
  const setData = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!isValidate()) return;
    setLoading(true);

    const formData = new FormData();
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
        // console.log("create profile Successful");
        toast.success("create profile Successful");
        Cookies.remove("jwt", response.data.token);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      // console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 style={{ color: "#78aaa1" }}>create profile</h1>
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
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            label="BirthDay"
            required
            type="text"
            size="small"
            style={{ display: "block", marginBottom: "5%" }}
          />
          <Button
            variant="outlined"
            type="submit"
            onClick={setData}
            className="btn"
            style={{
              borderRadius: "5px",
              position: "relative",
              width: "200px",
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "submit"}
          </Button>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
export default CreateProfile;
