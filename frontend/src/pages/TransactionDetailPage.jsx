import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { parseTransactions } from "../components/Functions.jsx";
import "./TransactionDetailPage.css";
import "../components/Universal.css";
import axios from "axios";
import SharingDetail from "../components/SharingDetail.jsx";

const TransactionDetailPage = () => {
  const location = useLocation();
  const { transaction } = location.state || {};
  const trans_id = transaction.id;
  console.log("Transaction detial of current:", transaction);
  const uid = localStorage.getItem("uid");
  console.log("the uid is:", uid);
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [Share, setShare] = useState([]);
  // console.info("Friend ID:", uid);
  const navigate = useNavigate();

  useEffect(() => {
    if (trans_id) {
      // Fetch transaction info
      axios
        .get(`/transaction/getInfoByTid/${trans_id}`)
        .then((response) => {
          const info = response.data;
          setTransactionInfo(info);
          return info._id; // Return the info ID to chain the next API call
        })
        .then((info_id) => {
          // Fetch transaction details by info_id
          return axios.get(`/transaction/detail/${info_id}`);
        })
        .then((response) => {
          setTransactionDetails(response.data);
          console.log("details are:", response.data);
          const details = response.data.details.map((detail) => ({
            id: detail.id,
            avatar: "https://via.placeholder.com/30", // Hardcoded image URL
            name:
              detail.payee === uid ? response.data.payerName : detail.payeeName,
            amount: detail.amount,
          }));
          setShare(details);
        })
        .catch((error) => {
          console.error("Error fetching transaction details:", error);
        });
    }
  }, [trans_id]);

  console.log("the transac info is: ", transactionInfo);
  console.log("the transac details are: ", transactionDetails);
  console.log("the share is: ", Share);

  //const [friendsInfo, setFriendsInfo] = useState([]);
  //const [transactions, setTransactions] = useState([]);

  const id = localStorage.getItem("uid");

  //use effect grab data and api

  const onDeleteIconClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="pageContainer">
      <div className="headerBackground">
        <div className="headerText">Transaction Details</div>
        <img
          className="deleteIcon"
          alt=""
          src="/delete.svg"
          onClick={onDeleteIconClick}
        />
      </div>
      <div className="content">
        <div className="current-balance-bar">
          <h2>Transaction date: {transaction.date}</h2>
          {/* TODO: Total amount is not necessarily twice the amount */}
          {/* TODO: Add to fixed 2 to display $xx.xx */}
          {/* {uid > 0 ? (
            <p className="balance-negative">
              {" "}
              Your current total transaction ${}
            </p>
          ) : (
            <p className="balance-positive">
              {" "}
              Your current total transaction ${}
            </p>
          )} */}
          {transactionInfo ? (
            <p className={transactionInfo.amount < 0 ? "balance-negative" : "balance-positive"}>
              Your current total transaction ${transactionInfo.amount.toFixed(2)}
            </p>
          ) : (
            <p>Loading transaction amount...</p>
          )}
        </div>

        <div className="recent-activities-text">
          Persons who share the transaction
        </div>

        <div className="activity-wrapper">
          <SharingDetail sharings={Share} />
        </div>
      </div>
    </div> // add activities list here
  );
};

export default TransactionDetailPage;
