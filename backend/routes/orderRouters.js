const express = require("express");
const router = express.Router();
const Order = require("../models/order");  // Import order model

// =============================
// CREATE ORDER
// =============================
router.post("/create", async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        console.log("Order successfully");
        res.status(201).json({ message: "Order created", order: savedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =============================
// GET ALL ORDERS
// =============================
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =============================
// CANCEL (UPDATE STATUS)
// =============================
router.put("/cancel/:id", async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "cancelled" },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order cancelled", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// =============================
// DELETE ORDER
// =============================
router.delete("/delete/:id", async (req, res) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
