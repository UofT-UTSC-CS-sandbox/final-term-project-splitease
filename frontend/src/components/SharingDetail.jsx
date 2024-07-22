import React from "react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SharingDetail.css";

const SharingDetail = ({ sharings }) => {
  const navigate = useNavigate();

  return (
    <div className="activity_share">
      {sharings.map((sharing) => (
        <div key={sharing.id} className="activity-item">
          <img src={sharing.avatar} className="avatar" />
          <div className="activity-details">
            <div className="activity-name">{sharing.name}</div>
            <div className="activity-type">{sharing.description}</div>
          </div>
          <div
            className={
              sharing.amount >= 0
                ? "activity-amount-positive"
                : "activity-amount-negative"
            }
          >
            ${sharing.amount.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SharingDetail;
