const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Ragas = require("../model/ragas");
const disease = require("../model/disease");

dotenv.config({ path: ".././config.env" });
const DB = String(process.env.DATABASE);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successfully");
  });

const ragas = JSON.parse(
  fs.readFileSync(`${__dirname}/Ragas_data.json`, "utf-8")
);

const diseaseRaga = JSON.parse(
  fs.readFileSync(`${__dirname}/ragas_disease.json`, "utf-8")
);

const importRaga = async () => {
  try {
    await Ragas.create(ragas);
    console.log("ragas data upload successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importDisease = async () => {
  try {
    await disease.create(diseaseRaga);
    console.log("ragas data upload successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteRagas = async () => {
  try {
    await Ragas.deleteMany();
    console.log("ragas data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deletedisease = async () => {
  try {
    await disease.deleteMany();
    console.log("ragas data deleted successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--importRagas") {
  importRaga();
} else if (process.argv[2] === "--importdisease") {
  importDisease();
} else if (process.argv[2] === "--deleteRagas") {
  deleteRagas();
} else if (process.argv[2] === "--deletedisease") {
  deletedisease();
}
