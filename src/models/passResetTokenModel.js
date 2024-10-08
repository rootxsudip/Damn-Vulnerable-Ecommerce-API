const mongoose = require('mongoose')

const passResetTokenSchema = mongoose.Schema({
    code: {type: String, required: true},
    userId: [
        {  type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    ]
})

module.exports = mongoose.model("passResetToken",passResetTokenSchema)