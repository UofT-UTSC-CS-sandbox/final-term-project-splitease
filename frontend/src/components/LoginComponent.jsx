import PropTypes from "prop-types";
import { useCallback, useEffect } from "react";
import "./LoginComponent.css";
import axios from "axios";

const LoginForm = ({ className = "" }) => {
  const onButtonBackgroundClick = useCallback(() => {
    // Check if the user exists
    const username = document.querySelector(".username-field").value;
    const password = document.querySelector(".password-field").value;

    if (!username || !password) {
      alert("Please enter a username and password");
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
          window.location.href = "/";
        } else {
          console.error("response", response);
        }
      })
      .catch((error) => {
        console.error("error", error);
        const response = error.response;
        if (response.status === 404) {
          // User not found, register
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
                window.location.href = "/";
              } else {
                console.error("response", response);
              }
            })
            .catch((error) => {
              alert(error.response.data.error);
              console.error("error", error);
            });
        } else if (response.status === 401) {
          alert(error.response.data.error);
        }
      });
  }, []);

  return (
    <div className={`username-field-parent ${className}`}>
      <input className="username-field" placeholder="Username:" type="text" />
      <input className="password-field" placeholder="Password:" type="text" />
      {/* <div className="sign-up-wrapper">
        <div className="sign-up">Sign up</div>
      </div> */}
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
