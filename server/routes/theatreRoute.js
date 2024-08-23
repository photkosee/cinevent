const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Theatre = require("../models/theatreModel");
const Show = require("../models/showModel");

// create a theatre
router.post("/", authMiddleware, async (req, res) => {
  const { name, totalSeats } = req.body;

  if (!name || !totalSeats) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newTheatre = new Theatre({ name });
    await newTheatre.save();
    res.status(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list all theatres
router.get("/", async (req, res) => {
  try {
    const theatres = await Theatre.find().sort({ createdAt: -1 });
    res.status(200).json(theatres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get a theatre by id
router.get("/:id", async (req, res) => {
  const { movie, date } = req.query;

  const shows = await Show.find({ movie, date })
    .populate("theatre")
    .sort({ createdAt: -1 });

  try {
    const theatre = await Theatre.findById(req.params.id);
    res.status(200).json(theatre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update a theatre by id
router.post("/:id", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete a theatre by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.params.id);
    res.status(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list all shows by theatre id
router.get("/:id/shows", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.params.id })
      .populate("movie")
      .sort({ createdAt: -1 });
    res.status(200).json(shows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;