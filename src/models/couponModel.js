const mongoose = require("mongoose")

const couponSchema = mongoose.Schema({
    code: {type: String, required: true, unique: true},
    discount: { type: Number,required: true },
    expirationDate: { type: Date, default: "" }
})

module.exports = mongoose.model("coupon",couponSchema)