import Order from "../models/Order.js";

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log("[GET] Fetched all orders:", orders);
        res.json(orders);
    } catch (err) {
        console.error("[GET] Error fetching orders:", err);
        res.status(500).json({ message: err.message });
    }
};

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { customer_name, product_name, status } = req.body;
        console.log("[POST] Creating order:", req.body);

        const newOrder = new Order({ customer_name, product_name, status });
        const savedOrder = await newOrder.save();

        console.log("[POST] Order saved:", savedOrder);
        res.status(201).json(savedOrder);
    } catch (err) {
        console.error("[POST] Error creating order:", err);
        res.status(400).json({ message: err.message });
    }
};

// Update order status
export const updateOrder = async (req, res) => {
    try {
        console.log(`[PUT] Updating order ${req.params.id} with data:`, req.body);
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("[PUT] Order updated:", updatedOrder);
        res.json(updatedOrder);
    } catch (err) {
        console.error("[PUT] Error updating order:", err);
        res.status(400).json({ message: err.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        console.log(`[DELETE] Deleting order ${req.params.id}`);
        await Order.findByIdAndDelete(req.params.id);
        console.log("[DELETE] Order deleted:", req.params.id);
        res.json({ message: "Order deleted" });
    } catch (err) {
        console.error("[DELETE] Error deleting order:", err);
        res.status(400).json({ message: err.message });
    }
};
