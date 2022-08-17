import AppContext from "../../context/context";
import { useContext, useEffect, useState, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import defaultPfp from "../../images/user.png";
import { FaRegHeart } from "react-icons/fa";
import Fab from "@mui/material/Fab";
import { FiMapPin } from "react-icons/fi";
import { BiMessageSquareAdd } from "react-icons/bi";
import Rating from "@mui/material/Rating";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import "./Profile.css";

export default function FindWork() {
  const { user, setUser, socket } = useContext(AppContext);
  const [value, setValue] = useState<number | null>(4.5);
  const [tabValue, setTabValue] = useState("one");
  const { id } = useParams();

  const [account, setAccount] = useState({});

  useEffect(() => {
    setTimeout(() => {
      socket.current.emit("/api/user/find", id);

      socket.current.on("/user/find", (accountData: any) => {
        setAccount(accountData);
      });
    }, 500);
  }, [socket]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // future use case for annunciation of names
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  return (
    <Container>
      <div className="profile-wrapper">
        <div className="profile-left">
          <div className="profile-left-top">
            <div className="profile-left-top-pfp">
              <img src={defaultPfp} alt="" />
            </div>
          </div>

          <div className="profile-left-bottom">
            <div className="profile-left-bottom-label">
              <h3>Experience</h3>
            </div>

            <div className="profile-left-bottom-experience">
              {/*  New Job */}
              <div className="profile-left-bottom-experience-job">
                <div className="profile-left-bottom-experience-company">
                  <h4>Facebook</h4>
                </div>

                <div className="profile-left-bottom-experience-job-position">
                  <span>Backend Engineer</span>
                </div>

                <div className="profile-left-bottom-experience-period">
                  <span>2015 - 2020</span>
                </div>
              </div>

              {/*  New Job */}
              <div className="profile-left-bottom-experience-job">
                <div className="profile-left-bottom-experience-company">
                  <h4>Blockstream</h4>
                </div>

                <div className="profile-left-bottom-experience-job-position">
                  <span>Blockchain Engineer</span>
                </div>

                <div className="profile-left-bottom-experience-period">
                  <span>2015 - 2020</span>
                </div>
              </div>
            </div>

            <div className="profile-left-bottom-label">
              <h3>Skills</h3>
            </div>

            <div className="profile-left-bottom-skills">
              <div className="profile-left-bottom-skills-item">
                <span>Python</span>
              </div>

              <div className="profile-left-bottom-skills-item">
                <span>Javascript</span>
              </div>

              <div className="profile-left-bottom-skills-item">
                <span>C++</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-right-top-left">
              <div className="user-info">
                {/* Name & Location */}
                <div className="user-details">
                  <div className="username-title">
                    <span className="username">Jason Rendall</span>
                    <span className="profession">Smart Contract Developer</span>
                  </div>

                  <div className="user-location">
                    <span>
                      <FiMapPin /> Los Angeles, CA
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="user-rating">
                  <div className="user-client-rating">
                    <span className="rating-text">
                      Rating: {value} (3 reviews)
                    </span>
                    <div>
                      <Rating
                        name="read-only"
                        value={value}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="contact">
                  <div className="invite">
                    <Fab
                      variant="extended"
                      style={{
                        backgroundColor: "#FF0000",
                        border: "none",
                        borderRadius: "2px",
                        color: "white",
                        zIndex: 0,
                      }}
                    >
                      <BiMessageSquareAdd /> <>&nbsp;</> Invite to Job
                    </Fab>
                    {/* <BiMessageSquareAdd /> <span>Invite to Job</span> */}
                  </div>

                  {/* <div className="report">
                    <span>Report user</span>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="profile-right-top-right">
              <div className="bookmark-user">
                <Fab aria-label="like">
                  <FaRegHeart />
                </Fab>
              </div>
            </div>
          </div>

          <div className="profile-right-bottom">
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tabValue}
                onChange={handleChange}
                textColor="inherit"
                TabIndicatorProps={{ style: { background: "#FF0000" } }}
                aria-label="secondary tabs example"
              >
                <Tab value="one" label="Most Recent Jobs" />
                <Tab value="two" disabled label="Recent Post" />
              </Tabs>
            </Box>

            <Card sx={{ minWidth: "100%", borderRadius: "20px" }}>
              <div className="completed-job">
                <div className="job-title">
                  <h5>Build a Smart Contract on Solana</h5>
                </div>

                <div className="job-date">
                  <span>Jul 28, 2022 - August 14, 2022 </span>
                </div>

                <div className="job-review">
                  <div className="client-review-message">
                    <div>
                      <Rating
                        name="read-only"
                        value={5}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </div>

                    <div>
                      <Chip
                        avatar={<Avatar alt="Natacha" src={defaultPfp} />}
                        label="Jacob West"
                        variant="outlined"
                      />
                    </div>

                    <div>
                      <i>
                        Jason did amazing work when building our smart contract!
                      </i>
                    </div>
                  </div>

                  <div className="job-pay">
                    <div className="job-rate">
                      <span>20.3 SOL</span>
                    </div>

                    <div>
                      <span>Fixed Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card sx={{ minWidth: "100%", borderRadius: "20px" }}>
              <div className="completed-job">
                <div className="job-title">
                  <h5>Create NFT Mint Site</h5>
                </div>

                <div className="job-date">
                  <span>Jul 23, 2022 - August 02, 2022 </span>
                </div>

                <div className="job-review">
                  <div className="client-review-message">
                    <div>
                      <Rating
                        name="read-only"
                        value={4.5}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                    </div>

                    <div>
                      <Chip
                        avatar={<Avatar alt="Natacha" src={defaultPfp} />}
                        label="Jacob West"
                        variant="outlined"
                      />
                    </div>

                    <div>
                      <i>
                        Jason did amazing work when building our NFT minting
                        site!
                      </i>
                    </div>
                  </div>

                  <div className="job-pay">
                    <div className="job-rate">
                      <span>12.1 SOL</span>
                    </div>

                    <div>
                      <span>Fixed Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
