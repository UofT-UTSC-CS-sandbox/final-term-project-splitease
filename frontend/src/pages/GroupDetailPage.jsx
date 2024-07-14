import { React, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { parseTransactions } from "../components/Functions.jsx";
import "./GroupDetailPage.css";
import "../components/Universal.css";
import axios from "axios";

const GroupDetailPage = () => {
  //   const { fid } = useParams();
  //   console.info("Friend ID:", fid);
  const navigate = useNavigate();
  //   const [friendsInfo, setFriendsInfo] = useState([]);
  //   const [transactions, setTransactions] = useState([]);

  //   const uid = localStorage.getItem("uid");

  //   useEffect(() => {
  //     setFriendsInfo({
  //       name: "****",
  //       balance: "**.**",
  //     });
  //     axios.post("/friend/details", { uid, fid }).then(async (res) => {
  //       // Get friend balance
  //       const friend = res.data;
  //       friend.friend.balance = friend.friend.balance.toFixed(2);
  //       friend.friend.fid = fid;

  //       // reverse the order of transactions
  //       friend.friend.transactions = friend.friend.transactions.reverse();
  //       setFriendsInfo(friend.friend);
  //       console.info("Friend details:", friend);

  //       // Get transaction details
  //       const transactions = await parseTransactions(friend.friend.transactions);
  //       setTransactions(transactions);
  //       console.info("Parsed Transactions:", transactions);
  //     });
  //   }, [uid, fid]);

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
