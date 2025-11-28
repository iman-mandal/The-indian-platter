const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {generateToken, jwtAuthMiddleware } = require('../jwt');
const adminOnly = require('../roleMiddlewere');


// ==========================
// REGISTER USER
// ==========================
router.post("/signup", async (req, res) => {
    try {
        const data = req.body;

        const newUser = new User(data);
        const response = await newUser.save();

        console.log("Data saved");

        const payload = {
            id: response._id,
            password: response.password,
            role: response.role   // Optional: If you have a role field
        };

        console.log("Payload:", payload);

        const token = generateToken(payload);  // THIS NOW WORKS
        console.log("Token:", token);

        res.status(200).json({
            message: "Registration Successful",
            user: response,
            token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ==========================
// LOGIN USER
// ==========================
router.post("/login", async (req, res) => {
    try {
        const { email, mobile, password } = req.body;

        const user = await User.findOne({ $or: [{ email }, { mobile }] });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = generateToken(user);
        console.log("Token : ",token);
        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile, role: user.role }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ==========================
// GET ALL USERS (Admin Only)
// ==========================
router.get("/", jwtAuthMiddleware, adminOnly, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// ==========================
// UPDATE USER (Admin or Self)
// ==========================
router.put("/:id", jwtAuthMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "admin" && req.user.id !== req.params.id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Update failed" });
    }
});

// ==========================
// DELETE USER (Admin Only)
// ==========================
router.delete("/:id", jwtAuthMiddleware, adminOnly, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Delete failed" });
    }
});

module.exports = router;
