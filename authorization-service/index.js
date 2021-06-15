const express = require("express");
var cors = require("cors");
const logger = require("morgan");
const connectDB = require("./utils/db");

const app = express();

require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

const PORT = process.env.PORT || 3001;
// console.log(PORT);

connectDB();

app.get("/", (req, res) => {
    res.json({
        message: "API Authorization Service is running!"
    });
});

app.use("/api/v1/auth", require("./routes/auth.route"));

app.listen(PORT, () =>
    console.log(
        `User service is running at http://localhost:${
            PORT
        }`
    )
);

module.exports = app;