import React, { useState } from "react";
import "./AddFriends.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const AddFriends = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!email) {
      formIsValid = false;
      errors["email"] = "Email is required";
    } else if (!validateEmail(email)) {
      formIsValid = false;
      errors["email"] = "Email is not valid";
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
      // TODO: Add the logic to handle the form submission
      console.log("Email:", email);
      console.log("Message:", message);
      navigate("/friendspage");
      // Here you would typically send the data to the server
    } else {
      // User canceled the action
      console.log("Invite not sent");
    }
  };

  const handleClose = useCallback(() => {
    alert("Warning: Your changes will not be saved!");
    navigate("/friendspage");
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
          type="email"
          className="add-friends-email"
          placeholder="Enter email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
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
