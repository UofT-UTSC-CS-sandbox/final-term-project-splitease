import { React, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { parseTransactions } from "../components/Functions.jsx";
import "./GroupDetailPage.css";
import "../components/Universal.css";
import axios from "axios";

const GroupDetailPage = () => {
  const uid = localStorage.getItem("uid");
  const { gid } = useParams();
  const navigate = useNavigate();

  // Get group details
  const [groupDetails, setGroupDetails] = useState({});
  useEffect(() => {
    console.log("Fetching group details for gid:", gid);

    // TODO: Finish group details API
    // * You may want to put `group details` jsx in a dedicated component file
  });

  const onDeleteIconClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // TODO: display transaction details between each group member
  return (
    <div className="pageContainer">
      <div className="headerBackground">
        <div className="headerText">Group Transaction Details</div>
        <img
          className="deleteIcon"
          alt=""
          src="/delete.svg"
          onClick={onDeleteIconClick}
        />
      </div>
      <div className="group-members">
        <div className="group-balance">
          <img className="group-icon" alt="" src="/group.svg" />
          <h2>Group Members Balance</h2>
        </div>
        <div className="recent-activities-text">Recent shared activities</div>
        <div className="recent-activities-bar"></div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
