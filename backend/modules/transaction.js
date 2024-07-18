// import ObjectId from '../models/ObjectId.js';
import { ObjectId } from "mongodb";
import Transaction from "../models/Transaction.js";
import TransactionInfo from "../models/TransactionInfo.js";
import { getUserNameById, verifyUserById } from "./user.js";

export const geAllTransactions = async () => {
  const transaction = await Transaction.find();
  return transaction;
};

export const getAllTransactionInfo = async () => {
  const transactionInfo = await TransactionInfo.find();
  return transactionInfo;
};

const createTransaction = async (payer, payee, amount, transactionInfoId) => {
  // TODO: Check if payer and payee exist
  const transaction = new Transaction({
    payer,
    payee,
    amount,
    transactionInfoId,
  });
  return await transaction.save();
};

const createTransactionInfo = async (info) => {
  const transactionInfo = new TransactionInfo(info);
  return await transactionInfo.save();
};

export const addTransaction = async (uid, amount, description, friends) => {
  const _id = new ObjectId();
  // Check if uid exists
  if (!(await verifyUserById(uid))) {
    return { success: false, error: "User not found" };
  }

  amount = parseFloat(amount);
  const average = amount / (friends.length + 1); // Including the user

  const details = await Promise.all(
    friends.map(async (fid) => {
      // Check if fid exists
      if (!(await verifyUserById(fid))) {
        return { success: false, error: "Friend not found" };
      }

      // Create transaction for each friend
      const transaction = await createTransaction(uid, fid, average, _id);

      return { amount: average, transactionId: transaction._id };
    })
  );
  const info = { _id, payer: uid, amount, description, details };
  const infoId = await createTransactionInfo(info);
  return { success: true, infoId };
};

/**
 *
 * @param {*} id : transaction._id
 * @returns null || transaction
 */
export const getTransactionById = async (id) => {
  return await Transaction.findById(id);
};

/**
 *
 * @param {*} id : transactionInfo._id
 * @returns null || transactionInfo
 */
export const getTransactionInfoByInfoId = async (id) => {
  return await TransactionInfo.findById(id);
};

/**
 *
 * @param {*} id : transaction._id
 * @returns null || transactionInfo
 */
export const getTransactionInfoByTid = async (id) => {
  const transaction = await Transaction.findById(id);
  if (!transaction) return null;
  return await TransactionInfo.findById(transaction.transactionInfoId);
};

export const getTransactionByUser = async (id) => {
  return await Transaction.find({ $or: [{ payer: id }, { payee: id }] });
};

// Get parsed transaction details by info id
export const getTransactionDetails = async (id) => {
  const transactionInfo = await getTransactionInfoByInfoId(id);
  // console.log("transactionInfo", transactionInfo);
  if (!transactionInfo)
    return { success: false, error: "Transaction info not found" };

  const detail = transactionInfo.details[0];
  const { _, transactionId } = detail;
  const transactions = await Promise.all(
    transactionId.map(async (tid) => {
      const transaction = await getTransactionById(tid);
      return {
        id: transaction._id,
        payee: transaction.payee,
        payeeName: await getUserNameById(transaction.payee),
        amount: transaction.amount,
      };
    })
  );
  const parsedTransactionInfo = {
    id: transactionInfo._id,
    payer: transactionInfo.payer,
    payerName: await getUserNameById(transactionInfo.payer),
    payee: transactionInfo.payee,
    amount: transactionInfo.amount,
    description: transactionInfo.description,
    details: transactions,
  };
  // console.log("parsedTransactionInfo", parsedTransactionInfo);
  return parsedTransactionInfo;
};

export const getTransactionByUserAndFriend = async (uid, fid) => {
  // Both cost and pay should be returned
  const cost = await Transaction.find({ payer: uid, payee: fid });
  const pay = await Transaction.find({ payer: fid, payee: uid });

  // Concatenate cost and pay
  const transactions = [...cost, ...pay];
  return transactions;
};

