import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./FriendDetailPage.css";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";

const FriendDetailPage = () => {
  const { fid } = useParams();
  console.info("Friend ID:", fid);
  const navigate = useNavigate();
  const [friendsInfo, setFriendsInfo] = useState([]);

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    setFriendsInfo({
      name: "****",
      balance: "**.**",
    });
    axios.post("/friend/details", { uid, fid }).then((res) => {
      const friend = res.data;
      friend.friend.balance = friend.friend.balance.toFixed(2);
      setFriendsInfo(friend.friend);
      console.info("Friend details:", friend);
    });
  }, [uid, fid]);

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
          {friendsInfo.balance < 0 ? (
            <p className="balance-negative">
              You owe {friendsInfo.name} ${Math.abs(friendsInfo.balance).toFixed(2)}
            </p>
          ) : (
            <p className="balance-positive">
              {friendsInfo.name} owes you ${friendsInfo.balance}
            </p>
          )}
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
