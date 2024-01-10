const express = require("express");
const router = express.Router();

const BootCampUser = require("../model/bootcamp.user.modal.js");

router.get("/get-user/:id", (req, res) => {
  const userId = req.params.id;

  BootCampUser.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "An error occurred" });
    });
});

router.get("/get-users", (req, res) => {
  BootCampUser.find({})
    .sort({ createdAt: -1 })
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: "An error occurred" });
    });
});

router.post("/user-register", (req, res) => {
  const { name, phoneNumber, city, bloodType } = req.body;
  console.log(req.body);
  BootCampUser.findOne({ phoneNumber: phoneNumber })
    .then((user) => {
      if (user) {
        res.send({ message: "User already registered" });
      } else {
        const newUser = new BootCampUser({
          name,
          phoneNumber,
          city,
          bloodType
        });
        newUser
          .save()
          .then(() => {
            res.send({
              message:
                "Successfully registered our Team will Connect with you Soon"
            });
          })
          .catch((err) => {
            console.log(err);
            res.send({ message: "An error occurred" });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "An error occurred" });
    });
});

router.put("/user-update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber, city, bloodType } = req.body;

  try {
    const existingUser = await BootCampUser.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.name = name || existingUser.name;
    existingUser.phoneNumber = phoneNumber || existingUser.phoneNumber;
    existingUser.city = city || existingUser.city;
    existingUser.bloodType = bloodType || existingUser.bloodType;

    await existingUser.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.delete("/user-delete/:id", (req, res) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  BootCampUser.deleteOne({ _id: userId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User deleted successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Error deleting user" });
    });
});

module.exports = router;
