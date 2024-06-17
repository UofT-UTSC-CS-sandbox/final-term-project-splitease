import { useCallback } from "react";
import styles from "./SettingsLogoutPage.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SettingsLogoutPage = () => {
  const navigate = useNavigate();

  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAccountSafetyClick = useCallback(() => {
    navigate("/profileeditorpage");
  }, [navigate]);

  const onLogoutClick = useCallback(() => {
    // Clear local storage
    localStorage.removeItem("uid");
    localStorage.removeItem("u_name");
    localStorage.removeItem("transactions");

    // Navigate to login page
    Swal.fire("Logged out!", "You are now logged out.", "success").then(() => {
      navigate("/login");
    });
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
      <div
        className={styles.accountSafety}
        onClick={onAccountSafetyClick}
      >{`Account & Safety`}</div>
      <div className={styles.notifications}>Notifications</div>
      <div className={styles.logOut} onClick={onLogoutClick}>
        Log out
      </div>
      <div className={styles.switchAccount}>Switch account</div>
    </div>
  );
};

export default SettingsLogoutPage;
