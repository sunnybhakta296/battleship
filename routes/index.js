const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game");

router.get("/hello", (req, res, next) => {
  res.status(200).json({ msg: "hello" });
});

router.post("/create", gameController.createGame);

router.post('/deploy/:gameId', gameController.deploy);

module.exports = router;
