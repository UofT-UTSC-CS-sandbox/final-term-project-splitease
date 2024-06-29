import express from "express";
import {
  checkUserPassword,
  getUserIdByName,
  getUserNameById,
  registerUser,
  getAllUsers,
  verifyUserById,
  createGroup,
  getGroups,
  getGroupNameById,
} from "../modules/user.js";
import {
  getUserBalance,
  getUserCost,
  getUserPay,
  addTransaction,
  getTransactionByUser,
  getTransactionByUserAndFriend,
} from "../modules/transaction.js";
import e from "express";

export const userRouter = express.Router();
// root = localhost:3000/user
// localhost:3000/user/
userRouter.get("/", async function (req, res) {
  console.info("You've reached the user router!");
  res.status(200).json({ "user list": await getAllUsers() });
});

// Get user id by name
userRouter.get("/id/of/:name", async function (req, res) {
  const { name } = req.params;

  // Validate name
  if (!name) {
    res.status(401).json({ error: "Invalid name" });
    return;
  }

  // Get user id by name
  try {
    const uid = await getUserIdByName(name);
    if (uid) {
      console.info("user id", uid);
      res.status(200).json({ user_id: uid });
    } else {
      res.status(401).json({ error: "User not found" });
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

// Get user name by id
userRouter.get("/name/of/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid user id" });
    return;
  }

  // Get user name by id
  try {
    const name = await getUserNameById(id);
    if (name) {
      console.info("user name", name);
      res.status(200).json({ user_name: name });
    } else {
      res.status(401).json({ error: "User not found" });
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

userRouter.get("/groupname/of/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid group id" });
    return;
  }

  // Get group name by id
  try {
    const groupName = await getGroupNameById(id);
    if (groupName) {
      console.info("group name", groupName);
      res.status(200).json({ group_name: groupName });
    } else {
      res.status(401).json({ error: "Group not found" });
    }
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

// Login
userRouter.post("/login", async function (req, res) {
  const { name, password } = req.body;
  console.info("name", name);
  console.info("password", password);

  // Validate name and password
  if (!name || !password) {
    res.status(401).json({ error: "Invalid name or password" });
  }

  // Check if user exists
  else {
    try {
      const uid = await checkUserPassword(name, password);
      if (uid === 0) {
        res.status(404).json({ error: "User not found" });
      } else if (uid === -1) {
        res.status(401).json({ error: "Wrong password" });
      } else if (uid) {
        console.info("user id", uid);
        res.status(200).json({ user_id: uid });
      } else {
        res.status(401).json({ error: "Unknown" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Register a new user
userRouter.post("/register", async function (req, res) {
  const { name, password } = req.body;

  // Validate name and password
  if (!name || !password) {
    res.status(401).json({ error: "Invalid name or password" });
  }

  // Create user
  else {
    try {
      // Check if user already exists
      if ((await getUserIdByName(name)) !== null) {
        res.status(401).json({ error: "User already exists" });
        console.info("User ", name, " already exists");
        return;
      } else {
        console.info("User ", name, " does not exist");
      }

      const uid = await registerUser(name, password);
      console.info("new user id", uid);
      res.status(200).json({ user_id: uid });
    } catch (e) {
      console.error("e", e);
      if (e.code === 11000) {
        res.status(401).json({ error: "User already exists" });
      } else {
        res.status(500).json({ error: `Unknown server error: ${e}` });
      }
    }
  }
});

// Get user total balance
userRouter.get("/balance/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid user id" });
  }

  // Get user balance
  else {
    try {
      if (await verifyUserById(id)) {
        const balance = await getUserBalance(id);
        console.info("user balance", balance);
        res.status(200).json({ balance: balance });
      } else {
        res.status(401).json({ error: "User not found" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Get user cost and pay
userRouter.get("/cost_pay/:uid", async function (req, res) {
  const { uid } = req.params;

  // Validate uid
  if (!uid) {
    res.status(401).json({ error: "Invalid user id" });
    return;
  }

  // Get user cost and pay
  try {
    const cost = await getUserCost(uid);
    const pay = await getUserPay(uid);
    console.info("cost", cost);
    console.info("pay", pay);
    res.status(200).json({ cost: cost, pay: pay });
  } catch (e) {
    console.error("e", e);
    res.status(500).json({ error: `Unknown server error: ${e}` });
  }
});

// Get recent transactions (transaction history)
userRouter.get("/transactions/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid user id" });
  }

  // Get recent transactions
  else {
    try {
      const transactions = await getTransactionByUser(id);
      if (transactions) {
        console.info("recent transactions", transactions);
        res.status(200).json({ transactions: transactions });
      } else {
        res.status(401).json({ error: "Invalid user" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Get groups list
userRouter.get("/group/:id", async function (req, res) {
  const { id } = req.params;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid user id" });
  }

  // Get groups list
  else {
    try {
      const groups = await getGroups(id);
      if (groups) {
        console.info("groups", groups);
        res.status(200).json(groups);
      } else {
        res.status(401).json({ error: "Invalid user" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Create a new group
userRouter.post("/group/add/:id", async function (req, res) {
  const { id, groupName, friends } = req.body;

  // Validate uid, groupName, and friends
  if (!id || !groupName || !friends) {
    res.status(401).json({ error: "Invalid user id, group name, or friends" });
  }

  // Create group
  else {
    try {
      const groupId = await createGroup(id, groupName, friends);
      if (groupId && groupId !== 11000) {
        console.info("group Id", groupId);
        res.status(200).json(groupId);
      } 
      else if (groupId == 11000) {
        res.status(400).json({ error: "Group name already exists" });
      }
      else {
        res.status(401).json({ error: "Invalid group" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Create a new transaction
userRouter.post("/transaction/add/:uid", async function (req, res) {
  const { uid, description, transactions } = req.body;

  // Validate description and transactions
  if (!description || !transactions) {
    res.status(401).json({ error: "Invalid description or transactions" });
  }

  // Create transaction
  else {
    try {
      const { tid, status } = addTransaction(uid, description, transactions);
      if (tid && status) {
        console.info("transaction", tid, status);
        res.status(200).json({ tid: tid, status: status });
      } else {
        res.status(401).json({ error: "Invalid transaction" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});

// Get timeline (transaction history)
userRouter.get("/timeline/:id", async function (req, res) {
  const { id } = req.body;

  // Validate id
  if (!id) {
    res.status(401).json({ error: "Invalid user id" });
  }

  // Get timeline
  else {
    try {
      const timeline = getTransactionByUser(id);
      if (timeline) {
        console.info("timeline", timeline);
        res.status(200).json(timeline);
      } else {
        res.status(401).json({ error: "Invalid user" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});
