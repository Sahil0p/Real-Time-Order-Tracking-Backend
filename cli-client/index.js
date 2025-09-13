import { io } from "socket.io-client";
import chalk from "chalk";

const socket = io("http://localhost:5000");

socket.on("ordersUpdated", (orders) => {
    console.clear();
    console.log(chalk.blue.bold("=== Realtime Orders ==="));
    orders.forEach((order, idx) => {
        console.log(`${chalk.green(idx+1)}. ${chalk.yellow(order.customer_name)} - ${chalk.cyan(order.product_name)} [${chalk.magenta(order.status)}]`);
    });
    console.log(chalk.blue("======================="));
});

console.log(chalk.green("Connected to Realtime Orders server... Waiting for updates..."));
