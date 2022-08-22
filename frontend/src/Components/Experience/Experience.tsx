import AppContext from "../../context/context";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import "./Experience.css";

interface ExperienceData {
  experience: [];
}

export default function Experience({ experience }: ExperienceData) {
  return (
    <>
      {experience.length > 0 ? (
        experience.map((job: any) => {
          <div className="experience-job">
            <div className="experience-company">
              <h4>{job.company}</h4>
            </div>
            <div className="experience-job-position">
              <span>{job.position}</span>
            </div>
            <div className="experience-period">
              <span>
                {job.from} - {job.to}
              </span>
            </div>
          </div>;
        })
      ) : (
        <>
          <span>
            This user hasn't published their previous professional experience.
          </span>
        </>
      )}
    </>
  );
}
