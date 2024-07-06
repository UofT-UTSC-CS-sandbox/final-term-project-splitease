import express from "express";
import {
  getFriends,
  addFriend,
  isFriend,
  getFriendDetails,
} from "../modules/friend.js";
import { getUserAndFriendBalance } from "../modules/transaction.js";

export const friendRouter = express.Router();
let state = 200;

friendRouter.get("/", async function (req, res) {
  console.info("You've reached the friend router!");
  res.status(state).end("You've reached the friend router!");
});

// Get total amount owed to user
friendRouter.post("/balance", async function (req, res) {
  const { uid, fid } = req.body;

  // Validate uid and fid
  if (!uid || !fid) {
    console.warn("Invalid uid or fid: ", uid, fid);
    res.status(401).json({ error: "Invalid uid or fid" });
  }

  // Get balance of a friend
  else {
    const balance = await getUserAndFriendBalance(uid, fid);
    console.info("balance", balance);
    res.status(200).json({ balance: balance });
  }
});

// Get transactions between user and friend
friendRouter.get("/transactions/:uid/:fid", async function (req, res) {
  const { uid, fid } = req.body;

  // Validate uid and fid
  if (!uid || !fid) {
    res.status(401).json({ error: "Invalid uid or fid" });
  }

  // Get transactions between user and friend
  else {
    const transactions = getTransactions(uid, fid);
    res.status(200).json({ transactions: transactions });
  }
});

// Get friends list
friendRouter.get("/of/:uid", async function (req, res) {
  const { uid } = req.params;

  // Validate id
  if (!uid) {
    res.status(401).json({ error: "Invalid user id" });
  }

  // Get friends list
  else {
    try {
      const friends = await getFriends(uid);
      if (friends) {
        console.info("friends", friends);
        res.status(200).json({ friends: friends });
      } else {
        res.status(401).json({ error: "Invalid user" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Add a friend
friendRouter.post("/add", async function (req, res) {
  const { uid, fid } = req.body;

  // Validate id and friendId
  if (!uid || !fid) {
    res.status(401).json({ error: "Invalid user id or friend id" });
  }

  // Add friend
  else {
    try {
      const success = await addFriend(uid, fid);
      if (success === true) {
        console.info("friend added");
        res.status(200).json({ success: true });
      } else if (success === -1) {
        res.status(401).json({ error: "Friend already exists" });
      } else if (success === 0) {
        res.status(401).json({ error: "User not found" });
      } else {
        console.error(success);
        res.status(401).json({ error: "Unknown" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Get friend details (name, info, balance, recent transactions)
friendRouter.post("/details", async function (req, res) {
  const { uid, fid } = req.body;

  // Validate id and friendId
  if (!uid || !fid) {
    res.status(401).json({ error: "Invalid user id or friend id" });
  }

  // Check if user is friends with friend
  else if (!isFriend(uid, fid)) {
    res.status(404).json({ error: "User is not friends with friend" });
  }

  // Get friend details
  else {
    const friend = await getFriendDetails(uid, fid);
    if (!friend) {
      res.status(401).json({ error: "Invalid user or friend" });
    }
    res.status(200).json({ friend: friend });
  }
});