export const getTransactionByGroup = async (gid) => {
  return await TransactionInfo.find({ group_id: gid });
};

export const getUserBalance = async (uid) => {
  const cost = await getUserCost(uid);
  const pay = await getUserPay(uid);
  return total_cost - total_pay; // sum(cost) - sum(pay)
};

/**
 *
 * @param {*} uid
 * @param {*} fid
 * @returns total_cost - total_pay,
 * where cost = {payer: user, payee: friend}
 * i.e. user paid for friend, and friend owes user
 */
export const getUserAndFriendBalance = async (uid, fid) => {
  const cost = await Transaction.aggregate([
    {
      $match: {
        payer: { $eq: new ObjectId(uid) },
        payee: { $eq: new ObjectId(fid) },
      },
    },
    { $project: { _id: null, transactions: "$amount" } },
    { $group: { _id: null, totalAmount: { $sum: "$transactions" } } },
  ]);

  const pay = await Transaction.aggregate([
    {
      $match: {
        payer: { $eq: new ObjectId(fid) },
        payee: { $eq: new ObjectId(uid) },
      },
    },
    { $project: { _id: null, transactions: "$amount" } },
    { $group: { _id: null, totalAmount: { $sum: "$transactions" } } },
  ]);

  console.log("cost", cost);
  console.log("pay", pay);

  const total_cost = cost.length === 0 ? 0 : cost[0].totalAmount;
  const total_pay = pay.length === 0 ? 0 : pay[0].totalAmount;
  return total_cost - total_pay;
};

export const getUserList = async (uid) => {
  const result = await Transaction.aggregate([
    {
      $match: {
        $or: [{ payer: ObjectId(uid) }, { payee: ObjectId(uid) }],
      },
    },
    {
      $addFields: {
        reversed: {
          $cond: {
            if: { $eq: ["payee", ObjectId(uid)] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        payer: {
          $cond: {
            if: "$reversed",
            then: "$payee",
            else: "$payer",
          },
        },
        payee: {
          $cond: {
            if: "$reversed",
            then: "$payer",
            else: "$payee",
          },
        },
        amount: {
          $cond: {
            if: "$reversed",
            then: { $multiply: ["$amount", -1] },
            else: "$amount",
          },
        },
        createdAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
  console.log(result);
  return result;
};

export const getUserAndFriendList = async (uid, fid) => {
  const result = await Transaction.aggregate([
    {
      $match: {
        $or: [
          { payer: ObjectId(uid), payee: ObjectId(fid) },
          { payer: ObjectId(fid), payee: ObjectId(uid) },
        ],
      },
    },
    {
      $addFields: {
        reversed: {
          $cond: {
            if: { $eq: ["$payer", ObjectId(fid)] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        payer: {
          $cond: {
            if: "$reversed",
            then: "$payee",
            else: "$payer",
          },
        },
        payee: {
          $cond: {
            if: "$reversed",
            then: "$payer",
            else: "$payee",
          },
        },
        amount: {
          $cond: {
            if: "$reversed",
            then: { $multiply: ["$amount", -1] },
            else: "$amount",
          },
        },
        createdAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ]);
  console.log(result);
  return result;
};
export async function getUserPay(uid) {
  const pay = await Transaction.aggregate([
    { $match: { payee: { $eq: new ObjectId(uid) } } },
    { $project: { _id: null, transactions: "$amount" } },
    { $group: { _id: null, totalAmount: { $sum: "$transactions" } } },
  ]);
  const total_pay = pay.length === 0 ? 0 : pay[0].totalAmount;
  return total_pay;
}

export async function getUserCost(uid) {
  const cost = await Transaction.aggregate([
    { $match: { payer: { $eq: new ObjectId(uid) } } },
    { $project: { _id: null, transactions: "$amount" } },
    { $group: { _id: null, totalAmount: { $sum: "$transactions" } } },
  ]);
  const total_cost = cost.length === 0 ? 0 : cost[0].totalAmount;
  return total_cost;
}
