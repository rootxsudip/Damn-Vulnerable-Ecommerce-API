const {constants} = require("../util/constants")

const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({ title: "Not Found", message: err.message, stackTrace: err.stack});
            break;
        case constants.VALIDATION_ERROR:
            res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({ title: "Unauthorized User", message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({ title: "Forbidden action", message: err.message, stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({ title: "Server Error", message: err.message, stackTrace: err.stack});
            break;
        default:
            console.log("No Error")
            break;
    }
    
};

module.exports = errorHandler;