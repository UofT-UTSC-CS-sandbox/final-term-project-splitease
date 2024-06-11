import FrameComponent1 from "./FrameComponent1";
import FrameComponent2 from "./FrameComponent2";
import FrameComponent3 from "./FrameComponent3";
import FrameComponent4 from "./FrameComponent4";
import FrameComponent5 from "./FrameComponent5";
import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({
  className = "",
  onAddATransactionClick,
  onRectangle22Click,
  onWZY1ImageClick,
  onLastWeekTextClick,
  onRectangle23Click,
  onRectangle24Click,
  onRectangle9Click,
  onRectangle4Click,
  onRectangle5Click,
}) => {
  return (
    <section className={[styles.frameParent, className].join(" ")}>
      <FrameComponent1 />
      <div className={styles.recentActionsWrapper}>
        <b className={styles.recentActions}>Recent actions</b>
      </div>
      <div className={styles.frameGroup}>
        <div className={styles.vectorParent}>
          <img
            className={styles.frameChild}
            loading="lazy"
            alt=""
            src="/rectangle-3.svg"
          />
          <div className={styles.lastWeek} onClick={onLastWeekTextClick}>
            last week
          </div>
        </div>
        <FrameComponent2 />
        <FrameComponent3 />
        <div className={styles.frameWrapper}>
          <div className={styles.vectorGroup}>
            <img
              className={styles.frameItem}
              loading="lazy"
              alt=""
              src="/rectangle-3.svg"
              onClick={onRectangle9Click}
            />
            <div className={styles.lastMonth}>last month</div>
          </div>
        </div>
        <FrameComponent4 />
        <FrameComponent5 />
      </div>
    </section>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,

  /** Action props */
  onAddATransactionClick: PropTypes.func,
  onRectangle22Click: PropTypes.func,
  onWZY1ImageClick: PropTypes.func,
  onLastWeekTextClick: PropTypes.func,
  onRectangle23Click: PropTypes.func,
  onRectangle24Click: PropTypes.func,
  onRectangle9Click: PropTypes.func,
  onRectangle4Click: PropTypes.func,
  onRectangle5Click: PropTypes.func,
};

export default FrameComponent;
