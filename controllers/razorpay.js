const { request } = require("express");
const Razorpay = require("razorpay");
const uuid = require("uuid/v4");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

exports.payWithRazorpay = async (req, res) => {
  const payment_capture = 1;
  // const amount = 50; //This amount is in Rupees
  const currency = "INR";
  const receipt = uuid();

  const { products } = req.body;
  console.log("PRODUCTS ", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt,
    payment_capture,
  };

  razorpay.orders.create(options, (error, order) => {
    if (error) {
      console.log(error);
    } else {
      console.log("ORDER: ", order);
      res.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      });
    }
  });
};
