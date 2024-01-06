const Review = require("../models/reviewmodel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/errorhander");

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment } = req.body;
    let reviewprofileimage = [];
    if (typeof req.body.reviewprofileimage=== "string") {
      reviewprofileimage.push(req.body.reviewprofileimage);
    } else {
      reviewprofileimage = req.body.reviewprofileimage;
    }
  
    const reviewprofileimageLinks = [];
    for (let i = 0; i < reviewprofileimage?.length; i++) {
      const result = await cloudinary.v2.uploader.upload(reviewprofileimage[i], {
        folder: "products",
      });
      reviewprofileimageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    // console.log(reviewprofileimageLinks)
    req.body.reviewprofileimage = reviewprofileimageLinks;
    try {
      console.log(req.body)
      const review = await Review.create({
        reviewprofileimage:req.body.reviewprofileimage,
        user: req.body.user,
        rating :Number(rating),
        comment:comment,
      });
      console.log(review);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message:error._message
      });
    }
  

  });


  exports.getAllreview = catchAsyncErrors(async (req, res, next) => {
    const users = await Review.find();
  
    res.status(200).json({
      success: true,
      users,
    });
  });
  
  exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const user = await Review.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
      );
    }
  
    await user.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });
  
  });