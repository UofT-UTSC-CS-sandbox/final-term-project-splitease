import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = ({ className = "" }) => {
  const onOweAmountShapeClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.may2Wrapper}>
        <div className={styles.may2}>
          <p className={styles.may}>May</p>
          <p className={styles.p}>2</p>
        </div>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.movieTicketsWrapper}>
          <div className={styles.movieTickets}>Movie tickets</div>
        </div>
        <div className={styles.paidByGogo}>paid by: Gogo</div>
      </div>
      <div className={styles.total5000Owe2500Wrapper}>
        <div className={styles.total5000Owe2500}>
          <p className={styles.total5000}>Total:$50.00</p>
          <p className={styles.owe2500}>Owe:$25.00</p>
        </div>
      </div>
      <div className={styles.oweAmountShapeParent}>
        <div
          className={styles.oweAmountShape}
          onClick={onOweAmountShapeClick}
        />
        <div className={styles.owedAmountShape} />
      </div>
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
