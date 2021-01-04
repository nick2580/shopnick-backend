const stripe = require("stripe")(
  "sk_test_51HxBbYBfSCo9BOIADQ7RKX0d7FWha4EMM7lTymLYuQrbYKfaZyVHxlvAgjrr7h4OTh2cSUIbpUwIet73DAwtMuPB00GTIahI2Y"
);
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { token, products } = req.body;
  console.log("PRODUCTS ", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const idempotencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
