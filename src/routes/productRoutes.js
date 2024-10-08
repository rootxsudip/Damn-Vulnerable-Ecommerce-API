const express = require("express")
const router = express.Router()
const {getProducts,createProduct,getProduct, editProduct, deleteProduct, purchaseProduct} = require("../controllers/productController")
const validateToken = require("../middlewares/validateTokenHandler")

// Authentication Middleware
// route.use(validateToken)

// Products Routes
router.route("/").get(getProducts).post(validateToken,createProduct)

router.route("/:id").get(getProduct).put(validateToken,editProduct).delete(validateToken,deleteProduct)

// router.route("/").post((req,res)=>{
//     res.send("Create Product")
// })
// router.route("/:id").put()
// router.route("/:id").delete()

// Purchase Products
router.route("/checkout").post(validateToken, purchaseProduct)



module.exports = router;