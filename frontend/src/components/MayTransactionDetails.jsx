import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./MayTransactionDetails.module.css";

const MayTransactionDetails = ({ className = "" }) => {
  const onRectangleClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  return (
    <div className={[styles.mayTransactionDetails, className].join(" ")}>
      <div
        className={styles.mayTransactionDetailsChild}
        onClick={onRectangleClick}
      />
      <div className={styles.may23}>
        <p className={styles.may}>May</p>
        <p className={styles.p}>23</p>
      </div>
      <div className={styles.subscriptionParent}>
        <div className={styles.subscription}>subscription</div>
        <div className={styles.paidByYouWrapper}>
          <div className={styles.paidByYou}>paid by: you</div>
        </div>
      </div>
      <div className={styles.div}>$ 9.99</div>
    </div>
  );
};

MayTransactionDetails.propTypes = {
  className: PropTypes.string,
};

export default MayTransactionDetails;
