const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  uniqueID: Number,
  drugName: String,
  condition: String,
  review: String,
  rating: Number,
  date: String,
  usefulCount: Number
});

const Drug = mongoose.model('Drug', drugSchema, 'mycollection');

module.exports = Drug;
