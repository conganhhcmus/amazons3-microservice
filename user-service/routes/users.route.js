const express = require("express");
const router = express.Router();

const userService = require("../services/users.service");
const authMiddleware = require("../middlewares/auth.mdw");

router.post("/register-root", async (req, res) => {
    const jsonResponse = await userService.registerRoot(req.body);

    res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.post("/register-iam", authMiddleware, async (req, res) => {
    const jsonResponse = await userService.registerIAM(
        req.body,
        req.user.userId
    );

    res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.get("/iam-users/", authMiddleware, async (req, res) => {
    const jsonResponse = await userService.getIAM(req.user.userId);

    res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.post("/iam-users/", async (req, res) => {
    const jsonResponse = await userService.setPermission(req.body);

    res.status(jsonResponse.statusCode).json(jsonResponse);
});

module.exports = router;
