const express = require("express");
const router = express.Router();
const axios = require("axios");

router.all("/", (req, res) => {
    axios.get("https://authorization-service-s3.herokuapp.com/").then((res) => {
        console.log(res.data);
    });
    axios.get("https://user-service-s3.herokuapp.com/").then((res) => {
        console.log(res.data);
    });
    axios.get("https://storage-service-s3.herokuapp.com/").then((res) => {
        console.log(res.data);
    });
    res.json({
        message: "API Gateway is running!",
    });
});

router.all("/api/v1/:service", (req, res) => {
    res.json({
        message: "API Gateway is running!",
    });
});

module.exports = router;
