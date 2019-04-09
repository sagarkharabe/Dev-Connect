const express = require("express");
const chalk = require("chalk");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config");
mongoose.Promise = global.Promise;

mongoose
  .connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log(chalk.magenta("Connection to MLab established...")));
app.get("/", (req, res) => {
  res.send(Hello);
});

const port = process.env.PORT || 5001;

app.listen(port, () =>
  console.log(chalk.blue("Server EvesDropping on port ", port))
);
