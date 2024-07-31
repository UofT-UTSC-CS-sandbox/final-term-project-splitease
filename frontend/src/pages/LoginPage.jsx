import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import "../components/Universal.css";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  // If the user is logged in, navigate to the dashboard
  useEffect(() => {
    if (localStorage.getItem("uid")) {
      axios
        .get(`/user/validate/${localStorage.getItem("uid")}`)
        .then(() => {
          console.log("User is logged in");
          navigate("/");
        })
        .catch((e) => {
          console.error("Error validating user:", e);
          localStorage.clear();
        });
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
          <LoginComponent />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
