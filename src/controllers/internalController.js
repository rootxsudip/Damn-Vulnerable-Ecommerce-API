const express = require("express")
// set the view engine to ejs
const path = require("path")
const app = express()
const asyncHandler = require("express-async-handler")

// @desc User Image
// @routes POST /api/internal/image
// @access private
const imageUpload = (req,res)=>{
    res.render("image")
};

module.exports = {imageUpload}