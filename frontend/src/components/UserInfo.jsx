import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfo.css";
import axios from "axios";

const UserInfo = () => {
  const navigate = useNavigate();

  const [owe, setOwe] = useState(0);
  const [owed, setOwed] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const uid = localStorage.getItem("uid");
  const u_name = localStorage.getItem("u_name");

  // Update data when the page is loaded
  useEffect(() => {
    // Get balance data
    axios
      .get("/user/cost_pay/" + uid)
      .then((response) => {
        console.log(response.data);

        // Update the balance data
        setOwe(response.data.pay);
        setOwed(response.data.cost);
        setTotalBalance(response.data.cost - response.data.pay);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onRectangleClick = useCallback(() => {
    navigate("/functionselectionpage");
  }, [navigate]);

  const onWZY1ImageClick = useCallback(() => {
    navigate("/settingslogoutpage");
  }, [navigate]);

  return (
    <div className={"vectorParent"}>
      <div
        className={"frameChild"}
        onClick={onRectangleClick}
      />
      <div className={"userWrapper"}>
        <img
          className={"userIcon"}
          loading="lazy"
          alt=""
          src="/wzy-1@2x.png"
          onClick={onWZY1ImageClick}
        />
      </div>
      <div className={"totalBalanceParent"}>
        <a className={"totalBalance"}> {u_name} </a>
        <div className={"frameWrapper"}>
          <div className={"oweParent"}>
            <b className={"owe"}>Owe: ${owe.toFixed(2)}</b>
            <div className={"owedParent"}>
              <b className={"owed"}>Owed: ${owed.toFixed(2)}</b>
              <div className={"costsParent"}>
                <div className={"costs"}>
                  Balance: ${totalBalance.toFixed(2)}
                </div>
                <div className={"arrowRightWrapper"}>
                  <img
                    className={"arrowRightIcon"}
                    loading="lazy"
                    alt=""
                    src="/arrowright.svg"
                    onClick={onRectangleClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
