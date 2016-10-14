const mongoose = require('mongoose');;

const translationSchema = new mongoose.Schema({
  language: { type: String },
  name: { type: String },
  text: { type: String },
  timestamp: { type: Date },
  translation: { type: Object },
  url: { type: String }
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;
