import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./MayTransactionDetails1.module.css";

const MayTransactionDetails1 = ({ className = "" }) => {
  const onMayTransactionShapeClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  return (
    <div className={[styles.mayTransactionDetails, className].join(" ")}>
      <div
        className={styles.mayTransactionShape}
        onClick={onMayTransactionShapeClick}
      />
      <div className={styles.mayTransactionDetailsInner}>
        <div className={styles.vectorParent}>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/rectangle-4.svg"
          />
          <div className={styles.may24}>
            <p className={styles.may}>May</p>
            <p className={styles.p}>24</p>
          </div>
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.walmartWrapper}>
          <a className={styles.walmart}>Walmart</a>
        </div>
        <div className={styles.paidByYou}>paid by: you</div>
      </div>
      <div className={styles.emptyLabelWrapper}>
        <div className={styles.emptyLabel}>$ 80.70</div>
      </div>
    </div>
  );
};

MayTransactionDetails1.propTypes = {
  className: PropTypes.string,
};

export default MayTransactionDetails1;
