const API_URL = "http://localhost:5000/api/orders";
const orderForm = document.getElementById("orderForm");
const ordersList = document.getElementById("ordersList");

const socket = io(API_URL.replace("/api/orders", ""));

// Render orders in table
function renderOrders(orders) {
    ordersList.innerHTML = "";
    orders.forEach((order, idx) => {
        const tr = document.createElement("tr");

        // Index
        const tdIndex = document.createElement("td");
        tdIndex.textContent = idx + 1;
        tr.appendChild(tdIndex);

        // Customer
        const tdCustomer = document.createElement("td");
        tdCustomer.textContent = order.customer_name;
        tr.appendChild(tdCustomer);

        // Product
        const tdProduct = document.createElement("td");
        tdProduct.textContent = order.product_name;
        tr.appendChild(tdProduct);

        // Status with badge
        const tdStatus = document.createElement("td");
        const span = document.createElement("span");
        span.classList.add("status-badge");
        span.textContent = order.status.charAt(0).toUpperCase() + order.status.slice(1);

        if (order.status === "pending") span.classList.add("status-pending");
        else if (order.status === "shipped") span.classList.add("status-shipped");
        else if (order.status === "delivered") span.classList.add("status-delivered");

        tdStatus.appendChild(span);
        tr.appendChild(tdStatus);

        // Actions
        const tdActions = document.createElement("td");
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Next Status";
        updateBtn.classList.add("update-btn");
        updateBtn.onclick = () => updateOrder(order);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => deleteOrder(order._id);

        tdActions.appendChild(updateBtn);
        tdActions.appendChild(deleteBtn);
        tr.appendChild(tdActions);

        ordersList.appendChild(tr);
    });
}

// Fetch all orders from backend
async function fetchOrders() {
    try {
        const res = await fetch(API_URL);
        const orders = await res.json();
        renderOrders(orders);
    } catch (err) {
        console.error("Error fetching orders:", err);
    }
}

// Socket.IO listener for real-time updates
socket.on("ordersUpdated", renderOrders);

// Add order
orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const customer_name = document.getElementById("customer").value;
    const product_name = document.getElementById("product").value;
    const status = document.getElementById("status").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_name, product_name, status })
    });
    orderForm.reset();
});

// Update order status
async function updateOrder(order) {
    const statusOrder = ["pending", "shipped", "delivered"];
    const nextStatus = statusOrder[(statusOrder.indexOf(order.status)+1)%3];
    await fetch(`${API_URL}/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus })
    });
}

// Delete order
async function deleteOrder(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

// Load all orders on page load
window.addEventListener("DOMContentLoaded", fetchOrders);

