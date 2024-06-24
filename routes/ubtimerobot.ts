import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => {
  return res.status(200);
});

export default router;
