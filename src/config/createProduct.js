const Product = require("../models/productModel");

// Function to create a product
async function createProduct(productName, price, description, stockQuantity, imageURL){

       // Check if the product already exists
       const existingProduct = await Product.findOne({ price: 1337 });
       if (existingProduct) {
         // console.log('Product already exists:', existingProduct);
         return;
       }

    const product = await Product.create({
        productName,
        description,
        price,
        stockQuantity,
        imageURL
    })
    console.log('New product created:', product);
}
  
// Export the createCoupon function
module.exports = createProduct;