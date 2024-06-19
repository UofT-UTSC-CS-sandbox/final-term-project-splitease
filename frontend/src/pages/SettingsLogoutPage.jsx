import { useCallback } from "react";
import "./SettingsLogoutPage.css";
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
    <div className="settingslogoutpage">
      <div className="settingslogoutpageChild" />
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <div className="settings">Settings</div>
      <div className="accountSafetyBox">
        <div className="accountSafety" onClick={onAccountSafetyClick}>
          Account & Safety
        </div>
      </div>
      <div className="notificationsBox">
        <div className="notifications">Notifications</div>
      </div>
      <div className="switchAccountBox">
        <div className="switchAccount">Switch account</div>
      </div>
      <div className="logOutBox">
        <div className="logOut" onClick={onLogoutClick}>
          Log out
        </div>
      </div>
    </div>
  );
};

export default SettingsLogoutPage;
