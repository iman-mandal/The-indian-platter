const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId,
            ref: "MenuItem" },
            quantity: Number,
        }
    ],
    total: Number,
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Cooking", "Delivered"],
        default: "Pending"
    },
    customerName:{
        type:String,
        required: true
    },
    number:{
        type: String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
