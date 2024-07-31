import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const getUserNameById = async (id) => {
  if (!id) {
    console.error("Invalid user id:", id);
    return null;
  }
  try {
    const response = await axios.get(`/user/name/of/${id}`);
    return response.data.name;
  } catch (e) {
    console.error("Error getting user name by id:", e);
    return null;
  }
};

/**
 *
 * @param {*} id : Transaction ID, NOT TransactionInfo ID
 * @returns TransactionInfo object
 */
export const getTransactionInfoByTid = async (id) => {
  if (!id) {
    console.error("Invalid transaction id:", id);
    return null;
  }
  try {
    const response = await axios.get(`/transaction/getInfoByTid/${id}`);
    return response.data;
  } catch (e) {
    console.error("Error getting transaction info:", e);
    return null;
  }
};

/**
 *
 * @param {*} transactionInfo.createdAt
 * @returns The date in `hh:mm AM/PM` if it is today, o/w `MM DD, YY`.
 */
export function formatDate(createdAt, comma = true) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "2-digit",
  });
  let formattedDate = date.split(", "); // Format MM DD YY
  formattedDate = formattedDate[0] + (comma ? ", " : " ") + formattedDate[1];

  // Check if date is today
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "2-digit",
  });
  if (date === today) {
    // Make it hh:mm AM/PM
    formattedDate = new Date(createdAt).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
  }
  return formattedDate;
}

/**
 *
 * @param {*} friend
 * @returns Parsed transactions in format: See example below.
 * @example Output Format:
 * {
 *   id: transaction._id,
 *   date: formattedDate,
 *   name: transactionInfo.description,
 *   payer: await getUserNameById(transaction.payer),
 *   payerId: transaction.payer,
 *   amount: transaction.amount,
 * }
 * 
 * @example Use:
 *    const transactions = await parseTransactions(friend.friend.transactions);
      setTransactions(transactions);
 */
export async function parseTransactions(transactions) {
  return await Promise.all(
    transactions.map(async (transaction) => {
      const transactionInfo = await getTransactionInfoByTid(transaction._id);
      // console.info("Transaction Info:", transactionInfo);

      // Get date in MM DD, YY format
      let formattedDate = formatDate(transactionInfo.createdAt, false);

      return {
        id: transaction._id,
        date: formattedDate,
        name: transactionInfo.description,
        payer: await getUserNameById(transaction.payer),
        payerId: transaction.payer,
        amount: transaction.amount,
      };
    })
  );
}

export async function parseTransactionsbyInfo(transactions) {
  return await Promise.all(
    transactions.map(async (transaction) => {

      // Get date in MM DD, YY format
      let formattedDate = formatDate(transaction.createdAt, false);

      return {
        id: transaction._id,
        date: formattedDate,
        name: transaction.description,
        payer: await getUserNameById(transaction.payer),
        payerId: transaction.payer,
        amount: transaction.amount,
      };
    })
  );
}

export function validateUser() {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  if (!uid) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not logged in!",
    }).then(() => {
      navigate("/login");
    });
  }

  axios.get(`/user/validate/${uid}`).catch((e) => {
    console.error("Error validating user:", e);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your session has expired. Please log in again!",
    }).then(() => {
      navigate("/login");
    });
  });

  return true;
}

// export function withUserValidation(Component) {
//   validateUser(); // ! why not use useEffect?
//   return <Component />;
// }
