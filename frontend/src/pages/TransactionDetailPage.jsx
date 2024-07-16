import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { parseTransactions } from "../components/Functions.jsx";
import "./TransactionDetailPage.css";
import "../components/Universal.css";
import axios from "axios";
import SharingDetail from "../components/SharingDetail.jsx";

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
          <h2>Transaction date{ }</h2>

          {uid > 0 ? (
            <p className="balance-negative"> Your current total transaction { }$</p>
          ) : (
            <p className="balance-positive"> Your current total transaction { }$</p>

          )}


        </div>

        <div className="recent-activities-text">Persons who share the transaction</div>

        <div className="activity-wrapper">


          <SharingDetail
            avatar="https://via.placeholder.com/30" // 这是一个临时的图片URL
            name="John Doe"
            amount="50.00"
          />
          <SharingDetail
            avatar="https://via.placeholder.com/30" // 这是一个临时的图片URL
            name="Jason Ki"
            amount="2.00"
          />
          <SharingDetail
            avatar="https://via.placeholder.com/30" // 这是一个临时的图片URL
            name="Stark Liu"
            amount="2.00"
          />

        </div>

      </div>
    </div> // add activities list here
  );
};

export default TransactionDetailPage;
