const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String,required:true },
    ingredients: { type: [String],required: true}
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
