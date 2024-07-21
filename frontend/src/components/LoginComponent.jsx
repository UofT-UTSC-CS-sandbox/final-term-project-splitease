import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import "./LoginComponent.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ className = "" }) => {
  const navigate = useNavigate();
  const [suggestedNames, setSuggestions] = useState([]);

  const onButtonBackgroundClick = useCallback(() => {
    // Check if the user exists
    const username = document.querySelector(".username-field").value;
    const password = document.querySelector(".password-field").value;
    if (!username || !password) {
      Swal.fire("Error", "Please enter a username and password", "error");
      return;
    }

    // Send to login
    axios
      .post("user/login", {
        name: username,
        password: password,
      })
      .then((response) => {
        console.info("response", response);
        if (response.status === 200) {
          localStorage.setItem("u_name", username);
          localStorage.setItem("uid", response.data.user_id);
          Swal.fire("Logged in!", "You are now logged in.", "success").then(
            () => {
              navigate("/");
            }
          );
        } else {
          console.error("response", response);
        }
      })
      .catch(async (error) => {
        console.error("error", error);
        const response = error.response;

        // User not found, register
        if (response.status === 404) {
          Swal.fire({
            title: "User not found",
            text: "Do you want to register?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, register",
            cancelButtonText: "No, cancel",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await registerUser(username, password);
              Swal.fire(
                "Registered!",
                "You are now registered and logged in.",
                "success"
              ).then(() => {
                navigate("/");
              });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire("Cancelled", "You are not registered", "error");
            }
          });
        } else if (response.status === 401) {
          Swal.fire("Error", response.data.error, "error");
        }
      });
  }, []);

  const fetchUserList = useCallback(async (event) => {
    const username = event.target.value;
    if (!username) {
      setSuggestions([]);
      return;
    }
    const response = await axios.get(`/user/partial/${username}`);
    console.log(response);
    const users = response.data.users || [];
    const userNames = users.map((user) => user.name);
    setSuggestions(userNames);
  });

  // Catch enter key event
  useEffect(() => {
    const onEnter = (event) => {
      if (event.key === "Enter") {
        onButtonBackgroundClick();
      }
    };

    document.addEventListener("keydown", onEnter);
    return () => {
      document.removeEventListener("keydown", onEnter);
    };
  }, [onButtonBackgroundClick]);

  // Handle suggested name click
  const onNameClick = (name) => {
    document.querySelector(".username-field").value = name;
    setSuggestions([]);
  };

  return (
    <div className={`username-field-parent ${className}`}>
      <div className="autocomplete-container">
        <input
          className="username-field"
          placeholder="Username:"
          type="text"
          onChange={fetchUserList}
        />
        {suggestedNames.length > 0 && (
          <ul className="suggestions-list">
            {suggestedNames.map((suggestion, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => onNameClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <input
          className="password-field"
          placeholder="Password:"
          type="password"
        />
      </div>
      <div className="login-button-wrapper-wrapper">
        <div className="login-button-wrapper">
          <div className="button-background" onClick={onButtonBackgroundClick}>
            Login / Register
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};

export default LoginForm;
async function registerUser(username, password) {
  axios
    .post("user/register", {
      name: username,
      password: password,
    })
    .then((response) => {
      console.info("response", response);
      if (response.status === 200) {
        // Register successful
        localStorage.setItem("u_name", username);
        localStorage.setItem("uid", response.data.user_id);
      } else {
        console.error("response", response);
      }
    })
    .catch((error) => {
      alert(error.response.data.error);
      console.error("error", error);
    });
}
