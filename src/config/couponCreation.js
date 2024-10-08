const Coupon = require("../models/couponModel")

// Function to create a new coupon
async function createCoupon(couponCode, discount, expirationDate) {
    if(expirationDate==''){
        expirationDate=null
    }

    // Check if the coupon already exists
    const existingCoupon = await Coupon.findOne({ code: couponCode });
    if (existingCoupon) {
      // console.log('Coupon already exists:', existingCoupon);
      return;
    }
  
    // Create a new coupon if it doesn't exist
    const result = await Coupon.create({
      code: couponCode,
      discount: discount,
      expirationDate: expirationDate
    });

    console.log('New coupon created:', result);
  }
  
// Export the createCoupon function
module.exports = createCoupon;