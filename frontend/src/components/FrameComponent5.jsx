import { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FrameComponent5.module.css";

const FrameComponent5 = ({ className = "" }) => {
  const onRectangleClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  return (
    <div className={[styles.april28Parent, className].join(" ")}>
      <a className={styles.april28}>
        <p className={styles.april}>April</p>
        <p className={styles.p}>28</p>
      </a>
      <div className={styles.snacksParent}>
        <a className={styles.snacks}>Snacks</a>
        <div className={styles.paidByYouForAndrewWrapper}>
          <div className={styles.paidByYouContainer}>
            <p className={styles.paidByYou}>paid by: you</p>
            <p className={styles.forAndrew}>for: andrew</p>
          </div>
        </div>
      </div>
      <div className={styles.total2000Owed1010}>
        <p className={styles.total2000}>Total:$20.00</p>
        <p className={styles.owed1010}>Owed:$10.10</p>
      </div>
      <div className={styles.rectangleParent}>
        <div className={styles.frameChild} onClick={onRectangle5Click} />
        <div className={styles.vectorParent}>
          <img className={styles.frameItem} alt="" src="/rectangle-11.svg" />
          <img
            className={styles.iconSmallShopAlt}
            loading="lazy"
            alt=""
            src="/-icon-small-shop-alt.svg"
          />
        </div>
      </div>
    </div>
  );
};

FrameComponent5.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent5;
