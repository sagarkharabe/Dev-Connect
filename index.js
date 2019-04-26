const express = require("express");
const chalk = require("chalk");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
require("./config/app-middleware")(app);
require("./config/passport")(passport);
mongoose.Promise = global.Promise;

mongoose
  .connect(keys.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log(chalk.magenta("Connection to MLab established...")))
  .catch(err => console.log(chalk.red("Mogoose conn Err -- ", err)));

app.use(passport.initialize());

app.use("/api", require("./routes"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5001;

app.listen(port, () =>
  console.log(chalk.blue("Server EvesDropping on port ", port))
);
