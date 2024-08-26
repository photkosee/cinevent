const router = require("express").Router();
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const authMiddleware = require("../middlewares/authMiddleware");

// get user details by user id
router.get("/", authMiddleware.checkAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list all bookings by user id
router.get("/:id/bookings", authMiddleware.authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.id })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
