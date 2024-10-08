const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const PassResetToken = require("../models/passResetTokenModel")
const Coupon = require("../models/couponModel")
const mongoose = require("mongoose")
const crypto = require("crypto")

// @desc Register a user
// @routes POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password} = req.body

    // Error Handling
    if(!name || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check user already registered or not
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password,10);
    // console.log(hashedPassword)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    console.log(`User created: ${user}`)
    if(user){
        res.status(201).json({_id: user.id, email: user.email})
    }
    else{
        res.status(400);
        throw new Error("User's data is not valid")
    }
    // res.json({message: "User Registered"});
});

// @desc Login a user
// @routes POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

     // Error Handling
     if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check user exists in the db or not
    const user = await User.findOne({email})

    // compare password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "12h"}
        )
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid")
    }
    // res.json({message: "Login user"});
}); 

// @desc Apply Coupon
// @routes POST /api/users/profile
// @access private
const userCoupon = asyncHandler(async (req,res)=>{
    const {coupon} = req.body;

    // Check coupon exists or not
    const couponItem = await Coupon.findOne({ code: coupon })
    if(!couponItem){
        res.status(400);
        throw new Error("Coupon not found");
    }

    // Check coupon applied or not
    const user = await User.findById(req.user.id)

    // Check coupon applied or not
    // if (user.couponApplied.includes(couponItem.id)) {
    //     res.status(403);
    //     throw new Error("Coupon Applied");
    // }
    
    // Add Coupon to the account
    const totalMoney = couponItem.discount + user.availableMoney
    const result = await User.findByIdAndUpdate(
        user.id,
        {
            availableMoney: totalMoney,
            couponApplied: couponItem.id
        },
        {new: true}
    )

    res.status(200).json({email: user.email, money: totalMoney})
});

// @desc User Profile
// @routes GET /api/users/profile
// @access private
const userProfile = asyncHandler(async (req,res)=>{
    // res.json({message: "User Profile"});
    const user = await User.findById(req.user.id)
    res.status(200).json({id: user.id,name: user.name,email: user.email,money: user.availableMoney})
});

// @desc User Purchase History
// @routes GET /api/users/purchaseHistory
// @access private
const purchaseHistory = asyncHandler(async (req,res)=>{
    // res.json({message: "User Profile"});
    // const user = await User.where("_id").equals(req.params.id).exec();
    if(mongoose.Types.ObjectId.isValid(productId)){
    const query = req.body.id;
    const user = await User.findById(query)
    res.status(200).json({id: user.id, name: user.name,email: user.email, purchases: user.purchasedItems})
    }
    else{
        res.status(400)
    }
});

// @desc User Password Reset
// @routes POST /api/users/reset-pass
// @access private
const passReset = asyncHandler(async (req,res)=>{
    const {email,newPassword} = req.body
    const hashedPassword = await bcrypt.hash(newPassword,10);
    const user = await User.findOne({email})
    await User.findByIdAndUpdate(
        user.id,
        {
            password: hashedPassword
        }
    )
    res.status(200).json({message: "Password Reset Successful"})
});


// @desc User Password Reset Token Send
// @routes POST /api/users/pass-reset
// @access public
const sendResetToken = asyncHandler(async (req,res)=>{
    const email = req.body.email
    const user = await User.findOne({email})
    console.log(user.id)
    const token = crypto.randomBytes(20).toString('hex');
    console.log(token)
    PassResetToken.create({
        code: token,
        userId: user.id
    })
    res.status(200).json({token: token})
});

// @desc User Password Reset Token Receive
// @routes POST /api/users/pass-reset/<token>
// @access public
const receiveResetToken = asyncHandler(async (req,res)=>{
    const token = req.body.token
    const {email,newPassword} = req.body
    const result = await PassResetToken.findOne({token})
        if (result) {
          // Token found, proceed with logic
          console.log('Token found:', result);
          const hashedPassword = await bcrypt.hash(newPassword,10);
          const user = await User.findOne({email})
          await User.findByIdAndUpdate(
            user.id,
            {
            password: hashedPassword
            }
    )
        } else {
          // Token not found, handle the error
          console.log('Token not found');
        }
    res.status(200).json({token: token})
});

// @desc User Image
// @routes POST /api/users/image
// @access private
const imageUpload = asyncHandler(async (req,res)=>{
    const imageUrl = req.body.url
    fetch(imageUrl)
  .then(response => response.text())
  .then(data => 
    res.status(200).send(data)
    )
  .catch(error => console.error('Error:', error));

    // Save image work needed
    
});



module.exports = {registerUser,loginUser,userProfile,userCoupon,purchaseHistory,passReset,sendResetToken,receiveResetToken,imageUpload};