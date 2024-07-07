import React from "react";
import "./FriendDetailPage.css";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const FriendDetailPage = () => {
  const navigate = useNavigate();

  const onDeleteIconClick = useCallback(() => {
    navigate(-1, { replace: true });
  }, [navigate]);

  return (
    <div className="friend-detail-page">
      <div className="detailpageheader">
        <div className="friendsHeader">Friend Details</div>
        <img
          className="deleteIcon"
          alt=""
          src="/delete.svg"
          onClick={onDeleteIconClick}
        />
      </div>
      <div className="content">
        <div className="current-balance-bar">
          <h2>Current Balance</h2>
          <p>Jeremy owes you: $35.00</p>
        </div>
        <div className="recent-activities-bar">
          <h3>Recent shared activities</h3>
          <div className="activity">
            <div className="activity-date">April 20</div>
            <div className="activity-details">
              <div className="activity-name">Movie Tickets</div>
              <div className="activity-cost">$80.00</div>
              <div className="activity-split">paid by: you</div>
              <div className="activity-owe">You: $40.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetailPage;
