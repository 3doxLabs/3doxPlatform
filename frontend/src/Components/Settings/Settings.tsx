import { Container } from "react-bootstrap";
import AppContext from "../../context/context";
import { useContext, useEffect, useState } from "react";

import "./Settings.css";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

export default function Settings() {
  const { user, setUser, socket } = useContext(AppContext);
  const [username, setUsername] = useState(user.username);

  const handleUsernameInput = (e: any) => {
    setUsername(e.target.value);
  };

  const handleSave = () => {
    if (username.length > 15) {
      return console.log("Username must be less than 15 characters");
    }

    let data = {
      username,
    };

    socket.current.emit("/api/user/update", data);

    console.log(username);
  };

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
                <span>First Name</span>
                <input disabled type="text" />
              </div>

              <div className="name-input">
                <span>Last Name</span>
                <input disabled type="text" />
              </div>
            </div>
          </div>

          <div className="username-div">
            <span className="label">Username</span>
            <div>
              <input onChange={(e) => handleUsernameInput(e)} type="text" />
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
