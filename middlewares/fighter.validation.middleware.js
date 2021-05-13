const { fighter } = require("../models/fighter");
const FighterService = require("../services/fighterService");

const createFighterValid = async (req, res, next) => {
  const { name, power, defense, health } = req.body;
  const fighters = await FighterService.getFighters();

  const isNameExist = !!fighters.filter(
    (fighter) => !!name && fighter.name === name
  ).length;

  let errors = [];

  if (
    !Object.keys(req.body).every(
      (key) => Object.keys(fighter).indexOf(key) >= 0
    )
  ) {
    errors.push("Bad Request!");
  }

  if (isNameExist) {
    errors.push("Name is already in use");
  }

  if (!name) {
    errors.push("Name is required");
  }

  if (!power) {
    errors.push("Power is required");
  }

  if (power < 1 || power > 100) {
    throw new Error("Power should be more than 1 and less than 100");
  }

  if (!defense) {
    errors.push("Defense is required");
  }

  if (defense < 1 || defense > 10) {
    errors.push("Defense should be more than 1 and less than 10");
  }

  if (power && typeof power !== "number") {
    errors.push("Power must be an integer!");
  }

  if (defense && typeof defense !== "number") {
    errors.push("Defense must be an integer!");
  }

  if (
    (health && typeof health !== "number") ||
    (health && health < 80) ||
    (health && health > 120)
  ) {
    errors.push("Health is invalid");
  }

  if (errors.length) {
    res.body = res.status(400).json({
      error: true,
      message: errors,
    });
  } else {
    next();
  }
};

const updateFighterValid = createFighterValid;

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
