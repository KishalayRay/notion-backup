const stripe = require("../../helpers/stripe");
const User = require("../../models/User");
const NotionApiKey = require("../../models/NotionKey");
const Apikey = require("../../models/ApiKey");
const Api = require("../../models/ApiList");
const { createError } = require("../../utils/error");
const schedule = require("node-schedule");
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

      billing_address_collection: "required",
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

  if (subscription.data.length) {
    if (
      (subscription.data[0].plan.product === "prod_MthPNds8UrjRW2" ||
        subscription.data[0].plan.product === "prod_Mth60dJ8t5scsf") &&
      subscription.data[0].status === "active"
    ) {
      res.status(200).json({
        data: {
          subscription: "Pro",
          active: subscription,
        },
      });
    } else {
      res.status(200).json({
        data: {
          subscription: "Free",
          active: subscription,
        },
      });
    }
  }
  if (!subscription.data.length) {
    res.status(200).json({
      data: {
        subscription: "Free",
        active: subscription,
      },
    });
  }
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
        cancel,
      },
    });
    const proApis = await Api.find({ proAccess: true });
    // const timeStamp = new Date(cancel.cancel_at * 1000).toGMTString(); //'12/1/2022, 6:09:00 PM'
    // const year = new Date(cancel.cancel_at * 1000).getFullYear();
    // const month = new Date(cancel.cancel_at * 1000).getMonth() + 1;
    // const day = new Date(cancel.cancel_at * 1000).getDate();
    // const hour = parseInt(timeStamp.substring(17, 19));
    // const minute = parseInt(timeStamp.substring(20, 22));
    // const second = parseInt(timeStamp.substring(23, 25));
    //const date = new Date(year, month, day, hour, minute, second);
    const date = new Date(2022, 11, 03, 20, 16, 00);
    const job = schedule.scheduleJob(date, () => {
      console.log("The world is going to end today.");
      proApis.map(async (api) => {
        const apiKeyBody = {
          apiSlug: api.apiSlug,
        };
        updateBody = {
          $pull: { credentials: apiKeyBody },
        };
        await NotionApiKey.updateOne({ user: req.user.id }, updateBody);
        const apiKey = {
          apiSlug: api.apiSlug,
        };
        updateKey = {
          $pull: { keys: apiKey },
        };
        await Apikey.updateOne({ user: req.user.id }, updateKey);
      });
    });
    console.log(job);
  } catch (e) {
    console.log(e);
  }
};
