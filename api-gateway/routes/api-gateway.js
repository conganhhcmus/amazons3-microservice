const express = require("express");
const router = express.Router();
const axios = require("axios");
const constant = require("./../configs/url");

router.all("/", async (req, res) => {
    let auth = await axios.get(constant.AUTH);
    let user = await axios.get(constant.USER);
    let storage = await axios.get(constant.STORAGE);
    let check = {
        auth: JSON.stringify(auth.data),
        user: JSON.stringify(user.data),
        storage: JSON.stringify(storage.data),
    };
    console.log(check);
    res.json(check);
});

router.all("/api/v1/:service", (req, res) => {
    const service = req.params.service;
    const data = req.body;
    switch (String(service)) {
        case "auth/login-root":
            console.log("auth/login-root");
            axios
                .post(constant.AUTH + "/api/v1/auth/login-root", data)
                .then((response) => {
                    res.send(response.data);
                });
            break;
        case "auth/login-iam":
            axios
                .post(constant.AUTH + "/api/v1/auth/login-iam", data)
                .then((response) => {
                    res.send(response.data);
                });
            break;
        default:
            res.status(404).end();
            break;
    }
});

module.exports = router;
