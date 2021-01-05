const mongoose = require("mongoose");

module.exports = (cb) => {
  mongoose.connect("mongodb://localhost/battleship", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection.on("error", (error) => {
    console.log(`error in connecting to db ${new Date()}`, error.stack);
  });

  mongoose.connection.on("open", () => {
    console.log(`connected to mongodb database at ${new Date()}`);
    cb();
  });
};
