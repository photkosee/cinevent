const router = require("express").Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");

// get a movie by id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

// list all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add a movie
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, duration, genre, image } = req.body;
  if (!title || !description || !duration || !genre) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const newMovie = new Movie({ title, description, duration, genre, image });
    await newMovie.save();
    res.status(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update a movie
router.post("/:id", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});


// delete a movie by id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
