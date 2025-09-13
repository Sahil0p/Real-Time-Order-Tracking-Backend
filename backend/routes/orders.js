import express from "express";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../controllers/ordersController.js";
const router = express.Router();

// CRUD routes
router.get("/", getOrders);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

// Demo endpoint (predefined example orders)
router.get("/demo", (req, res) => {
    const demoOrders = [
        { customer_name: "Alice Johnson", product_name: "iPhone 15", status: "pending" },
        { customer_name: "Bob Smith", product_name: "MacBook Pro", status: "shipped" },
        { customer_name: "Charlie Brown", product_name: "AirPods Pro", status: "delivered" },
        { customer_name: "Diana Prince", product_name: "Samsung Galaxy S23", status: "pending" },
        { customer_name: "Ethan Hunt", product_name: "Sony WH-1000XM5", status: "shipped" }
    ];
    res.json(demoOrders);
});

export default router;
