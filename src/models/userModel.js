const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    availableMoney: { type: Number, default: 500 },
    purchasedItems: [
      {  type: mongoose.Schema.Types.ObjectId, ref: "product", default: [] },
    ],
    couponApplied: [
      {  type: mongoose.Schema.Types.ObjectId, ref: "coupon", default: [] },
    ]
})

module.exports = mongoose.model("user",userSchema)