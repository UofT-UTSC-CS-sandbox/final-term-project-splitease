import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FunctionSelectionPage.module.css";

const FunctionSelectionPage = () => {
  const navigate = useNavigate();

  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onRootContentClick = useCallback(() => {
    // Please sync "FriendsGroupsPage" to the project
  }, []);

  const onAddATransactionClick = useCallback(() => {
    navigate("/addtransactionpage");
  }, [navigate]);
  
  const onFriendsGroupsClick = useCallback(() => {
    navigate("/friendsgroupspage");
  },[navigate]);

  return (
    <div className={styles.functionselectionpage}>
      <header className={styles.rectangleParent}>
        <div className={styles.frameChild} />
        <div className={styles.deleteWrapper}>
          <img
            className={styles.deleteIcon}
            loading="lazy"
            alt=""
            src="/delete.svg"
            onClick={onDeleteIconClick}
          />
        </div>
        <a className={styles.selectAnAction}>Select an action</a>
      </header>
      <section className={styles.frameParent}>
        <div className={styles.friendsGroupsParent}>
          <div className={styles.friendsGroups}>{`Friends & Groups`}</div>
          <img
            className={styles.arrowRightIcon}
            loading="lazy"
            alt=""
            src="/arrowright1.svg"
            onClick={onFriendsGroupsClick}
          />
        </div>
        <div className={styles.rootContentParent}>
          <div className={styles.rootContent} onClick={onRootContentClick} />
          <img
            className={styles.userCheckIcon}
            loading="lazy"
            alt=""
            src="/usercheck.svg"
          />
        </div>
      </section>
      <section className={styles.frameGroup}>
        <div className={styles.addATransactionParent}>
          <div
            className={styles.addATransaction}
          >
            Add a transaction
          </div>
          <img
            className={styles.arrowRightIcon1}
            loading="lazy"
            alt=""
            src="/arrowright-1.svg"
            onClick={onAddATransactionClick}
          />
        </div>
        <div className={styles.rectangleGroup}>
          <div className={styles.frameItem} />
          <img
            className={styles.dollarSignIcon}
            loading="lazy"
            alt=""
            src="/dollarsign.svg"
          />
        </div>
      </section>
    </div>
  );
};

export default FunctionSelectionPage;
