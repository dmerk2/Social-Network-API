const router = require("express").Router();
const { Thought } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allThoughts = await Thought.find();
    return res.json(allThoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:thoughtId", async (req, res) => {
  try {
    const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!singleThought) {
      return res.status(400).json({ message: "No thought with that ID" });
    }
    return res.json(singleThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    return res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:thoughtId", async (req, res) => {
  try {
    const updateThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true }
    );
    if (!updateThought) {
      return res.status(400).json({ message: "No thought with that ID" });
    }
    return res.json(updateThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:thoughtId", async (req, res) => {
  try {
    const deleteThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deleteThought) {
      return res.status(400).json({ message: "No thought with that ID" });
    }
    return res.json(deleteThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(400).json({ message: "No thought with that ID" });
    }

    thought.reactions.push(req.body);
    const newReaction = await thought.save();

    return res.json(newReaction);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:thoughtId/reactions", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(400).json({ message: "No thought with that ID" });
    }
    const reactionId = req.params.reactionId;
    const reactionIndex = thought.reactions.findIndex(
      (reaction) => reaction.reactionId.toString() === reactionId
    );

    if (reactionIndex === -1) {
      return res.status(400).json({ message: "No reaction with that ID" });
    }

    thought.reactions.splice(reactionIndex, 1);
    const updatedThought = await thought.save();

    return res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
