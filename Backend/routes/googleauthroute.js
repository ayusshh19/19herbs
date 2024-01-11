const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
  ()=>{
    console.log('yaha tak sab thik hai')
  }
);

// const clientUrl = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5173/',
    session: false, 
  }),
  (req, res) => {
    const token = req.user.getJWTToken();
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      };
      res.cookie("token", token, options)
      .status(200).json({
        success: true,
        user:req.user,
        token,
      });
    // res.red  irect("http://localhost:5173/");
  },
);

module.exports = router;