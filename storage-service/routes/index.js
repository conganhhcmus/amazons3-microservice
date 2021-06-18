var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
    res.json({
        message: "API Storage Service is running!",
    });
});

module.exports = router;
