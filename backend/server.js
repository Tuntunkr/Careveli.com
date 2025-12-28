import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger.js";

// App Config
const app = express();
const port = process.env.PORT || 3000;

// Connect DB
connectDB();

// Connect Cloudinary
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Api Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});
