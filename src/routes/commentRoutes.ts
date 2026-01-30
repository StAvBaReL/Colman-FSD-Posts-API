import express from "express";
import commentController from "../controllers/commentController";

const router = express.Router();

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Get all comments
 *     description: Retrieve a list of all comments or filter by postId
 *     tags: [Comments]
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: Filter comments by post ID
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   postId:
 *                     type: string
 *                   sender:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", commentController.get.bind(commentController));

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Add a new comment
 *     description: Adds a new comment to a specific post
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - postId
 *               - sender
 *             properties:
 *               content:
 *                 type: string
 *                 description: The comment content
 *               postId:
 *                 type: string
 *                 description: The ID of the post to comment on
 *               sender:
 *                 type: string
 *                 description: The ID of the sender
 *             example:
 *               content: "Great post!"
 *               postId: "60d0fe4f5311236168a109ca"
 *               sender: "user123"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 content:
 *                   type: string
 *                 postId:
 *                   type: string
 *                 sender:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       400:
 *         description: Invalid input or missing required fields
 *       500:
 *         description: Server error
 */
router.post("/", commentController.post.bind(commentController));

export default router;
