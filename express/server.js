const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "config.env" });
const app = require("./app.js");

const DB = process.env.DATABASE;

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfully");
  });

const server = app.listen(3000, () => {
  console.log("App running on Port 3000");
});
