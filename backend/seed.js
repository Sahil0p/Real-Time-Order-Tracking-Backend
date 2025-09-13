import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "./models/Order.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected for seeding"))
.catch(err => console.error(err));

const orders = [
    { customer_name: "Alice Johnson", product_name: "iPhone 15", status: "pending" },
    { customer_name: "Bob Smith", product_name: "MacBook Pro", status: "shipped" },
    { customer_name: "Charlie Brown", product_name: "AirPods Pro", status: "delivered" },
    { customer_name: "Diana Prince", product_name: "Samsung Galaxy S23", status: "pending" },
    { customer_name: "Ethan Hunt", product_name: "Sony WH-1000XM5", status: "shipped" }
];

const seedDB = async () => {
    await Order.deleteMany({});
    await Order.insertMany(orders);
    console.log("Database seeded with example orders");
    mongoose.disconnect();
};

seedDB();
