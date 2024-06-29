import React, { useState } from "react";
import "./AddFriends.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFriends = () => {
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

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/; // Adjust the regex as needed for your username validation
    return usernameRegex.test(username);
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!username) {
      formIsValid = false;
      errors["username"] = "Username is required";
    } else if (!validateUsername(username)) {
      formIsValid = false;
      errors["username"] = "Username is not valid";
    }

    if (!message) {
      formIsValid = false;
      errors["message"] = "Message is required";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userConfirmed = window.confirm(
      "Are you sure you want to send the invite?"
    );
    if (userConfirmed) {
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
                  navigate("/friendspage");
                } else {
                  alert(`Error: ${res.data.error}`);
                }
              })
              .catch((error) => {
                console.error("Error adding friend:", error);
                if (error.response && error.response.status === 401) {
                  alert(error.response.data.error);
                } else {
                  alert("An error occurred while adding the friend.");
                }
              });
          } else {
            alert("User not found");
          }
        })
        .catch((err) => {
          // console.error("Error fetching user ID:", error);
          alert(err.response.data.error);
        });
    } else {
      console.log("Invite not sent");
    }
  };

  const handleClose = useCallback(() => {
    // navigate("/friendspage");
  }, [navigate]);

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
