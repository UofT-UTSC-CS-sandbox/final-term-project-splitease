import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./FrameComponent2.module.css";
import axios from "axios";

const FrameComponent2 = ({ className = "" }) => {
  const navigate = useNavigate();

  const [owe, setOwe] = useState(0);
  const [owed, setOwed] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const uid = localStorage.getItem("uid");

  // Update data when the page is loaded
  useEffect(() => {
    // Get balance data
    axios
      .get("/user/cost_pay/" + uid)
      .then((response) => {
        console.log(response.data);

        // Update the balance data
        setOwe(response.data.pay);
        setOwed(response.data.cost);
        setTotalBalance(response.data.cost - response.data.pay);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onRectangleClick = useCallback(() => {
    navigate("/functionselectionpage");
  }, [navigate]);

  const onWZY1ImageClick = useCallback(() => {
    navigate("/settingslogoutpage");
  }, [navigate]);

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
            <b className={styles.owe2500}>Owe: ${owe.toFixed(2)}</b>
            <div className={styles.owed1010Parent}>
              <b className={styles.owed1010}>Owed: ${owed.toFixed(2)}</b>
              <div className={styles.aprilCosts11069Parent}>
                <div className={styles.aprilCosts11069}>
                  April costs: ${totalBalance.toFixed(2)}
                </div>
                <div className={styles.arrowRightWrapper}>
                  <img
                    className={styles.arrowRightIcon}
                    loading="lazy"
                    alt=""
                    src="/arrowright.svg"
                    onClick={onRectangleClick}
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
