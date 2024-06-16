import FrameComponent from "../components/FrameComponent3";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const MacBookPro14 = () => {
  const navigate = useNavigate();

  return (
    <div className="LoginPage-1">
      <header className="rectangle-container">
        <div className="frame-child2" />
        <a className="login">Login</a>
      </header>
      <section className="LoginPage-1-inner">
        <div className="frame-parent1">
          <div className="rectangle-wrapper">
            <div className="frame-child3" />
          </div>
          <FrameComponent />
        </div>
      </section>
    </div>
  );
};

export default MacBookPro14;
