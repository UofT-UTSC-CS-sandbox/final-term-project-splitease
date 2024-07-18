import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formatDate,
  parseTransactions,
  validateUser,
} from "../components/Functions.jsx";
import TransactionActivity from "../components/TransactionActivity.jsx";
import UserInfo from "../components/UserInfo";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  // Validate user
  // TODO: Add validation for each page
  validateUser();

  const [transactions, setTransactions] = useState([]);

  // const test_transactions = [
  //   {
  //     id: "1",
  //     date: "July 13",
  //     name: "test1",
  //     payerId: "test1",
  //     payer: "test1",
  //     amount: 100,
  //   },
  //   {
  //     id: "2",
  //     date: "June 3",
  //     name: "test2",
  //     payerId: "test2",
  //     payer: "test2",
  //     amount: 100,
  //   },
  // ];

  // Fetch recent transactions
  useEffect(() => {
    axios
      .get("/user/transactions/" + uid)
      .then(async (response) => {
        console.log("the response transactions are: ", response.data);
        console.log(response.data.transactions);
        const transaction = await parseTransactions(response.data.transactions);
        setTransactions(transaction || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uid]);

  const onAddATransactionClick = useCallback(() => {
    navigate("/addtransactionpage");
  }, [navigate]);

  return (
    <div className="mainpage">
      <div className="addTransactionParent">
        <div className="addTransactionWrapper">
          <a className="addTransaction" onClick={onAddATransactionClick}>
            Add a transaction
          </a>
        </div>
        <div className="recentActionsParent">
          <UserInfo />
        </div>
        <div className="recentActionsWrapper">
          <b className="recentActions">Recent actions</b>
          {/* {transactions.length === 0 ? (
            <p>You have no recent transactions</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id}>
                {`${formatDate(transaction.createdAt)} ${transaction.description}: $${transaction.details[0].amount}`}
              </div>
            ))
          )} */}
        </div>
      </div>
      <div className="fix-transactions">
        <div className="transaction-wrapper">
          <TransactionActivity
            transactions={transactions}
            uid={uid}
            friendsInfo={{ name: "1" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
