import { useCallback } from "react";
import "./SettingsLogoutPage.css";
import "../components/Universal.css";
import { useNavigate } from "react-router-dom";
import { parseTransactions, validateUser } from "../components/Functions.jsx";
import Swal from "sweetalert2";

const SettingsLogoutPage = () => {
  validateUser();
  const navigate = useNavigate();

  const onBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onAccountSafetyClick = useCallback(() => {
    navigate("/profilebufferpage"); //change to profileBufferPage
  }, [navigate]);

  const onLogoutClick = useCallback(() => {
    // Clear local storage
    localStorage.clear();

    // Navigate to login page
    Swal.fire({
      title: "Logged out!",
      text: "You are now logged out.",
      icon: "success",
    }).then(() => {
      navigate("/login");
    });
  }, [navigate]);

  return (
    <div className="pageContainer">
      <div className="headerBackground" />
      <div className="headerText">Settings</div>
      <img
        className="deleteIcon"
        alt=""
        src="/delete.svg"
        onClick={onBackButtonClick}
      />
      <div className="accountSafetyBox">
        <div className="accountSafety" onClick={onAccountSafetyClick}>
          Account & Safety
        </div>
      </div>
      <div className="notificationsBox">
        <div className="notifications">Notifications</div>
      </div>
      <div className="deleteAccountBox">
        <div className="deleteAccount">Delete account</div>
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
