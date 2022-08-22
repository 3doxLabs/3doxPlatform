import AppContext from "../../context/context";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import { PropaneSharp } from "@mui/icons-material";

interface Display {
  displayName: string;
}

export default function DisplayName({ displayName = "Unclaimed" }: Display) {
  return (
    <>
      <span>
        {displayName.length > 15
          ? `${displayName.substring(0, 4)}...${displayName.substring(
              displayName.length - 4
            )}`
          : displayName}
      </span>
    </>
  );
}
