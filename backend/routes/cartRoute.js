import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartControllers.js";
import authUser from "../middlewares/auth.js";

const cartRouter = express.Router();

/**
 * @swagger
 * /api/cart/get:
 *   post:
 *     summary: Get user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 64a1b2c3d4e5f6789012345
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 */
cartRouter.post("/get", authUser, getUserCart);

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - size
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: 64a1b2c3d4e5f6789012345
 *               size:
 *                 type: string
 *                 example: M
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 */
cartRouter.post("/add", authUser, addToCart);

/**
 * @swagger
 * /api/cart/update:
 *   post:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemId
 *               - size
 *               - quantity
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: 64a1b2c3d4e5f6789012345
 *               size:
 *                 type: string
 *                 example: M
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
