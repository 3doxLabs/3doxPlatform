import AppContext from "../../context/context";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import axios from "axios";
import defaultPfp from "../../images/pfp.jpg";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export default function NavBar() {
  const { publicKey, signMessage, disconnect } = useWallet();
  const { user, setUser, socket } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getSignature = async (pk: any) => {
    try {
      if (!signMessage) return;
      setAnchorEl(null);

      const message = new TextEncoder().encode(
        `Login as ${publicKey?.toString()}`
      );

      const signature = await signMessage(message);

      if (!signature) return await disconnect();

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
          {
            signature,
            address: pk.toString(),
          },
          { withCredentials: true }
        )
        .then((res) => {
          socket.current.disconnect();
          setUser(res.data);
          return socket.current.connect();
        })
        .catch(() => {
          disconnect();
          socket.current.disconnect();
          socket.current.connect();
        });
    } catch (e) {
      disconnect();
      console.log(e);
    }
  };

  const logOut = async () => {
    setAnchorEl(null);

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/logout`,
        {
          message: "logout",
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);

        setUser({
          username: null,
          firstName: null,
          lastName: null,
          expertise: null,
          country: null,
          timezone: null,
          address: null,
          avatar: null,
          balance: 0,
          rating: 0,
          karma: 0,
          reviews: 0,
          experience: [],
          skills: [],
          earned: 0,
          spent: 0,
        });

        socket.current.disconnect();
        disconnect();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (publicKey && signMessage) {
      getSignature(publicKey);
    }
  }, [publicKey]);

  return (
    <Navbar className="Navbar" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          3dox
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/find-work">
              Find Work
            </Nav.Link>

            <Nav.Link as={Link} to="/">
              Hire
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <div className="nav-account">
            {publicKey ? (
              <>
                <div className="notifications-div">
                  <div className="messages">
                    <Badge badgeContent={0} color="primary">
                      <MailIcon color="inherit" />
                    </Badge>
                  </div>

                  <div className="notifications">
                    <Badge badgeContent={0} color="primary">
                      <NotificationsIcon color="inherit" />
                    </Badge>
                  </div>
                </div>

                <div className="account-tab">
                  <div className="account-img-div">
                    <Tooltip title="Manage Account">
                      <Avatar
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        alt="avatar"
                        src={defaultPfp}
                      />
                    </Tooltip>

                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={`/u/${user.address}`}
                      >
                        Profile
                      </MenuItem>

                      {/* <MenuItem component={Link} to={`/dashboard`}>
                        Dashboard
                      </MenuItem> */}

                      <Divider />

                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={`/settings`}
                      >
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem>

                      <MenuItem onClick={logOut}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>

                  <div className="account-info-div">
                    {/* check if username is defaulted to wallet address */}
                    <span className="username">
                      {user.username ? (
                        <>
                          {user.username === user.address ? (
                            <>
                              {user.username.substring(0, 4)}...
                              {user.username.substring(
                                user.username.length - 4
                              )}
                            </>
                          ) : (
                            <>{user.username}</>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </span>

                    <span>{user.balance.toFixed(2)} SOL</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <WalletMultiButton className="connect-btn btn btn-sm," />
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
