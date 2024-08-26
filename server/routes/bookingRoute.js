const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

// create a booking for a show
router.post("/", authMiddleware, async (req, res) => {
  const { showId, userId, seats } = req.body;

  if (!showId || !userId || !seats) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newBooking = new Booking({
      user: req.user.id,
      show: showId,
      seats
    });
    await newBooking.save();

    // update show with booked seats
    const show = await Show.findById(showId);
    show.bookedSeats = show.bookedSeats.concat(seats);
    await show.save();

    res.status(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
