import express from "express";
import { sendMessage, getMessages } from "../controllers/chatControllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// @route   POST /api/chat/send
// @desc    Send a chat message
// @access  Private
router.post("/send", protect, sendMessage);

// @route   GET /api/chat/:projectId
// @desc    Get all chat messages for a specific project
// @access  Private
router.get("/:projectId", protect, getMessages);





export default router;