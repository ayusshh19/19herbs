const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');
const passport = require('passport')
const corsOption = {
    origin: ['http://localhost:5173'],
    credentials:true, 
};
app.use(cors(corsOption));
// app.use(cors())
const errorMiddleware = require("./middleware/error");


// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header('Content-Type', 'application/json;charset=UTF-8')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     )
//     next()
//   })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
require('./utils/googlestrategy');
app.use(passport.initialize());
// console.log(process.env.CLOUDINARY_NAME)
// Route Imports
const product = require("./routes/productroutes");
const user = require("./routes/userroutes");
const order = require("./routes/orderroutes");
const payment = require("./routes/paymentroute");
const review = require("./routes/reviewroutes");
const googleauth = require("./routes/googleauthroute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", review);
app.use("/",googleauth)


app.use(errorMiddleware);

module.exports = app;