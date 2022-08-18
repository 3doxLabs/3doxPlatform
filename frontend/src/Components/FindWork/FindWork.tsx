import AppContext from "../../context/context";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import defaultPfp from "../../images/user.png";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaRegHeart } from "react-icons/fa";
import Fab from "@mui/material/Fab";

import Rating from "@mui/material/Rating";

import "./FindWork.css";

export default function FindWork() {
  const maxCharacters = 250;

  const text =
    "Need an expert Rust Developer (ideally with experience building on Solana) to join two senior machine learning engineers to join a new VC-backed company focused on building Solana smart contracts and back-end infrastructure";

  return (
    <Container>
      {/* Search Bar */}
      <div className="search-bar">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "50%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search jobs"
            inputProps={{ "aria-label": "search google maps" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

          <IconButton
            style={{ backgroundColor: "#FF0000", color: "white" }}
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>

      {/* Page Body */}
      <div className="find-work-wrapper">
        {/* Left Page */}
        <div className="search-history">
          <div className="recent-searches">Recent Searches</div>
        </div>

        <div className="left-page">
          <div className="listing-area">
            {/* job Listing 1 */}
            <Card
              className="listing"
              sx={{ minWidth: "100%", borderRadius: "20px" }}
            >
              <div className="listing-top">
                <div className="client-info">
                  <Chip
                    style={{ color: "inherit", cursor: "pointer" }}
                    avatar={<Avatar alt="0xSpaceMan" src={defaultPfp} />}
                    label="Mark Fisher"
                    variant="outlined"
                  />

                  <div className="client-rating">
                    <Rating
                      name="read-only"
                      value={5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <span>(4)</span>
                  </div>
                </div>

                <div className="save-job">
                  <FaRegHeart />
                </div>
              </div>

              <div className="job-title">
                <span>Looking for a Solana Smart Contract Developer</span>
              </div>

              <div className="job-description">
                {text.length > maxCharacters ? (
                  <>
                    {/* Add elipsis if text is too long */}
                    <div>{text.substring(0, maxCharacters)}...</div>
                  </>
                ) : (
                  <>{text}</>
                )}
              </div>

              <div className="proposals">
                <span>Applicants: 1</span>
              </div>

              <div className="pay-rate">
                <span>Budget: 20 SOL</span>
              </div>
            </Card>

            {/* job Listing 2 */}
            <Card
              className="listing"
              sx={{ minWidth: "100%", borderRadius: "20px" }}
            >
              <div className="listing-top">
                <div className="client-info">
                  <Chip
                    style={{ color: "inherit", cursor: "pointer" }}
                    avatar={<Avatar alt="0xSpaceMan" src={defaultPfp} />}
                    label="NyrM...F34v"
                    variant="outlined"
                  />

                  <div className="client-rating">
                    <Rating
                      name="read-only"
                      value={5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <span>(4)</span>
                  </div>
                </div>

                <div className="save-job">
                  <FaRegHeart />
                </div>
              </div>

              <div className="job-title">
                <span>Creating a crypto trading bot</span>
              </div>

              <div className="job-description">
                {text.length > maxCharacters ? (
                  <>
                    <div>{text.substring(0, maxCharacters)}...</div>
                  </>
                ) : (
                  <>{text}</>
                )}
              </div>

              <div className="proposals">
                <span>Applicants: 1</span>
              </div>

              <div className="pay-rate">
                <span>Budget: 40 SOL</span>
              </div>
            </Card>

            {/* Job listing 3 */}
            <Card
              className="listing"
              sx={{ minWidth: "100%", borderRadius: "20px" }}
            >
              <div className="listing-top">
                <div className="client-info">
                  <Chip
                    style={{ color: "inherit", cursor: "pointer" }}
                    avatar={<Avatar alt="0xSpaceMan" src={defaultPfp} />}
                    label="Keven James"
                    variant="outlined"
                  />

                  <div className="client-rating">
                    <Rating
                      name="read-only"
                      value={5}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <span>(4)</span>
                  </div>
                </div>

                <div className="save-job">
                  <FaRegHeart />
                </div>
              </div>

              <div className="job-title">
                <span>
                  FULL TIME Creative Graphic Designer Team for Fast Growing Web
                  3 Gaming Company
                </span>
              </div>

              <div className="job-description">
                {text.length > maxCharacters ? (
                  <>
                    <div>{text.substring(0, maxCharacters)}...</div>
                  </>
                ) : (
                  <>{text}</>
                )}
              </div>

              <div className="proposals">
                <span>Applicants: 3</span>
              </div>

              <div className="pay-rate">
                <span>Budget: 22 SOL</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Right side of page */}
        <div className="right-page ">
          <div className="get-connected">
            <div className="connections-title">
              <span>Make Connections</span>
            </div>

            <div className="card chip">
              <div>
                <Chip
                  style={{
                    color: "white",
                    border: "none",
                    backgroundColor: "#FF0000",
                    cursor: "pointer",
                  }}
                  avatar={<Avatar alt="Donny05" src={defaultPfp} />}
                  label="Donny05"
                  variant="outlined"
                />
              </div>
              Full Stack Developer
            </div>

            <div className="card chip">
              <div>
                <Chip
                  style={{
                    color: "white",
                    border: "none",
                    backgroundColor: "#FF0000",
                    cursor: "pointer",
                  }}
                  avatar={<Avatar alt="0xSpaceMan" src={defaultPfp} />}
                  label="0xSpaceMan"
                  variant="outlined"
                />
              </div>
              Graphic Design
            </div>

            <div className="card chip">
              <div>
                <Chip
                  style={{
                    color: "white",
                    border: "none",
                    backgroundColor: "#FF0000",
                    cursor: "pointer",
                  }}
                  avatar={<Avatar alt="0xSpaceMan" src={defaultPfp} />}
                  label="Keven James"
                  variant="outlined"
                />
              </div>
              Front End Developer
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
