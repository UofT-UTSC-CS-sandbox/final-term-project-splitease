import express from "express";
import { createGroup, getGroups, getGroupNameById } from "../modules/group.js";

export const groupRouter = express.Router();

// Get groups list
groupRouter.get("/:id", async function (req, res) {
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

groupRouter.get("/name/of/:id", async function (req, res) {
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

// Create a new group
groupRouter.post("/add/:id", async function (req, res) {
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
      } else if (groupId == 11000) {
        res.status(400).json({ error: "Group name already exists" });
      } else {
        res.status(401).json({ error: "Invalid group" });
      }
    } catch (e) {
      console.error("e", e);
      res.status(500).json({ error: `Unknown server error: ${e}` });
    }
  }
});
