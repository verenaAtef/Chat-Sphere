/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Grid,
  Typography,
  ThemeProvider,
  Card,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { css } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import DrawerAppBar from "./navbar";
import { useData } from "../contexts/dataContext";
const Users = ({ onUserSelect }) => {
  const [value, setValue] = useState("");
  const { data, createChat } = useData();
  const handleUserClick = async (id) => {
    onUserSelect(id);
    createChat(id);
  };
  const chatItemStyle = css`
    background-color: #f0f0f0;
    border-radius: 8px;
    border-bottom: 2px solid #ccc;
  `;
  const cardContentStyle = css`
    display: flex;
    align-items: center;
    padding: 16px;
  `;
  const theme = createTheme();
  return (
    <>
      <div style={{ width: "100%" }}>
        <div>
          <DrawerAppBar />
        </div>
        <div style={{}}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Search"
            style={{ margin: "10px", width: "90%" }}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ThemeProvider theme={theme}>
            {(() => {
              const filteredUsers = data.users
                .filter((user) => user._id !== data.me?._id)
                .filter((user) =>
                  user.name.toLowerCase().includes(value.toLowerCase())
                );
              if (filteredUsers.length === 0) {
                return (
                  <Typography variant="body1" style={{color:"red",textAlign:"center", paddingTop:"50%"}} component="p">
                    NO RESULT
                  </Typography>
                );
              }
              return (
                <Grid
                  container
                  spacing={1}
                  style={{
                    cursor: "pointer",
                    overflowY: "scroll",
                    maxHeight: "80vh",
                  }}
                >
                  {filteredUsers.map((item) => (
                    <Grid key={item._id} item xs={12}>
                      <Card
                        css={chatItemStyle}
                        style={{ width: "100%", height: "70px" }}
                        onClick={() => handleUserClick(item._id)}
                      >
                        <div css={cardContentStyle}>
                          <div style={{ display: "flex" }}>
                            <div style={{ position: "relative" }}>
                              <img
                                src={item.photo}
                                alt="Profile"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "16px",
                                  marginBottom: "-20px",
                                  marginTop: "10px",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                            <Typography
                              variant="h6"
                              component="h3"
                              gutterBottom
                              style={{ marginTop: "10px", textAlign: "center" }}
                            >
                              {item.name}
                            </Typography>
                          </div>
                        </div>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              );
            })()}
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};

export default Users;
