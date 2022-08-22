import AppContext from "../../context/context";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

import "./UserRating.css";

interface RatingData {
  rating: number;
  reviewCount: number;
}

export default function UserRating({ rating, reviewCount }: RatingData) {
  return (
    <>
      <div className="user-rating">
        <div className="user-client-rating">
          <span className="rating-text">
            {rating > 0 ? (
              <>
                Rating: {rating} ({reviewCount})
              </>
            ) : (
              <>Rating: {rating || "No reviews"}</>
            )}
          </span>

          <div>
            <Rating
              name="read-only"
              value={rating}
              precision={0.1}
              readOnly
              size="medium"
            />
          </div>
        </div>
      </div>
    </>
  );
}
