import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import defaultPfp from "../../images/user.png";
import "./Review.css";

interface ReviewParams {
  jobTitle: string;
  jobDate: string;
  jobRating: number;
  clientDisplayName: string;
  reviewMessage: string;
  payRate: number;
  payType: string;
}

export default function Review({
  jobTitle,
  jobDate,
  jobRating,
  clientDisplayName,
  reviewMessage,
  payRate,
  payType,
}: ReviewParams) {
  return (
    <>
      <Card sx={{ minWidth: "100%", borderRadius: "5px" }}>
        <div className="completed-job">
          <div className="job-title">
            <h5>{jobTitle}</h5>
          </div>

          <div className="job-date">
            <span>{jobDate}</span>
          </div>

          <div className="job-review">
            <div className="client-review-message">
              <div>
                <Rating
                  name="read-only"
                  value={jobRating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </div>

              <div>
                <Chip
                  avatar={<Avatar alt="Natacha" src={defaultPfp} />}
                  label={clientDisplayName}
                  variant="outlined"
                />
              </div>

              <div>
                <i>{reviewMessage}</i>
              </div>
            </div>

            <div className="job-pay">
              <div className="job-rate">
                <span>{payRate} SOL</span>
              </div>

              <div>
                <span>{payType}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
