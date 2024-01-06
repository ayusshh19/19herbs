const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")('sk_test_51ONSc8SE722UOEJkfUPRqfl8GU5EVYWTgN5DukPgZQrAkWMl1Ej1GoWBoMvbZEeBrNSmFfksop2lDvlek0z3zgpr00594VcCo4');

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: 'pk_test_51ONSc8SE722UOEJkFLQzBfeGEJpXVfzaI1RdUZGzyH5H1uILBV9KNwaXETEFULOuRaY9OMzfnYYN25bDb76SQ35I00rx3oknaE' });
});