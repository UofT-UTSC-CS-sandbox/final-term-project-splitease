import React, { useState } from "react";
import "./AddFriends.css";
import "../components/Universal.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddFriends = ({ isAddFriendsOpen, setIsAddFriendsOpen }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      try {
        const response = await axios.get(`/user/partial/${value}`);
        console.log("suggestions are: ", response.data);
        console.log("suggestions are: ", response.data);
        const users = response.data.users || [];
        const userNames = users.map((user) => user.name);
        setSuggestions(userNames);
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!inputValue) {
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
      .get(`/user/id/of/${inputValue}`)
      .then((response) => {
        const friendId = response.data.user_id;

        if (friendId) {
          // Send a POST request to add the friend
          axios
            .post("/friend/add", { uid, fid: friendId })
            .then((res) => {
              console.log("Response:", res.data);
              if (res.data.success) {
                Swal.fire({
                  title: "Success!",
                  text: "Friend added successfully!",
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
                  text: "Something went wrong. Please try again later!",
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
            text: "Friend not found!",
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching friend ID:", err);
        if (err.response) {
          Swal.fire({
            title: "Error!",
            text: "Error fetching friend ID!",
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
        <div className="friends-autocomplete-container">
          <input
            type="text"
            className="friends-autocomplete-input"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Start typing to search..."
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item"
                  onClick={() => onSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {errors.inputValue && (
            <div className="error">{errors.inputValue}</div>
          )}
        </div>

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
