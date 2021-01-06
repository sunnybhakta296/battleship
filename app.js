const express = require("express");
const app = express();
const router = require("./routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/game",router);
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({ error: err.message });
});

require("./db")(function () {
  app.listen("4000");
  console.log(`Started at port 4000`);
});

module.exports = app;
