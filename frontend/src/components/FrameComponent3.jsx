import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FrameComponent3.module.css";

const FrameComponent3 = ({ className = "" }) => {
  const onRectangleClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  return (
    <div className={[styles.frameWrapper, className].join(" ")}>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} onClick={onRectangle3Click} />
        <div className={styles.frameContainer}>
          <div className={styles.may23Parent}>
            <div className={styles.may23}>
              <p className={styles.may}>May</p>
              <p className={styles.p}>23</p>
            </div>
            <img
              className={styles.frameItem}
              loading="lazy"
              alt=""
              src="/rectangle-4.svg"
            />
          </div>
        </div>
        <div className={styles.frameDiv}>
          <div className={styles.subscriptionParent}>
            <div className={styles.subscription}>subscription</div>
            <div className={styles.paidByYouWrapper}>
              <div className={styles.paidByYou}>paid by: you</div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.div}>$ 9.99</div>
        </div>
      </div>
    </div>
  );
};

FrameComponent3.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent3;
