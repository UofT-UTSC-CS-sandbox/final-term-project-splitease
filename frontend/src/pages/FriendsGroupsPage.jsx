import { useCallback } from "react";
import styles from "./FriendsGroupsPage.module.css";
import { useNavigate } from "react-router-dom";

const FriendsGroupsPage = () => {
  const navigate = useNavigate();
  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.friendsgroupspage}>
      <div className={styles.friendsgroupspageChild} />
      <div className={styles.friendsGroups}>{`Friends & Groups`}</div>
      <img
        className={styles.deleteIcon}
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <div className={styles.friendsgroupspageItem} />
      <img className={styles.arrowRightIcon} alt="" src="/arrowright.svg" />
      <div className={styles.friends}>Friends</div>
      <div className={styles.friendsgroupspageInner} />
      <img className={styles.arrowRightIcon1} alt="" src="/arrowright1.svg" />
      <div className={styles.groups}>Groups</div>
    </div>
  );
};

export default FriendsGroupsPage;
