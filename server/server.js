const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

require("dotenv").config();
const db = require("./config/db");
app.use(express.json());

const userRoute = require("./routes/userRoute");

app.use("/api/users", userRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));