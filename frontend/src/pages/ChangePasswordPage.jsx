import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseTransactions, validateUser } from "../components/Functions.jsx";
import "./ChangePasswordPage.css";
import Swal from "sweetalert2";
import axios from "axios";

const ChangePasswordPage = () => {
  validateUser();
  const uid = localStorage.getItem("uid");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [message, setMessage] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmitClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to change your password?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        handleChangePassword(e);
      }
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "New password and confirm password do not match!",
        icon: "error",
      });
      return;
    }

    const username = localStorage.getItem("u_name");
    console.log("the user name is: ", username);

    // Check if current password is correct
    axios
      .post("/user/login", { name: username, password: currentPassword })
      .then(
        (res) => {
          console.log("Password is correct");

          // Update password
          axios
            .post("/user/password/change", { uid, password: newPassword })
            .then((res) => {
              if (res.status === 200) {
                Swal.fire({
                  title: "Success!",
                  text: "Password changed successfully!",
                  icon: "success",
                }).then(() => {
                  localStorage.clear();
                  navigate("/login", { replace: true });
                });
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Please enter a different password!",
                  icon: "error",
                });
              }
            })
            .catch((e) => {
              console.error("Error changing password:", e);
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again later!",
                icon: "error",
              });
            });
        },
        (error) => {
          console.error("Error logging in:", error);
          if (error.response.status === 401) {
            Swal.fire({
              title: "Error!",
              text: "Current password is incorrect!",
              icon: "error",
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again later!",
              icon: "error",
            });
          }
        }
      );
  };

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
        <div className="form-group">
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
        </div>
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
        <button type="submit" onClick={onSubmitClick}>
          Change Password
        </button>
      </form>
      {/* {message && <p className="message">{message}</p>} */}
    </div>
  );
};

export default ChangePasswordPage;
