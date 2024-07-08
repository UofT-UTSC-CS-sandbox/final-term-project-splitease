import axios from "axios";

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
