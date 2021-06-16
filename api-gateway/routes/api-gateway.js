const express = require("express");
const router = express.Router();
const axios = require("axios");

router.all("/", async (req, res) => {
    let auth = await axios.get(
        "https://authorization-service-s3.herokuapp.com/"
    );
    let user = await axios.get("https://user-service-s3.herokuapp.com/");
    let storage = await axios.get("https://storage-service-s3.herokuapp.com/");
    let check = {
        "auth": JSON.stringify(auth.data),
        "user": JSON.stringify(user.data),
        "storage": JSON.stringify(storage.data),
    };
    console.log(check);
    res.json(check);
});

router.all("/api/v1/:service", (req, res) => {
    console.log(req.params.service);
    res.json({
        message: "API Gateway is running!",
    });
});

module.exports = router;
