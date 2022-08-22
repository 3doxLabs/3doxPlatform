import AppContext from "../../context/context";
import { useContext, useEffect, useState, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";

import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PinDropIcon from "@mui/icons-material/PinDrop";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";

import UserRating from "../UserRating/UserRating";
import Review from "../Review/Review";
import Experience from "../Experience/Experience";
import InviteToJob from "../InviteToJob/InviteToJob";
import DisplayName from "../DisplayName/DisplayName";
import Skill from "../Skill/Skill";

import defaultPfp from "../../images/user.png";
import "./Profile.css";

export default function FindWork() {
  const { id } = useParams();
  const { user, setUser, socket } = useContext(AppContext);
  const [value, setValue] = useState<number | null>(4.5);
  const [tabValue, setTabValue] = useState("one");
  const [account, setAccount] = useState<any>({
    username: null,
    firstName: null,
    lastName: null,
    expertise: null,
    country: null,
    timezone: null,
    address: null,
    avatar: null,
    rating: 0,
    karma: 0,
    reviews: 0,
    experience: [],
    skills: [],
    earned: 0,
    spent: 0,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/user/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setAccount(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

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
              <Experience experience={account.experience} />
            </div>

            <div className="profile-left-bottom-label">
              <h3>Skills</h3>
            </div>

            <div className="profile-left-bottom-skills">
              {account.skills.map((skill: string, i: number) => (
                <Skill key={i} skill={skill} />
              ))}
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
                    {/* Account username / address */}

                    <span className="username">
                      <DisplayName
                        displayName={account.username || undefined}
                      />
                    </span>

                    <a
                      style={{ color: "red", fontWeight: "bold" }}
                      href={`https://solscan.io/account/${id}`}
                      target="_blank"
                    >
                      {id ? (
                        <>
                          {id.substring(0, 4)}...
                          {id.substring(id.length - 4)}
                        </>
                      ) : (
                        <></>
                      )}
                    </a>

                    {/* User expertise if provided */}
                    <span className="profession">
                      {account.expertise || undefined}
                    </span>
                  </div>

                  {/* User location */}
                  <div className="user-location">
                    <div>
                      <PinDropIcon />
                      {account.country || "Undisclosed"}
                    </div>

                    {/* User Timezone */}
                    <div>
                      <WatchLaterIcon />
                      {account.timezone || "Undisclosed"}
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <UserRating
                  rating={account.rating}
                  reviewCount={account.reviews}
                />

                {/* <div className="karma">Karma: {account.karma || 0}</div> */}

                {/* Contact */}
                <div className="contact">
                  <InviteToJob
                    inviter={user.address}
                    invitee={account.address}
                  />
                </div>
              </div>
            </div>

            {/* Like Button */}
            <div className="profile-right-top-right">
              <div className="bookmark-user">
                <FaRegHeart />
              </div>
            </div>
          </div>

          <div className="profile-right-bottom">
            {/* Jobs / Post Switcher */}
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

            <Review
              jobTitle={"Build a Smart Contract on Solana"}
              jobDate={"Jul 28, 2022 - August 14, 2022 "}
              jobRating={5}
              clientDisplayName={"DunderMiflin"}
              reviewMessage={
                "Lion0x54 did amazing work when building our smart contract!"
              }
              payRate={20}
              payType={"Fixed Rate"}
            />

            {/* End Recent Jobs */}
          </div>
        </div>
      </div>
    </Container>
  );
}
