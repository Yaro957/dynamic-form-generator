const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  stepTitle: String,
  data: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("FormResponse", responseSchema);