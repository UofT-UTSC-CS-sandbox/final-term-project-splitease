import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({ className = "" }) => {
  const onOwedAmountShapeClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  return (
    <div className={[styles.frameParent, className].join(" ")}>
      <div className={styles.april28Wrapper}>
        <a className={styles.april28}>
          <p className={styles.april}>April</p>
          <p className={styles.p}>28</p>
        </a>
      </div>
      <div className={styles.snacksWrapper}>
        <a className={styles.snacks}>Snacks</a>
      </div>
      <div className={styles.frameWrapper}>
        <div className={styles.paidByYouForAndrewParent}>
          <div className={styles.paidByYouContainer}>
            <p className={styles.paidByYou}>paid by: you</p>
            <p className={styles.forAndrew}>for: andrew</p>
          </div>
          <div className={styles.total2000Owed1010}>
            <p className={styles.total2000}>Total:$20.00</p>
            <p className={styles.owed1010}>Owed:$10.10</p>
          </div>
        </div>
      </div>
      <div className={styles.owedAmountShapeParent}>
        <div
          className={styles.owedAmountShape}
          onClick={onOwedAmountShapeClick}
        />
        <img className={styles.frameChild} alt="" src="/rectangle-11.svg" />
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
