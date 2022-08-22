import AppContext from "../../context/context";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import "./Skill.css";

interface SkillName {
  skill: string;
}

export default function Skill({ skill }: SkillName) {
  return (
    <>
      <div className="skill-item">
        <span>{skill}</span>
      </div>
    </>
  );
}
