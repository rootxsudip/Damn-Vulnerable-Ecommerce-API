const express = require("express")
const {registerUser,loginUser,userProfile,userCoupon,purchaseHistory,sendResetToken,receiveResetToken,passReset,imageUpload} = require("../controllers/userController")
const validateToken = require("../middlewares/validateTokenHandler")
const router = express.Router()

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/profile", validateToken, userProfile);

router.post("/coupon",validateToken,userCoupon);

router.post("/purchaseHistory",validateToken,purchaseHistory);

router.post("/reset-pass",validateToken,passReset);

router.post("/pass-reset",sendResetToken);

router.post("/pass-reset/:token",receiveResetToken);

router.post("/image",validateToken,imageUpload);

// router.get("/available-money/:userID", verifyToken, async (req, res) => {
//     const { userID } = req.params;
  
//     try {
//       const user = await UserModel.findById(userID);
//       if (!user) {
//         return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
//       }
  
//       res.json({ availableMoney: user.availableMoney });
//     } catch (err) {
//       res.status(500).json({ type: err });
//     }
// })

module.exports = router