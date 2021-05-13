const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

router.get("/", (req, res) => {
  try {
    const fighters = FighterService.getFighters();

    res.status(200).json(fighters);
  } catch (e) {
    res.status(404).json({
      error: true,
      message: "Fighters not found!",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const fighter = FighterService.getFighter(id);

    res.status(200).json({ data: fighter });
  } catch (e) {
    res.status(404).json({
      error: true,
      message: "Fighter not found!",
    });
  }
});

router.post("/", responseMiddleware, createFighterValid, (req, res) => {
  try {
    const fighter = FighterService.createFighter(req.body);

    res.status(200).json({ message: "Fighter is created!", data: fighter });
  } catch (e) {
    res.status(400).json({
      error: true,
      message: "Fighter is not created!",
    });
  }
});

router.put("/:id", responseMiddleware, updateFighterValid, (req, res) => {
  try {
    const { id } = req.params;
    const fighter = FighterService.updateFighter(id, req.body);

    res.status(200).json({ message: "Fighter is updated!", data: fighter });
  } catch (e) {
    res.status(400).json({
      error: true,
      message: "Fighter is not updated!",
    });
  }
});

router.delete("/:id", responseMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const fighter = FighterService.deleteFighter(id, req.body);

    res.status(200).json({ message: "Fighter is deleted!", data: fighter });
  } catch (e) {
    res.status(400).json({
      error: true,
      message: "Fighter is not deleted!",
    });
  }
});

module.exports = router;
