// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
  
    // options for cookie
    const options = {
      maxAge: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: false 
    };
    console.log(token)
    res.cookie("token", token, options).status(statusCode).json({
      success: true,
      user,
      token,
    });
  };
  
  module.exports = sendToken;