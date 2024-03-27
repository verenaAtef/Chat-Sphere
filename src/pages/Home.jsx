import { Button } from "@mui/material";
import img from "../assets/Work chat-bro.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function Home() {
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
            flexDirection: windowWidth > 900 ? "row" : "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "#78aaa1",
              textAlign: "start",
              fontSize: "40px",
              display: windowWidth > 900 ? "none" : "block",
            }}
          >
            Chatsphere
          </h1>
          <div
            style={{
              width: "50vw",
              height: windowWidth > 900 ? "95vh" : "40vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={img} alt="" style={{ width: "90%", height: "80%" }} />
          </div>
          <div style={{ width: "50vw", textAlign: "center" }}>
            <h1
              style={{
                color: "#78aaa1",
                textAlign: "start",
                fontSize: windowWidth > 900 ? "40px" : "30px",
                display: windowWidth < 900 ? "none" : "block",
              }}
            >
              Chatsphere
            </h1>
            <h4
              style={{
                opacity: "0.6",
                textAlign: "start",
                fontSize: windowWidth > 900 ? "20px" : "15px",
              }}
            >
              The chat app allows users to message each other, whether in-person
              or online, with an intuitive interface for text, photo sharing,
              enhancing communication and interaction..
            </h4>
            <Link to={"/login"}>
              <Button
                variant="outlined"
                type="submit"
                className="btn"
                style={{ borderRadius: "5px", width: "60%" }}
              >
                start
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
