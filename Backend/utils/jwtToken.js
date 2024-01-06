// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
      httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

    };
    res.cookie("token", token, options).status(statusCode).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;