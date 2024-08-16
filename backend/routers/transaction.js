import express from "express";
import {
  addTransactionFriends,
  addTransactionGroup,
  geAllTransactions,
  getAllTransactionInfo,
  getTransactionById,
  getTransactionDetails,
  getTransactionInfoByInfoId,
  getTransactionInfoByTid,
} from "../modules/transaction.js";

export const transactionRouter = express.Router();

transactionRouter.get("/", async function (req, res) {
  console.info("You've reached the transaction router!");
  res.status(200).json({ "transaction list": await geAllTransactions() });
});

transactionRouter.get("/info", async function (req, res) {
  console.info("You've reached the transaction info router!");
  res
    .status(200)
    .json({ "transaction info list": await getAllTransactionInfo() });
});

transactionRouter.get("/get/:id", async function (req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ error: "Invalid parameters" });
  } else {
    try {
      const transactionInfo = await getTransactionById(id);
      res.status(200).json(transactionInfo);
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

transactionRouter.get("/getInfo/:id", async function (req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ error: "Invalid parameters" });
  } else {
    try {
      const transactionInfo = await getTransactionInfoByInfoId(id);
      res.status(200).json(transactionInfo);
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

transactionRouter.get("/getInfoByTid/:id", async function (req, res) {
  const { id } = req.params;
  console.info("Getting transaction info by tid:", id);
  if (!id) {
    res.status(401).json({ error: "Invalid parameters" });
  } else {
    try {
      const transactionInfo = await getTransactionInfoByTid(id);
      res.status(200).json(transactionInfo);
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

transactionRouter.post("/add", async function (req, res) {
  const { uid, amount, description, friends } = req.body;
  if (!uid || !amount || !description || !friends) {
    res.status(401).json({ error: "Invalid parameters" });
  } else {
    try {
      const { success, error, infoId } = await addTransactionFriends(
        uid,
        amount,
        description,
        friends
      );
      if (!success) res.status(500).json({ error: error });
      else res.status(200).json(infoId);
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

/**
 * @param {*} id : transaction._id
 * @returns id, payer, payee, amount, description, details
 */
transactionRouter.get("/detail/:info_id", async function (req, res) {
  const { info_id } = req.params;

  if (!info_id) {
    res.status(401).json({ error: "Invalid parameters" });
  }

  try {
    const details = await getTransactionDetails(info_id);
    res.status(200).json(details);
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

// Get transactions by group id
transactionRouter.post("/add/group", async function (req, res) {
  const { uid, amount, description, groupId } = req.body;

  // Validate uid, amount, description, and groupId
  if (!uid || !amount || !description || !groupId) {
    res.status(401).json({ error: "Invalid parameters" });
    return;
  }

  // Add transaction
  try {
    const { success, error, infoId } = await addTransactionGroup(
      uid,
      amount,
      description,
      groupId
    );
    if (!success) res.status(500).json({ error: error });
    else res.status(200).json(infoId);
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});
