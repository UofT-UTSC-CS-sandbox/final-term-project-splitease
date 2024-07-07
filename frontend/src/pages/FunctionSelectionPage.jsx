import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./FunctionSelectionPage.css";

const FunctionSelectionPage = () => {
  const navigate = useNavigate();

  const onBackButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAddATransactionClick = useCallback(() => {
    navigate("/addtransactionpage");
  }, [navigate]);

  const onFriendsGroupsClick = useCallback(() => {
    navigate("/friendsgroupspage");
  }, [navigate]);

  return (
    <div className={"functionselectionpage"}>
      <header className={"headerParent"}>
        <img
          className={"deleteIcon"}
          loading="lazy"
          alt=""
          src="/delete.svg"
          onClick={onBackButtonClick}
        />
        <a className={"selectAnAction"}>Select an action</a>
      </header>
      <section className={"friendsGroupsParent"} onClick={onFriendsGroupsClick}>
        <div className={"friendsGroupsChild"}>
          <div className={"friendsGroups"}>Friends & Groups</div>
          <img
            className={"arrowRightIcon"}
            loading="lazy"
            alt=""
            src="/arrowright1.svg"
          />
        </div>
        <div className={"userCheck"}>
          <img
            className={"userCheckIcon"}
            loading="lazy"
            alt=""
            src="/usercheck.svg"
          />
        </div>
      </section>
      <section
        className={"addTransactionGroup"}
        onClick={onAddATransactionClick}
      >
        <div className={"addATransactionParent"}>
          <div className={"addATransaction"}>Add a transaction</div>
          <img
            className={"arrowRightIcon1"}
            loading="lazy"
            alt=""
            src="/arrowright-1.svg"
          />
        </div>
        <div className={"dollarSign"}>
          <img
            className={"dollarSignIcon"}
            loading="lazy"
            alt=""
            src="/dollarsign.svg"
          />
        </div>
      </section>
    </div>
  );
};

export default FunctionSelectionPage;
