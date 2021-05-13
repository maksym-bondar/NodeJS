const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.get("/", (req, res) => {
  try {
    const users = UserService.getUsers();

    res.status(200).json(users);
  } catch (e) {
    res.status(404).json({
      error: true,
      message: "Users not found!",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = UserService.getUser(id);

    res.status(200).json({ data: user });
  } catch (e) {
    res.status(404).json({
      error: true,
      message: "User not found!",
    });
  }
});

router.post("/", responseMiddleware, createUserValid, (req, res) => {
  try {
    const user = UserService.createUser(req.body);

    res.status(200).json({ message: "User is created!", data: user });
  } catch (e) {
    res.status(400).json({
      error: true,
      message: "User is not created!",
    });
  }
});

router.put("/:id", responseMiddleware, updateUserValid, (req, res) => {
  try {
    const { id } = req.params;
    const user = UserService.updateUser(id, req.body);

    res.status(200).json({ message: "User is updated!", data: user });
  } catch (e) {
    res.status(400).json({
      error: true,
      message: "User is not updated!",
    });
  }
});

router.delete("/:id", responseMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const user = UserService.deleteUser(id, req.body);

    res.status(200).json({ message: "User is deleted!", data: user });
  } catch (e) {
    res.status(400).json({
      error: true,
      message: "User is not deleted!",
    });
  }
});

module.exports = router;
