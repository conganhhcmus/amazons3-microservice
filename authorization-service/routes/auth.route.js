const express = require("express");
const router = express.Router();

const authService = require("../services/auth.service");

router.post("/login-root", async (req, res) => {
    const jsonResponse = await authService.loginRoot(req.body);

    res.status(jsonResponse.statusCode).json(jsonResponse);
});
router.post("/login-iam", async (req, res) => {
    const jsonResponse = await authService.loginIAM(req.body);

    res.status(jsonResponse.statusCode).json(jsonResponse);
});

module.exports = router;
