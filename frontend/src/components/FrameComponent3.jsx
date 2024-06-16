import { useCallback } from "react";
import PropTypes from "prop-types";
import "./FrameComponent3.css";

const FrameComponent = ({ className = "" }) => {
  const onButtonBackgroundClick = useCallback(() => {
    // Please sync "MainPage_Added_Transaction" to the project
  }, []);

  return (
    <div className={`username-field-parent ${className}`}>
      <input className="username-field" placeholder="Username:" type="text" />
      <input className="password-field" placeholder="Password:" type="text" />
      <div className="sign-up-wrapper">
        <div className="sign-up">Sign up</div>
      </div>
      <div className="login-button-wrapper-wrapper">
        <div className="login-button-wrapper">
          <div
            className="button-background"
            onClick={onButtonBackgroundClick}
          />
          <b className="login1">Login</b>
        </div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
