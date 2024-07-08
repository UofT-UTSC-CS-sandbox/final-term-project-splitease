import { useCallback } from "react";
import "./AddTransactionPage.css";
import "../components/Universal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTransactionPage = () => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  const onConfirmTextClick = useCallback(() => {
    // Find text input with id="amount"
    const amount = document.getElementById("amount").value;
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    // No team/friend provided. Use sample data.
    // TODO: Replace with actual friend data
    const transactions = [
      {
        group_id: 1,
        friends: ["666eacf43ca32def0e16e943", uid],
        amount: parseFloat(amount),
      },
    ];
    const description = "TransDescFoo";
    const id = localStorage.getItem("uid");

    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to log in first!",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // POST request to add a transaction
    axios
      .post(`/transaction/add/${id}`, {
        description,
        transactions,
      })
      .then((data) => {
        console.log("Response", data);
        if (data.error) {
          alert(data.error);
        } else {
          navigate("/"); // Redirect to the main page
        }
      });
  }, [navigate]);

  const onBackButtonClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div className={"pageContainer"}>
      <div className={"headerBackground"} />
      <div className={"headerText"}>Add a Transaction</div>
      <img
        className={"deleteIcon"}
        alt=""
        src="/delete.svg"
        onClick={onBackButtonClick}
      />
      <div className={"selectATeam"}>
        Select a team or friend to share this bill
      </div>
      <div className={"rectangleDiv"} />
      <div className={"inputDiv"}>
        <input
          className={"input"}
          type="text"
          placeholder="Enter Amount"
          id="amount"
        />
      </div>
      <img className={"lineIcon"} alt="" src="/line-1.svg" />
      <img className={"line"} alt="" />
      <div className={"chooseAMethod"}>Choose a method to split this bill</div>
      <img className={"vectorIcon"} alt="" src="/vector.svg" />
      <div className={"youWillPay"}>You will pay a total of $ 0.00</div>
      <div className={"confirm"} onClick={onConfirmTextClick}>
        Confirm
      </div>
    </div>
  );
};

export default AddTransactionPage;
