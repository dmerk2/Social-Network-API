const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const singleUser = await User.findOne({ _id: req.params.userId });
    if (!singleUser) {
      return res.status(400).json({ message: "No user with that ID" });
    }
    return res.json(singleUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:userId", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate({ _id: req.params.userId });
    if (!updateUser) {
      return res.status(400).json({ message: "No user with that ID" });
    }
    return res.json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete({ _id: req.params.userId });
    if (!deleteUser) {
      return res.status(400).json({ message: "No user with that ID" });
    }
    return res.json(deleteUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// BONUS:
// Remove a user's associated thoughts when deleted.

// route /api/users/:userId/friends/:friendId

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const newFriend = await User.create(req.body);
    if (!newFriend) {
      return res.status(400).json({ message: "No friend with that ID" });
    }
    return res.json(newFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const deleteFriend = await User.findByIdAndDelete({ _id: req.params.friendId });
    if (!deleteFriend) {
      return res.status(400).json({ message: "No friend with that ID" });
    }
    return res.json(deleteFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
