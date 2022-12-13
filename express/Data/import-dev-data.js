const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Ragas = require("../model/ragas");
const disease = require("../model/disease");

dotenv.config({ path: "config.env" });

const DB = process.env.DATABASE;

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db connection successfull for import and exporting of data");
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

if (process.argv[2] === "--importRagas") {
  importRaga();
} else if (process.argv[2] === "--importdisease") {
  importDisease();
} else {
  console.log("no Argument");
}
