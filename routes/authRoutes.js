const { Router } = require("express");
const AuthService = require("../services/authService");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    console.log("req", req);
    console.log("res", res);
    try {
      console.log("req", req);
      console.log("res", res);
      // TODO: Implement login action (get the user if it exist with entered credentials)
      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;