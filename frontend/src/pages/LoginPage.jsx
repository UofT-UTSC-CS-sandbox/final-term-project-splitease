import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginComponent";
import "../components/Universal.css";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  // If the user is logged in, navigate to the dashboard
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="pageContainer">
      <div className="headerBackground" />
      <div className="headerText">Login/Register</div>
      <section className="loginPage">
        <div className="loginContainer">
          <div className="logoWrapper">
            <img
              className="logo"
              loading="lazy"
              alt=""
              src="/SplitEaseLogo.png"
            />
          </div>
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
