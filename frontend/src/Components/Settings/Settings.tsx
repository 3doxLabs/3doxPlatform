import { Container } from "react-bootstrap";
import AppContext from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Settings.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function Settings() {
  const navigate = useNavigate();
  const { user, setUser, socket } = useContext(AppContext);
  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const handleUserChange = (e: any) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    console.log(updatedUser);
  };

  const handleSave = () => {
    if (updatedUser.username.length > 15) {
      return console.log("Username must be less than 15 characters");
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/user/update`, updatedUser, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    let data = {
      updatedUser,
    };

    console.log(updatedUser);
  };

  useEffect(() => {
    if (socket.current) {
      console.log(socket.current);
    }
  }, [socket.current]);

  useEffect(() => {
    if (!user.username) {
      navigate("/find-work");
    }
  });

  return (
    <Container>
      <div className="settings-wrapper">
        <div className="settings-left">
          <Box
            sx={{
              width: "100%",
              bgcolor: "background.paper",
            }}
          >
            <nav aria-label="secondary mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <ListItemText primary="Notifications" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton disabled>
                    <ListItemText primary="Membership" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </div>

        <div className="settings-right">
          <div className="profile-details">
            <span>Profile Details</span>
          </div>

          <div className="name">
            <span className="label">Name</span>

            <div className="name-input-div">
              <div className="name-input">
                <TextField
                  // error={username.length > 15 ? true : false}
                  id="outlined-baseic"
                  label="First Name"
                  name="firstName"
                  defaultValue=""
                  onChange={(e) => handleUserChange(e)}
                />
              </div>

              <div className="name-input">
                <TextField
                  // error={username.length > 15 ? true : false}
                  id="outlined-baseic"
                  label="Last Name"
                  defaultValue=""
                  name="lastName"
                  onChange={(e) => handleUserChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="username-div">
            <span className="label">Username</span>
            <div>
              <TextField
                error={
                  updatedUser.username && updatedUser.username.length > 15
                    ? true
                    : false
                }
                id="outlined-baseic"
                label="Username"
                name="username"
                defaultValue={user.username}
                onChange={(e) => handleUserChange(e)}
              />
            </div>
          </div>

          <div className="save-div">
            <span className="label">Update Details</span>
            <div>
              <Button
                onClick={handleSave}
                variant="contained"
                style={{ backgroundColor: "red" }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
