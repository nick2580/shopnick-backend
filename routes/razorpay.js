const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { payWithRazorpay } = require("../controllers/razorpay");

router.post("/razorpay", payWithRazorpay);

module.exports = router;
