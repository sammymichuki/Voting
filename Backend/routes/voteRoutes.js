import express from "express";
import { vote } from "../controllers/voteController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", verifyToken, vote);

export default router;
