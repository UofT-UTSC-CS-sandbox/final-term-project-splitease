import React from "react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TransactionActivity = ({ transactions, uid, friendsInfo }) => {
  const navigate = useNavigate();

  const onTransactionDetailsClick = useCallback(() => {
    navigate("/transactiondetailpage");
  }, [navigate]);

  return (
    <div onClick={onTransactionDetailsClick}>
      {transactions.map((transaction) => (
        <div className="activity" key={transaction.id}>
          <div className="activity-date">{transaction.date}</div>
          <div className="activity-details">
            <div className="activity-name">{transaction.name}</div>
            <div className="activity-split">
              Paid by:{" "}
              {transaction.payerId === uid
                ? transaction.payer + " (You)"
                : transaction.payer}
            </div>
          </div>
          {(transaction.payer === friendsInfo.name) ^ (transaction.amount < 0) ? (
            <div className="activity-amount-negative">
              -${Math.abs(transaction.amount).toFixed(2)}
            </div>
          ) : (
            <div className="activity-amount-positive">
              ${Math.abs(transaction.amount).toFixed(2)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionActivity;
