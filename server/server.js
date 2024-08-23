const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

require("dotenv").config();
const db = require("./config/db");
app.use(express.json());

const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute");
const theatreRoute = require("./routes/theatreRoute");
const showRoute = require("./routes/showRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/theatres", theatreRoute);
app.use("/api/shows", showRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
