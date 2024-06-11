import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent2.module.css";

const FrameComponent2 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onRectangleClick = useCallback(() => {
    navigate("/functionselectionpage");
  }, [navigate]);

  const onWZY1ImageClick = useCallback(() => {
    // Please sync "MyProfilePage" to the project
  }, []);

  return (
    <div className={[styles.vectorParent, className].join(" ")}>
      <img
        className={styles.frameChild}
        alt=""
        src="/rectangle-1.svg"
        onClick={onRectangleClick}
      />
      <div className={styles.wzy1Wrapper}>
        <img
          className={styles.wzy1Icon}
          loading="lazy"
          alt=""
          src="/wzy-1@2x.png"
          onClick={onWZY1ImageClick}
        />
      </div>
      <div className={styles.totalBalanceParent}>
        <a className={styles.totalBalance}>Total balance</a>
        <div className={styles.frameWrapper}>
          <div className={styles.owe2500Parent}>
            <b className={styles.owe2500}>Owe: $25.00</b>
            <div className={styles.owed1010Parent}>
              <b className={styles.owed1010}>Owed: $10.10</b>
              <div className={styles.aprilCosts11069Parent}>
                <div className={styles.aprilCosts11069}>
                  April costs: $110.69
                </div>
                <div className={styles.arrowRightWrapper}>
                  <img
                    className={styles.arrowRightIcon}
                    loading="lazy"
                    alt=""
                    src="/arrowright.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FrameComponent2.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent2;
