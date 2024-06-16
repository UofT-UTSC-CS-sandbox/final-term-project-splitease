import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginComponent";
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
    <div className="LoginPage-1">
      <header className="rectangle-container">
        <div className="frame-child2" />
        <a className="login">Login or Register</a>
      </header>
      <section className="LoginPage-1-inner">
        <div className="frame-parent1">
          <div className="rectangle-wrapper">
            <div className="frame-child3" />
          </div>
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
