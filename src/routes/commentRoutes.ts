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

/**
 * @swagger
 * /comment/{id}:
 *   put:
 *     summary: Update a comment
 *     description: Updates a comment's content
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The new content
 *             example:
 *               content: "Updated comment content"
 */
router.delete("/:id", commentController.del.bind(commentController));

/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     description: Delete a comment by its ID
 *     responses:
 *       200:
 *         description: Comment updated successfully
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
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
router.put("/:id", commentController.put.bind(commentController));


export default router;
