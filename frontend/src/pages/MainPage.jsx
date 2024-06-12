import { useCallback } from "react";
import FrameComponent2 from "../components/FrameComponent2";
import MayTransactionDetails1 from "../components/MayTransactionDetails1";
import MayTransactionDetails from "../components/MayTransactionDetails";
import FrameComponent1 from "../components/FrameComponent1";
import FrameComponent from "../components/FrameComponent";
import styles from "./MainPage.module.css";
import { useNavigate } from "react-router-dom";

const TransactionDetails = (props) => {
  return(
    <>
      <div className={styles.balancetable}>
      <h3>Date:{props.date} amount:{props.amount}</h3>
      <h3>paid by:{props.paidBy} for:{props.for}</h3>
      </div>
    </>
  )
}
const MainPage = () => {
  const navigate = useNavigate();
  const onLastWeekTextClick = useCallback(() => {
    // Please sync "SpecifiedTransactionsPage" to the project
  }, []);

  const onAddATransactionClick = useCallback(() => {
    navigate("/addtransactionpage");
  }, [navigate]);

  const onRectangle2Click = useCallback(() => {
    // Please sync "SpecifiedTransactionsPage" to the project
  }, []);

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
      <TransactionDetails date="2021-05-01" amount="20.00" paidBy="you" for="Andrew"/>
      <TransactionDetails date="date" amount="111" paidBy="payer" for="payee"/>
    </div>
  );
};

export default MainPage;
