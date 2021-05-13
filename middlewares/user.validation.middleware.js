const { user } = require("../models/user");
const UserService = require("../services/userService");

const EMAIL_REGEXP = new RegExp(/^[a-zA-Z0-9_.+-]+@gmail.com+$/);
const NUMBER_REGEXP = new RegExp(/^\+?([3][8][0])\)?([0-9]{9})$/);

const isValidName = (name) => {
  if (typeof name !== "string" || /[0-9]+/g.test(name) || !name.length) {
    return false;
  }
  return true;
};

const createUserValid = async (req, res, next) => {
  try {
    const users = await UserService.getUsers();
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const isEmailExist = !!users.filter(
      (user) => !!email && user.email === email
    ).length;

    const isPhoneNumberExist = !!users.filter(
      (user) => !!phoneNumber && user.phoneNumber === phoneNumber
    ).length;

    let errors = [];

    if (
      !Object.keys(req.body).every((key) => Object.keys(user).indexOf(key) >= 0)
    ) {
      errors.push("Bad Request!");
    }

    if (isEmailExist) {
      errors.push("Email is already in use");
    }

    if (isPhoneNumberExist) {
      errors.push("Phone number is already in use");
    }

    if (!isValidName(firstName)) {
      errors.push("FirstName is not valid");
    }

    if (!isValidName(lastName)) {
      errors.push("lastName is not valid");
    }

    if (!EMAIL_REGEXP.test(email)) {
      errors.push("Email is not valid");
    }

    if (!NUMBER_REGEXP.test(phoneNumber)) {
      errors.push("Phone number is not valid");
    }

    if (!password || password.length < 3) {
      errors.push("Password is not valid");
    }

    if (errors.length) {
      res.body = res.status(400).json({
        error: true,
        message: errors,
      });
    } else {
      next();
    }
  } catch (e) {
    res.status(400).json({
      error: true,
      message: e.message,
    });
  }
};

const updateUserValid = createUserValid;

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
