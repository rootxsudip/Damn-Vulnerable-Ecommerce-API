const mongoose = require("mongoose");
const createCoupon = require("../config/couponCreation")
const createProduct = require("../config/createProduct")

const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database Connectioned: ",
            connect.connection.host,
            connect.connection.name
        )
        
        // Create 1337 Product
        createProduct('Mr Robot Hoodie',1337,'Only Hackers can purchase this jacket',1337,'https://www.leatherjacketblack.com/wp-content/uploads/2019/04/Elliot-Alderson-Mr-Robot-Black-Hoodie.jpg')
        
        //Create Coupon
        createCoupon('BONUS50', 50, '2031-12-31');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;