import AppContext from "../../context/context";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import { BiMessageSquareAdd } from "react-icons/bi";
import "./InviteToJob.css";

interface Invite {
  inviter: string;
  invitee: string;
}

export default function InviteToJob({ inviter, invitee }: Invite) {
  return (
    <>
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
      </div>
    </>
  );
}
