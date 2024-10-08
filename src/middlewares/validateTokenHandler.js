const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // Check token is provided or not
    if(!authHeader){
        res.status(401);
        throw new Error("Unauthorized")
    }

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
            // console.log(decoded);
            req.user = decoded.user
            next();
        });
    }
})

module.exports = validateToken;