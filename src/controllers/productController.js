const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
const Product = require("../models/productModel");
const User = require("../models/userModel");

// Get all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find();
    res.status(200).json(products)
    // res.json({message:"All Products"})
})

// Get one product
// @route GET /api/products/:id
// @access Public
const getProduct = asyncHandler(async(req,res)=>{
    
    if(mongoose.Types.ObjectId.isValid(req.params.id)){

        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    }else{
        res.status(404);
        throw new Error("Product not found");
    }
    // res.json({message:`Product ID: ${req.params.id}`})
})

// Create product
// @route POST /api/products/
// @access Private
const createProduct = asyncHandler(async(req,res)=>{
    const {productName, price, description, stockQuantity, imageURL} = req.body

    // Error Handling
    if(!productName || !price || !description || !stockQuantity || !imageURL){
        res.status(400);
        throw new Error("All fields are mandatory: productName, price, description, stockQuantity, imageURL");
    }
    const product = await Product.create({
        productName,
        description,
        price,
        stockQuantity,
        imageURL
    })
    console.log("Req Body: ",req.body)
    res.status(201).json(product)
    // res.status(201).json({ message: "Create product"})
})

// Edit product
// @route PUT /api/products/:id
// @access Private
const editProduct = asyncHandler(async(req,res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){

        const product = await Product.findById(req.params.id);

        // Check product is owned by the user or not to prevent IDOR
        // if(product.user_id === req.user.id){
        //     res.status(200).json(contact)
        // }else{
        //     res.status(403)
        //     throw new Error("Forbidden Action")
        // }

        if(!product){
            res.status(404);
            throw new Error("Product not found");
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedProduct)

    }else{
        res.status(404);
        throw new Error("Product not found");
    }
    // res.json({message:`Edit Product of ID: ${req.params.id}`})
})

// Delete product
// @route DELETE /api/products/:id
// @access Private
const deleteProduct = asyncHandler(async(req,res)=>{
    if(mongoose.Types.ObjectId.isValid(req.params.id)){

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedProduct){
            res.status(404);
            throw new Error("Product not found");
        }
        res.status(200).json(deletedProduct)

    }else{
        res.status(404);
        throw new Error("Product not found");
    }
    // res.send({message:`Edit Product of ID: ${req.params.id}`})
})

// Purchase Product
const purchaseProduct = asyncHandler(async(req,res)=>{
    const {price, productId} = req.body;
    const user = await User.findById(req.user.id)
    if(mongoose.Types.ObjectId.isValid(productId)){
        const product = await Product.findById(productId);

        // Price Manipulation Fix
        // if(product.price < user.availableMoney){
        //     const totalMoney = user.availableMoney - product.price

        if(price < user.availableMoney){
            const totalMoney = user.availableMoney - price
            await User.findByIdAndUpdate(
                user.id,
                {
                    availableMoney: totalMoney,
                    purchasedItems: product.id
                },
                {new: true}
            )
            res.status(200).json({message: "Purchase Successful"});
        }else{
            res.status(403);
            throw new Error("Not enough balance");
        }
    }
    else{
        res.status(404);
        throw new Error("Product not found");
    }
})


module.exports = {getProducts,getProduct,createProduct,editProduct,deleteProduct,purchaseProduct}