import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = ({ className = "" }) => {
  const navigate = useNavigate();

  const onAddATransactionClick = useCallback(() => {
    // Please sync "AddTransactionPage" to the project
  }, []);

  const onRectangleClick = useCallback(() => {
    navigate("/functionselectionpage");
  }, [navigate]);

  const onWZY1ImageClick = useCallback(() => {
    // Please sync "MyProfilePage" to the project
  }, []);

  return (
    <div className={[styles.frameWrapper, className].join(" ")}>
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
          <div className={styles.frameContainer}>
            <div className={styles.vectorParent}>
              <img
                className={styles.frameChild}
                alt=""
                src="/rectangle-1.svg"
                onClick={onRectangleClick}
              />
              <a className={styles.totalBalance}>Total balance</a>
            </div>
          </div>
          <div className={styles.wzy1Parent}>
            <img
              className={styles.wzy1Icon}
              loading="lazy"
              alt=""
              src="/wzy-1@2x.png"
              onClick={onWZY1ImageClick}
            />
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
    </div>
  );
};

FrameComponent1.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent1;
