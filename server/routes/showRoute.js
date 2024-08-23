const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Show = require("../models/showModel");

// create a show
router.post("/", authMiddleware, async (req, res) => {
  const { date, time, movie, ticketPrice, bookedSeats, theatre } = req.body;

  if (!date || !time || !movie || !ticketPrice || !bookedSeats || !theatre) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newShow = new Show({
      date,
      time,
      movie,  
      ticketPrice,
      bookedSeats,
      theatre
    });
    await newShow.save();
    res.status(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list all shows
router.get("/all", async (req, res) => {
  try {
    const shows = await Show.find().sort({ createdAt: -1 });
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get a show by id
router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findById(req.params.id)
      .populate("movie")
      .populate("theatre");
    res.status(200).json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete a show by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.id);
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
