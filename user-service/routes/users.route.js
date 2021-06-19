const express = require("express");
const router = express.Router();

const userService = require("../services/users.service");
const authMiddleware = require("../middlewares/auth.mdw");

router.post("/register-root", async (req, res) => {
  const jsonResponse = await userService.registerRoot(req.body);

  res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.post("/register-iam", authMiddleware, async (req, res) => {
  const jsonResponse = await userService.registerIAM(req.body, req.user.userId);

  res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.get("/root-users/child", authMiddleware, async (req, res) => {
  const jsonResponse = await userService.getIAM(req.user.userId);

  res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.put("/root-users/child", authMiddleware, async (req, res) => {
  const jsonResponse = await userService.updateUserIAM(req.body);

  res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.delete("/root-users/child/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const jsonResponse = await userService.deleteIAM(
    req.user.userId,
    id
  );

  res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.post("/by-keys", async (req, res) => {
  const jsonResponse = await userService.getUserByKeys(req.body);

  res.status(jsonResponse.statusCode).json(jsonResponse);
});

router.get("/:id", authMiddleware, async (req, res) => {
  const jsonResponse = await userService.getUserById(req.params.id);

  res.status(jsonResponse.statusCode).json(jsonResponse);
});

module.exports = router;
