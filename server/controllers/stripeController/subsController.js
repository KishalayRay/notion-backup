const stripe = require("../../helpers/stripe");
const User = require("../../models/User");
const { createError } = require("../../utils/error");
exports.getPrices = async (req, res) => {
  const price = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });
  res.json(price);
};

exports.createSession = async (req, res) => {
  const user = await User.findOne({ _id: req.user.id });
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/apis",
      cancel_url: "http://localhost:3000/upgrade",
      customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  res.json(session);
};
exports.getSubscription = async (req, res) => {
  const user = await User.findById({ _id: req.user.id });
  const subscription = await stripe.subscriptions.list(
    {
      customer: user.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );
  console.log(subscription);
  res.status(200).json({
    data: {
      subscription: subscription,
    },
  });
};
exports.cancelSubscription = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    const subscription = await stripe.subscriptions.list(
      {
        customer: user.stripeCustomerId,
        status: "all",
        expand: ["data.default_payment_method"],
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );
    console.log(subscription.data[0].id, "id");
    const cancel = await stripe.subscriptions.update(subscription.data[0].id, {
      cancel_at_period_end: true,
    });
    console.log(cancel);
    res.status(200).json({
      data: {
        message: "Subscription cancelled",
      },
    });
  } catch (e) {
    console.log(e);
  }
};
