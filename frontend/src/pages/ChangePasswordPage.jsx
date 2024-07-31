import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseTransactions, validateUser } from "../components/Functions.jsx";
import "./ChangePasswordPage.css";
import Swal from "sweetalert2";
import axios from "axios";

const ChangePasswordPage = () => {
  validateUser();
  const uid = localStorage.getItem("uid");
  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }
      // const response = await axios.get(`/user/name/of/${id}`);
      // const username = response.data.name;
      const username = localStorage.getItem("u_name");
      console.log("the user name is: ", username);

        // Update password
        axios
         .post("/user/password/change", { uid, password: newPassword })
         .then((res) => {
            if (res.status === 200) {
              setMessage("Password changed successfully.");
              Swal.fire("Password changed successfully!", "success").then(
                () => {
                  localStorage.clear();
                  navigate("/login");
                }
              );
            } else {
              setMessage("Failed to change password.");
            }
          })
         .catch((e) => {
            console.error("Error changing password:", e);
            setMessage("Failed to change password.");
          });
      } 

  const handleBack = () => {
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want quit? Your changes will not be saved.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(-1);
      }
    });
  };

  return (
    <div className="change-password-page">
      <div className="change-password-header">
        <div className="change-password-title">Change Password</div>
        <div className="back-button" onClick={handleBack}>
          ×
        </div>
      </div>
      <form onSubmit={handleChangePassword}>
        {/* <div className="form-group">
          <label htmlFor="current-password">Current Password</label>
          <div className="password-input">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div> */}
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <div className="password-input">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm New Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePasswordPage;
