import { useCallback } from "react";
import styles from "./AddTransactionPage.module.css";
import { useNavigate } from "react-router-dom";

const AddTransactionPage = () => {
  const navigate = useNavigate();
  const onRectangle4Click = useCallback(() => {
    // Please sync "MainPage_Added_Transaction" to the project
  }, []);

  const onConfirmTextClick = useCallback(() => {
    // Please sync "MainPage" to the project
  }, []);
  const onDeleteIconClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div className={styles.addtransactionpage}>
      <div className={styles.addtransactionpageChild} />
      <div className={styles.addATransaction}>Add a Transaction</div>
      <img className={styles.deleteIcon} alt="" src="/delete.svg" 
      onClick={onDeleteIconClick}/>
      <div className={styles.addtransactionpageItem} />
      <div className={styles.addtransactionpageInner} />
      <div className={styles.selectATeam}>
        Select a team or friend to share this bill
      </div>
      <div className={styles.rectangleDiv} />
      <img className={styles.lineIcon} alt="" src="/line-1.svg" />
      <img className={styles.addtransactionpageChild1} alt="" />
      <div className={styles.chooseAMethod}>
        Choose a method to split this bill
      </div>
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
      <div className={styles.youWillPay}>You will pay a total of $ 0.00</div>
      <div
        className={styles.addtransactionpageChild2}
        onClick={onRectangle4Click}
      />
      <div className={styles.confirm} onClick={onConfirmTextClick}>
        Confirm
      </div>
      <div className={styles.save}>Save</div>
    </div>
  );
};

export default AddTransactionPage;
