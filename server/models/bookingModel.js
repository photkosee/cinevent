const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shows",
    required: true,
  },
  seats: {
    type: Array,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("bookings", bookingSchema);
