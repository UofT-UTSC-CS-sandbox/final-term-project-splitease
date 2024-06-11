import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FrameComponent2.module.css";

const FrameComponent2 = ({ className = "" }) => {
  const onRectangleClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  return (
    <div className={[styles.frameWrapper, className].join(" ")}>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} onClick={onRectangle2Click} />
        <div className={styles.may24Wrapper}>
          <div className={styles.may24}>
            <p className={styles.may}>May</p>
            <p className={styles.p}>24</p>
          </div>
        </div>
        <div className={styles.frameParent}>
          <div className={styles.walmartWrapper}>
            <a className={styles.walmart}>Walmart</a>
          </div>
          <div className={styles.paidByYou}>paid by: you</div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.div}>$ 80.70</div>
        </div>
      </div>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
