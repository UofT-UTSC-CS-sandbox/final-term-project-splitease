import { useCallback, useEffect } from "react";
import FrameComponent2 from "../components/FrameComponent2";
import MayTransactionDetails1 from "../components/MayTransactionDetails1";
import MayTransactionDetails from "../components/MayTransactionDetails";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import styles from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TransactionDetails = (props) => {
  return (
    <>
      <div className={styles.balancetable}>
        <h3>
          Date:{props.date} amount:{props.amount}
        </h3>
        <h3>
          paid by:{props.paidBy} for:{props.for}
        </h3>
      </div>
    </>
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  // Check if the user is logged in
  // If the user is not logged in, navigate to the login page
  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      navigate("/login");
    }
  }, []);

  // Update recent transactions
  useEffect(() => {
    // Get recent transactions
    axios
      .get("/user/transactions/" + uid)
      .then((response) => {
        console.log(response.data);

        // Update the transaction data
        localStorage.setItem(
          "transactions",
          JSON.stringify(response.data.transactions)
        );

        // Update on the page
        const transactions = response.data.transactions;
        if (transactions.length == 0) {
          document.querySelector("." + styles.aprilCosts11069).textContent =
            "You have no recent transactions";
          return;
        }

        for (let i = 0; i < transactions.length; i++) {
          let transaction = transactions[i];
          let details = transaction.details;
          let total = 0;
          for (let j = 0; j < details.length; j++) {
            total += details[j].amount;
          }
          let date_str = transaction.createdAt.split(".")[0];
          let desc_str = transaction.description;
          let amount_str = total.toFixed(2);
          let total_str = `${date_str} '${desc_str}': $${amount_str}`;
          console.log(total_str);

          // Update the transaction data on the page
          let transactionElement = document.createElement("div");
          transactionElement.textContent = total_str;
          //Find element by text "Recent actions"
          let recentActionsElement = document.querySelector(
            "." + styles.recentActions
          );
          recentActionsElement.appendChild(transactionElement);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onLastWeekTextClick = useCallback(() => {
    // Please sync "SpecifiedTransactionsPage" to the project
  }, []);

  const onAddATransactionClick = useCallback(() => {
    navigate("/addtransactionpage");
  }, [navigate]);

  const onRectangle2Click = useCallback(() => {
    // Please sync "SpecifiedTransactionsPage" to the project
  }, []);

  const onSettingsIconClick = useCallback(() => {
    navigate("/settingslogoutpage");
  }, [navigate]);

  return (
    <div className={styles.mainpage}>
      <div className={styles.mainpageChild} />
      <div className={styles.vectorParent}>
        <img
          className={styles.frameChild}
          loading="lazy"
          alt=""
          src="/rectangle-3.svg"
        />
      </div>
      <div className={styles.frameParent}>
        <div className={styles.addATransactionWrapper}>
          <a
            className={styles.addATransaction}
            onClick={onAddATransactionClick}
          >
            add a transaction
          </a>
        </div>
        <div className={styles.frameGroup}>
          <FrameComponent2 />
          <div className={styles.recentActionsWrapper}>
            <b className={styles.recentActions}>Recent actions</b>
          </div>
        </div>
      </div>
      {/* <TransactionDetails
        date="2021-05-01"
        amount="20.00"
        paidBy="you"
        for="Andrew"
      />
      <TransactionDetails date="date" amount="111" paidBy="payer" for="payee" /> */}
    </div>
  );
};

export default MainPage;
