import { useCallback } from "react";
import styles from "./AddTransactionPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddTransactionPage = () => {
  const navigate = useNavigate();

  const onConfirmTextClick = useCallback(() => {
    // Find text input with id="amount"
    const amount = document.getElementById("amount").value;
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    // No team/friend provided. Use sample data.
    const transactions = [
      {
        group_id: 1,
        friends: ["666d0493e6e4abae269d0bd0", "666d0495e6e4abae269d0bd2"],
        amount: parseFloat(amount),
      },
    ];
    const description = "Test Trans";
    const id = localStorage.getItem("uid");

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

  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div className={styles.addtransactionpage}>
      <div className={styles.addtransactionpageChild} />
      <div className={styles.addATransaction}>Add a Transaction</div>
      <img
        className={styles.deleteIcon}
        alt=""
        src="/delete.svg"
        onClick={onDeleteIconClick}
      />
      <div className={styles.addtransactionpageItem} />
      <div className={styles.addtransactionpageInner} />
      <div className={styles.selectATeam}>
        Select a team or friend to share this bill
      </div>
      <div className={styles.rectangleDiv} />
      {/* Add float input here */}
      <div className={styles.inputDiv}>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Amount"
          id="amount"
        />
      </div>
      <img className={styles.lineIcon} alt="" src="/line-1.svg" />
      <img className={styles.addtransactionpageChild1} alt="" />
      <div className={styles.chooseAMethod}>
        Choose a method to split this bill
      </div>
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      <div className={styles.youWillPay}>You will pay a total of $ 0.00</div>
      <div className={styles.confirm} onClick={onConfirmTextClick}>
        Confirm
      </div>
    </div>
  );
};

export default AddTransactionPage;
