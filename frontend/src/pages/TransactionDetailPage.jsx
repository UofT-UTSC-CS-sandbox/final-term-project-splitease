import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { parseTransactions } from "../components/Functions.jsx";
import "./TransactionDetailPage.css";
import "../components/Universal.css";
import axios from "axios";
import TransactionActivity from "../components/TransactionActivity.jsx";

const TransactionDetailPage = () => {
  const { uid } = useParams();
  console.info("Friend ID:", uid);
  const navigate = useNavigate();
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
          <h2>Total transaction</h2>
          person shared with
        </div>

        <div className="recent-activities-text">Persons who share the bill</div>
      </div>
    </div> // add activities list here
  );
};

export default TransactionDetailPage;
