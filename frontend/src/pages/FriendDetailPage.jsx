import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { getUserNameById } from "../components/Functions.jsx";
import "./FriendDetailPage.css";
import axios from "axios";

const FriendDetailPage = () => {
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
      setFriendsInfo(friend.friend);
      console.info("Friend details:", friend);

      // Get transaction details
      const transactions = await Promise.all(
        await friend.friend.transactions.map(async (transaction) => {
          return {
            id: transaction._id,
            date: transaction.date,
            name: "TransactionNameFoo",
            payer: await getUserNameById(transaction.payer),
            payerId: transaction.payer,
            amount: transaction.amount.toFixed(2),
          };
        })
      );
      setTransactions(transactions);
      console.info("Parsed Transactions:", transactions);
    });
  }, [uid, fid]);

  const onDeleteIconClick = useCallback(() => {
    navigate(-1);
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
              You owe {friendsInfo.name} $
              {Math.abs(friendsInfo.balance).toFixed(2)}
            </p>
          ) : (
            <p className="balance-positive">
              {friendsInfo.name} owes you ${friendsInfo.balance}
            </p>
          )}
        </div>
        <div className="recent-activities-text">
              Recent shared activities  
          </div>
        <div className="recent-activities-bar">
          {transactions.map((transaction) => (
            <div className="activity" key={transaction.id}>
              <div className="activity-date">{transaction.date}</div>
              <div className="activity-details">
                <div className="activity-name">{transaction.name}</div>
                <div className="activity-split">
                  Paid by:{" "}
                  {transaction.payerId === uid
                    ? transaction.payer + " (You)"
                    : transaction.payer}
                </div>
                {transaction.payer === friendsInfo.name ? (
                  <div className="activity-amount-negative">
                    -${transaction.amount}
                  </div>
                ) : (
                  <div className="activity-amount-positive">
                    ${transaction.amount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendDetailPage;
