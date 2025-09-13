import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRoutes from "./routes/orders.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import Order from "./models/Order.js"; // Import model here

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/orders", orderRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Change Stream for real-time updates
mongoose.connection.once("open", () => {
    console.log("MongoDB connected, setting up Change Stream...");
    const changeStream = Order.watch();

    changeStream.on("change", async (change) => {
        console.log("[Change Stream] Detected change:", change.operationType);
        const orders = await Order.find();
        console.log("[Change Stream] Updated orders:", orders);
        io.emit("ordersUpdated", orders);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
