const router = require("express").Router();
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

router.post("/", authMiddleware, async (req, res) => {
  
});

module.exports = router;
