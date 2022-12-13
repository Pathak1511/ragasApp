const mongoose = require("mongoose");

const ragaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "id must be specify"],
  },
  raga_name: {
    type: String,
    required: [true, "Raga name must be specify"],
  },
  reduction: {
    type: String,
    required: [true, "Reduction must be specify"],
  },
  video: {
    type: String,
    required: [true, "Video link must be specify"],
  },
});

const raga = mongoose.model("Raga", ragaSchema);

module.exports = raga;
