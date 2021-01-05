const express = require("express");
const router = express.Router();

router.get("/hello", (req, res, next) => {
  res.status(200).json({ msg: "hello" });
});
module.exports = router;
