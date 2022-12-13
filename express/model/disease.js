const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "id must be specify"],
  },
  raag: {
    type: String,
    required: [true, "Raga name must be specify"],
  },
  video: {
    type: String,
    required: [true, "Video link must be specify"],
  },
  newid: {
    type: Number,
    required: [true, "id must be specify"],
  },
});

const disease = mongoose.model("Disease", diseaseSchema);

module.exports = disease;
