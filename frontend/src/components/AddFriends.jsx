import React, { useState } from "react";
import "./AddFriends.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddFriends = ({ isAddFriendsOpen, setIsAddFriendsOpen }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!username) {
      formIsValid = false;
      errors["username"] = "Username is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const uid = localStorage.getItem("uid");

    // First, fetch the friend's user ID by username
    axios
      .get(`/user/id/of/${username}`)
      .then((response) => {
        const friendId = response.data.user_id;

        if (friendId) {
          // Send a POST request to add the friend
          axios
            .post("/friend/add", { uid, fid: friendId })
            .then((res) => {
              console.log("Response:", res.data);
              if (res.data.success) {
                console.log("Friend added successfully");
                Swal.fire({
                  title: "Success!",
                  text: "Friend added successfully",
                  icon: "success",
                }).then((result) => {
                  if (result.isConfirmed) {
                    // Hide this component
                    setIsAddFriendsOpen(false);
                    // Refresh the friends list
                    navigate(0, { replace: true });
                  }
                });
              } else {
                console.error("Error adding friend:", res.data.error);
                Swal.fire({
                  title: "Error!",
                  text: res.data.error,
                  icon: "error",
                });
              }
            })
            .catch((error) => {
              console.error("Error adding friend:", error);
              if (error.response) {
                Swal.fire({
                  title: "Error!",
                  text: "Friend already added!",
                  icon: "error",
                });
              }
            });
        } else {
          console.error("Friend ID not found");
          Swal.fire({
            title: "Error!",
            text: "Friend not found",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching friend ID:", err);
        if (err.response) {
          Swal.fire({
            title: "Error!",
            text: err.response.data.error,
            icon: "error",
          });
        }
      });
  };

  const handleClose = useCallback(() => {
    Swal.fire({
      title: "Warning!",
      text: "Your changes will not be saved!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Stay",
    }).then((result) => {
      if (result.isConfirmed) {
        // Hide this component
        setIsAddFriendsOpen(false);
        // No need to refresh the friends list
      }
    });
  }, [navigate]);

  if (!isAddFriendsOpen) {
    return null;
  }

  return (
    <div className="add-friends-container">
      <div className="add-friends-header">
        <div className="add-friends-title">Invite friends</div>
        <div className="close-button" onClick={handleClose}>
          ×
        </div>
      </div>
      <form className="add-friends-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="add-friends-email"
          placeholder="Enter username"
          value={username}
          onChange={handleUsernameChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}
        <textarea
          className="add-friends-message"
          placeholder="Include an optional message"
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        {errors.message && <div className="error">{errors.message}</div>}
        <button type="submit" className="add-friends-button">
          Send invites and add friends
        </button>
      </form>
    </div>
  );
};

export default AddFriends;
