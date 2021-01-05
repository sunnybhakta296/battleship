const express = require("express");
const app = express();
const router = require("./routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./db")(function () {
  app.use("/",router);
  app.listen("4000");
  console.log(`Started at port 4000`);
});

module.exports = app;
