import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

/**
 * @swagger
 * /api/order/list:
 *   post:
 *     summary: Get all orders (Admin only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
// Admin Features
orderRouter.post("/list", adminAuth, allOrders);

/**
 * @swagger
 * /api/order/status:
 *   post:
 *     summary: Update order status (Admin only)
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 64a1b2c3d4e5f6789012345
 *               status:
 *                 type: string
 *                 example: Delivered
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
orderRouter.post("/status", adminAuth, updateStatus);

/**
 * @swagger
 * /api/order/place:
 *   post:
 *     summary: Place order with COD
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - amount
 *               - address
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               amount:
 *                 type: number
 *                 example: 599
 *               address:
 *                 type: object
 *     responses:
 *       200:
 *         description: Order placed successfully
 */
// Payment features
orderRouter.post("/place", authUser, placeOrder);

/**
 * @swagger
 * /api/order/stripe:
 *   post:
 *     summary: Place order with Stripe payment
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - amount
 *               - address
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               amount:
 *                 type: number
 *                 example: 599
 *               address:
 *                 type: object
 *     responses:
 *       200:
 *         description: Stripe session created successfully
 */
orderRouter.post("/stripe", authUser, placeOrderStripe);

/**
 * @swagger
 * /api/order/razorpay:
 *   post:
 *     summary: Place order with Razorpay payment
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - amount
 *               - address
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               amount:
 *                 type: number
 *                 example: 599
 *               address:
 *                 type: object
 *     responses:
 *       200:
 *         description: Razorpay order created successfully
 */
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

/**
 * @swagger
 * /api/order/userorders:
 *   post:
 *     summary: Get user orders
 *     tags: [Order]
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
 *         description: User orders retrieved successfully
 */
// User Features
orderRouter.post("/userorders", authUser, userOrders);

/**
 * @swagger
 * /api/order/verifyStripe:
 *   post:
 *     summary: Verify Stripe payment
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - success
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 64a1b2c3d4e5f6789012345
 *               success:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Payment verified successfully
 */
// verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
