import { Container } from "react-bootstrap";
import AppContext from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { countries } from "./countries";
import { timezones } from "./timezones";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, setUser, socket } = useContext(AppContext);
  const [isUsernameError, setIsUsernameError] = useState(false);
  const [country, setCountry] = useState(user.country);
  const [timezone, setTimezone] = useState(user.timezone);

  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.country,
    timezone: user.timezone,
  });

  const handleUserChange = (e: any) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });

    if (e.target.name === "username") {
      setIsUsernameError(false);
    }

    if (e.target.name === "country") {
      setCountry(e.target.value);
    }

    if (e.target.name === "timezone") {
      setTimezone(e.target.value);
    }
  };

  const handleSave = () => {
    if (
      updatedUser.username.length > 15 &&
      updatedUser.username !== user.address
    ) {
      return console.log("Username must be less than 15 characters");
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/user/update`, updatedUser, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);

        // Display notification
        enqueueSnackbar("Account updated!", {
          variant: "success",
        });
      })
      .catch((e) => {
        if (e.response.status === 409) {
          setIsUsernameError(true);

          // Display error notification
          enqueueSnackbar(e.response.data.message, { variant: "error" });
        }
      });
  };

  // Reroute logged out users
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
                  defaultValue={user.firstName}
                  onChange={(e) => handleUserChange(e)}
                />
              </div>

              <div className="name-input">
                <TextField
                  // error={username.length > 15 ? true : false}
                  id="outlined-baseic"
                  label="Last Name"
                  name="lastName"
                  defaultValue={user.lastName}
                  onChange={(e) => handleUserChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="username-div">
            <span className="label">Username</span>
            <div>
              <TextField
                error={isUsernameError}
                id="outlined-baseic"
                label="Username"
                name="username"
                defaultValue={user.username}
                onChange={(e) => handleUserChange(e)}
              />
            </div>
          </div>

          <div className="username-div">
            <span className="label">Location</span>

            <div className="time-location">
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="country"
                value={country}
                defaultValue={country}
                onChange={handleUserChange}
                helperText="Please select your country"
              >
                {countries.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="timezone"
                value={timezone}
                defaultValue={timezone}
                onChange={handleUserChange}
                helperText="Please select your timezone"
              >
                {timezones.map((option) => (
                  <MenuItem key={option.zone} value={option.gmt}>
                    {option.zone}
                  </MenuItem>
                ))}
              </TextField>
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
