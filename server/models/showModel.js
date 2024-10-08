const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    date : {
      type: Date,
      required: true
    },
    time : {
      type: String,
      required: true
    },
    movie : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movies",
      required: true
    },
    ticketPrice : {
      type: Number,
      required: true
    },
    bookedSeats : {
      type: Array,
      default: []
    },
    theatre : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "theatres",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

exports = mongoose.model("shows", showSchema);
