const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection")
const errorHandler = require("./util/errorHandler")
const express = require("express")
const app = express()
const port = process.env.PORT || 5001
const path = require("path")
const cors = require("cors")

// DB Connection
connectDB()

// Cors Config
var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))


app.use(errorHandler);

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

// EJS Setup + home page
app.set('views', path.join(__dirname, 'views')); // Correct path configuration
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    return res.render("home")
});

// Routes
const productRoutes = require("./routes/productRoutes")
app.use("/api/products",productRoutes)

const userRoutes = require("./routes/userRoutes")
app.use("/api/users",userRoutes)

const internalRoutes = require("./routes/internalRoutes")
app.use("/api/internal",internalRoutes)

const searchProduct = require("./controllers/searchProductController")
searchProduct()


app.listen(port)