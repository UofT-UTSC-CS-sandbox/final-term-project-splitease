import { React, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { parseTransactions } from "../components/Functions.jsx";
import "./GroupDetailPage.css";
import "../components/Universal.css";
import TransactionActivity from "../components/TransactionActivity.jsx";
import axios from "axios";

const GroupDetailPage = () => {
  const uid = localStorage.getItem("uid");
  const { gid } = useParams();
  const navigate = useNavigate();
  //test data for group
  // Test data for group members
  const testGroupMembers = ["Alice", "Bob", "Charlie"];

  // Get group details
  const [groupDetails, setGroupDetails] = useState({});
  useEffect(() => {
    console.log("Fetching group details for gid:", gid);

    // TODO: Finish group details API
    // * You may want to put `group details` jsx in a dedicated component file
  });
  // test transactions for group

  const testTransactions = [
    {
      id: 1,
      date: "2024-07-15",
      name: "Lunch at Joe's",
      payerId: "user1",
      payer: "Alice",
      amount: 25.00,
    },
    {
      id: 2,
      date: "2024-07-16",
      name: "Movie Tickets",
      payerId: "user2",
      payer: "Bob",
      amount: -10.00,
    },
    {
      id: 3,
      date: "2024-07-17",
      name: "Grocery Shopping",
      payerId: "user1",
      payer: "Alice",
      amount: 50.00,
    },
  ];

  const UID_test = "user1";

  const friend_test = {
    name: "Bob",
  };
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
          <h2>Group Name </h2>
          <div className="member-list">
            {testGroupMembers.map((member, index) => (
              <div key={index} className="member-name">{member}</div>
            ))}
          </div>
        </div>
        <div className="recent-activities-text">Recent shared activities</div>
        <div className="recent-activities-bar">
          <TransactionActivity
            transactions={testTransactions}
            uid={UID_test}
            friendsInfo={friend_test}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
