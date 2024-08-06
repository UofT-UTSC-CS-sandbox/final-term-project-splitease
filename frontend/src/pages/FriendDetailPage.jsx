import { React, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FriendDetailPage.css";
import "../components/Universal.css";
import axios from "axios";
import TransactionActivity from "../components/TransactionActivity.jsx";
import { parseTransactions, validateUser } from "../components/Functions.jsx";

const FriendDetailPage = () => {
  validateUser();
  const { fid } = useParams();
  console.info("Friend ID:", fid);
  const navigate = useNavigate();
  const [friendsInfo, setFriendsInfo] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const uid = localStorage.getItem("uid");

  useEffect(() => {
    setFriendsInfo({
      name: "****",
      balance: "**.**",
    });
    axios.post("/friend/details", { uid, fid }).then(async (res) => {
      // Get friend balance
      const friend = res.data;
      friend.friend.balance = friend.friend.balance.toFixed(2);
      friend.friend.fid = fid;

      // reverse the order of transactions
      // friend.friend.transactions = friend.friend.transactions.reverse();
      setFriendsInfo(friend.friend);
      console.info("Friend details:", friend);

      // Get transaction details
      const transactions = await parseTransactions(friend.friend.transactions);
      setTransactions(transactions);
      console.info("Parsed Transactions:", transactions);
    });
  }, [uid, fid]);

  const onDeleteIconClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="pageContainer">
      <div className="headerBackground">
        <div className="headerText">Friend Details</div>
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
              You owe {friendsInfo.name} $
              {Math.abs(friendsInfo.balance).toFixed(2)}
            </p>
          ) : (
            <p className="balance-positive">
              {friendsInfo.name} owes you ${friendsInfo.balance}
            </p>
          )}
        </div>
        <div className="recent-activities-text">Recent shared activities</div>
        <div className="recent-activities-bar">
          <TransactionActivity
            transactions={transactions}
            uid={uid}
            friendsInfo={friendsInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default FriendDetailPage;
