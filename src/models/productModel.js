const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  imageURL: { type: String, required: true },
})

module.exports = mongoose.model("product",productSchema)