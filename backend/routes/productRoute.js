import express from "express";
import {
  listProducts,
  removeProduct,
  singleProduct,
  addProduct,
} from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     summary: Add a new product (Admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - sizes
 *             properties:
 *               name:
 *                 type: string
 *                 example: T-Shirt
 *               description:
 *                 type: string
 *                 example: Comfortable cotton t-shirt
 *               price:
 *                 type: number
 *                 example: 299
 *               category:
 *                 type: string
 *                 example: Men
 *               subCategory:
 *                 type: string
 *                 example: Topwear
 *               sizes:
 *                 type: string
 *                 example: ["S","M","L","XL"]
 *               bestseller:
 *                 type: boolean
 *                 example: true
 *               image1:
 *                 type: string
 *                 format: binary
 *               image2:
 *                 type: string
 *                 format: binary
 *               image3:
 *                 type: string
 *                 format: binary
 *               image4:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product added successfully
 */
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

/**
 * @swagger
 * /api/product/remove:
 *   post:
 *     summary: Remove a product (Admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64a1b2c3d4e5f6789012345
 *     responses:
 *       200:
 *         description: Product removed successfully
 */
productRouter.post("/remove", adminAuth, removeProduct);

/**
 * @swagger
 * /api/product/single:
 *   post:
 *     summary: Get single product details (Admin only)
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64a1b2c3d4e5f6789012345
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 */
productRouter.post("/single", adminAuth, singleProduct);

/**
 * @swagger
 * /api/product/list:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
productRouter.get("/list", listProducts);

export default productRouter;
