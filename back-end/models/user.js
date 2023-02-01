const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
  streetNumber: { type: Number, required: true },
  streetName: { type: String, required: true },
  zipCode: { type: Number, required: true },
});

module.exports = mongoose.model('User', productSchema);