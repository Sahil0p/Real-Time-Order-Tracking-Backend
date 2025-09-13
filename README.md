# Real-Time-Order-Tracking-Backend

A system where clients automatically receive updates whenever data in the database changes

## Overview
This project implements a **realtime order management system** using **Node.js**, **MongoDB**, and **Socket.IO**.  
Clients (browser or CLI) are notified instantly when orders are created, updated, or deleted.

---

## Features
- Add, update, and delete orders.
- Real-time updates to all connected clients.
- Browser frontend with responsive table and colored status badges.
- CLI client for terminal-based live updates.
- MongoDB Change Streams for efficient real-time database listening.

---

## Tech Stack
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Realtime:** Socket.IO
- **Frontend:** HTML, CSS, JavaScript
- **CLI Client:** Node.js

---

## File Structure
```plaintext
realtime-orders-project/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── routes/
│   │   └── orders.js
│   ├── controllers/
│   │   └── ordersController.js
│   └── models/
│       └── Order.js
├── frontend/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── cli-client/
│   ├── package.json
│   └── index.js
└── README.md
```

---

## Project Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd realtime-orders-project
```
