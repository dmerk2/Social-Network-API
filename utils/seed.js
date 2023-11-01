const connection = require("../config/connection");
const { Thought, User } = require("../models");
const mongoose = require("mongoose");

const seedData = async () => {
  try {
    const existingUsers = await User.find();
    const existingThoughts = await Thought.find();

    if (existingUsers.length === 0) {
      // Create users
      const user1 = await User.create({
        username: "user1",
        email: "user1@example.com",
        thoughts: [],
        friends: [],
      });

      const user2 = await User.create({
        username: "user2",
        email: "user2@example.com",
        thoughts: [],
        friends: [],
      });

      const user3 = await User.create({
        username: "user3",
        email: "user3@example.com",
        thoughts: [],
        friends: [],
      });

      const user4 = await User.create({
        username: "user4",
        email: "user4@example.com",
        thoughts: [],
        friends: [],
      });

      const user5 = await User.create({
        username: "user5",
        email: "user5@example.com",
        thoughts: [],
        friends: [],
      });

      // Associate friends with users
      user1.friends.push(user2, user3, user4, user5);
      user2.friends.push(user1, user3, user4, user5);
      user3.friends.push(user1, user2, user4, user5);
      user4.friends.push(user1, user2, user3, user5);
      user5.friends.push(user1, user2, user3, user4);

      // Save changes
      await user1.save();
      await user2.save();
      await user3.save();
      await user4.save();
      await user5.save();

      console.log("Seed data for users created successfully!");
    } else {
      console.log("Seed data for users already exists.");
    }

    if (existingThoughts.length === 0) {
      // Create thoughts with reactions
      const thoughtUser1 = await User.findOne({ username: "user1" });
      const thoughtUser2 = await User.findOne({ username: "user2" });
      const thoughtUser3 = await User.findOne({ username: "user3" });
      const thoughtUser4 = await User.findOne({ username: "user4" });
      const thoughtUser5 = await User.findOne({ username: "user5" });

      const thought1 = await Thought.create({
        thoughtText: "This is thought 1",
        username: thoughtUser1.username,
        createdAt: new Date(),
        reactions: [
          {
            reactionBody: "Nice thought!",
            username: thoughtUser2.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
          {
            reactionBody: "I agree!",
            username: thoughtUser1.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
        ],
      });

      const thought2 = await Thought.create({
        thoughtText: "This is thought 2",
        username: thoughtUser2.username,
        createdAt: new Date(),
        reactions: [
          {
            reactionBody: "Interesting!",
            username: thoughtUser1.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
        ],
      });

      const thought3 = await Thought.create({
        thoughtText: "This is thought 3",
        username: thoughtUser3.username,
        createdAt: new Date(),
        reactions: [],
      });

      const thought4 = await Thought.create({
        thoughtText: "This is thought 4",
        username: thoughtUser4.username,
        createdAt: new Date(),
        reactions: [],
      });

      const thought5 = await Thought.create({
        thoughtText: "This is thought 5",
        username: thoughtUser5.username,
        createdAt: new Date(),
        reactions: [
          {
            reactionBody: "Great!",
            username: thoughtUser4.username,
            createdAt: new Date(),
            reactionId: new mongoose.Types.ObjectId(),
          },
        ],
      });

      // Associate thoughts with users
      thoughtUser1.thoughts.push(thought1);
      thoughtUser2.thoughts.push(thought2);
      thoughtUser3.thoughts.push(thought3);
      thoughtUser4.thoughts.push(thought4);
      thoughtUser5.thoughts.push(thought5);

      // Save changes
      await thoughtUser1.save();
      await thoughtUser2.save();
      await thoughtUser3.save();
      await thoughtUser4.save();
      await thoughtUser5.save();

      console.log("Seed data for thoughts created successfully!");
    } else {
      console.log("Seed data for thoughts already exists.");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
