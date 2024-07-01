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
      <img
        className={"frameChild"}
        alt=""
        src="/rectangle-1.svg"
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
        <a className={"totalBalance"}>Total balance</a>
        <div className={"frameWrapper"}>
          <div className={"oweParent"}>
            <b className={"owe"}>Owe: ${owe.toFixed(2)}</b>
            <div className={"owedParent"}>
              <b className={"owed"}>Owed: ${owed.toFixed(2)}</b>
              <div className={"costsParent"}>
                <div className={"costs"}>
                  April costs: ${totalBalance.toFixed(2)}
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
