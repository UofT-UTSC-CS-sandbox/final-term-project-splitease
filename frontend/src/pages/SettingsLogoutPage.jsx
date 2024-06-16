import { useCallback } from "react";
import styles from "./SettingsLogoutPage.module.css";
import { useNavigate } from "react-router-dom";

const SettingsLogoutPage = () => {
  const navigate = useNavigate();
  
  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAccountSafetyClick = useCallback(() => {
    navigate("/profileeditorpage");
}, [navigate]);

  return (
    <div className={styles.settingslogoutpage}>
      <div className={styles.settingslogoutpageChild} />
      <img
        className={styles.deleteIcon}
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <div className={styles.settings}>Settings</div>
      <div className={styles.settingslogoutpageItem} />
      <div className={styles.settingslogoutpageInner} />
      <div className={styles.rectangleDiv} />
      <div className={styles.settingslogoutpageChild1} />
      <div className={styles.accountSafety} onClick={onAccountSafetyClick}>{`Account & Safety`}</div>
      <div className={styles.notifications}>Notifications</div>
      <div className={styles.logOut}>Log out</div>
      <div className={styles.switchAccount}>Switch account</div>
    </div>
  );
};

export default SettingsLogoutPage;
