import { useCallback, useEffect } from "react";
import UserInfo from "../components/UserInfo";
import styles from "./MainPage.module.css";
// TODO: Rename the MainPage css file, remove import styles statement above and change the className values in the return statement below
import { useNavigate } from "react-router-dom";
import { formatDate } from "../components/Functions.jsx";
import axios from "axios";
import TransactionActivity from "../components/TransactionBlock.jsx";

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
          // TODO: modify the below code to correctly display a message when there are no transactions
          document.querySelector(
            "." + styles.aprilCosts11069 /*aprilCosts11069 DNE*/
          ).textContent = "You have no recent transactions";
          return;
        }

        // for (let i = 0; i < transactions.length; i++) {
        for (let i = transactions.length - 1; i >= 0; i--) {
          let transaction = transactions[i];
          let details = transaction.details;
          let total = 0;
          for (let j = 0; j < details.length; j++) {
            total += details[j].amount;
          }
          let date_str = formatDate(transaction.createdAt);
          let desc_str = transaction.description;
          let amount_str = total.toFixed(2);
          let total_str = `${date_str} '${desc_str}': $${amount_str}`;
          console.log(total_str);

          // Update the transaction data on the page
          let transactionElement = document.createElement("div");
          transactionElement.textContent = total_str;
          //Find element by text "Recent actions"
          let recentActionsElement = document.querySelector(
            // TODO: modify the below code to correctly select the recent actions element
            "." + styles.recentActions
          );
          recentActionsElement.appendChild(transactionElement);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onAddATransactionClick = useCallback(() => {
    navigate("/addtransactionpage");
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
        <div className={"frameGroup"}>
          <UserInfo />
          <div className={styles.recentActionsWrapper}>
            <b className={styles.recentActions}>Recent actions</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
