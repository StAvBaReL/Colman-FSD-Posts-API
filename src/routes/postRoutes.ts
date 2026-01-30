import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Add a new post
 *     description: Allows a user to add a new post to the database
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - sender
 *             properties:
 *               title:
 *                 type: string
 *                 description: The post title
 *                 example: "My First Post"
 *               content:
 *                 type: string
 *                 description: The post content
 *                 example: "This is the content of my first post"
 *               sender:
 *                 type: string
 *                 description: The user ID of the post creator
 *                 example: "user123"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 sender:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request - missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", postController.post.bind(postController));

export default router;
