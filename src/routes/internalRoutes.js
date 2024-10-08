const express = require("express")
const validateToken = require("../middlewares/validateTokenHandler")
const {imageUpload} = require("../controllers/internalController")
const router = express.Router()

router.get("/image",imageUpload)


module.exports = router