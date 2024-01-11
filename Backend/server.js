const app =require('./app');
const cloudinary = require("cloudinary");
const connectDatabase=require('./config/database')
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: 'config/config.env' });
}

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });
connectDatabase()
// console.log(process.env.CLOUDINARY_NAME)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
app.listen(process.env.PORT, ()=>{
    console.log('listening on port',process.env.PORT)
})

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });