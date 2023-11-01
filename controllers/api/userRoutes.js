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
    const singleUser = await User.findOne({ _id: req.params.userId }).populate(
      "thoughts"
    );
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
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({ message: "No user with that ID" });
    }
    return res.json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete associated thoughts with the user
router.delete("/:userId", async (req, res) => {
  try {
    const deleteUser = await User.findById(req.params.userId);
    if (!deleteUser) {
      return res.status(400).json({ message: "No user with that ID" });
    }

    // Get the IDs of associated thoughts
    const thoughtIds = deleteUser.thoughts;

    // Delete associated thoughts
    await Thought.deleteMany({ _id: { $in: thoughtIds } });

    // Delete the user
    await User.findByIdAndDelete(req.params.userId);

    return res.json(deleteUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    const deleteFriend = await User.findByIdAndDelete({
      _id: req.params.friendId,
    });
    if (!deleteFriend) {
      return res.status(400).json({ message: "No friend with that ID" });
    }
    return res.json(deleteFriend);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
