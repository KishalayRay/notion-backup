const Api = require("../../models/ApiList");
const User = require("../../models/User");
const stripe = require("../../helpers/stripe");
const slugify = require("slug");
const { createError } = require("../../utils/error");
exports.getApi = async (req, res, next) => {
  const user = await User.findById({ _id: req.user.id });
  console.log(user);
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

  try {
    const freeApi = await Api.find({ proAccess: false });
    const api = await Api.find();
    //console.log(subscription.data[0].plan.nickname);
    if (!subscription.data.length) {
      return res.status(200).json({
        data: {
          api: freeApi,
        },
      });
    }
    if (subscription.data.length) {
      if (
        (subscription.data[0].plan.product === "prod_MthPNds8UrjRW2" ||
          subscription.data[0].plan.product === "prod_Mth60dJ8t5scsf") &&
        subscription.data[0].status === "active"
      ) {
        return res.status(200).json({
          data: {
            api: api,
          },
        });
      } else {
        res.status(200).json({
          data: {
            api: freeApi,
          },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
exports.getProApi = async (req, res, next) => {
  try {
    const api = await Api.find({ proAccess: true });
    res.status(200).json({
      data: {
        api: api,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.getSingleApi = async (req, res, next) => {
  try {
    const singleApi = await Api.findById(req.params.id);
    res.status(200).json({
      data: {
        api: singleApi,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.createApi = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const { logo, apiName, description } = req.body;
      const str = slugify(apiName, { trim: true });
      const apiSlug = str.charAt(0).toUpperCase() + str.slice(1);
      const api = new Api({ logo, apiName, apiSlug, description });
      await api.save();

      res.status(200).json({
        data: {
          api: api,
        },
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(401, "You are not allowed!"));
  }
};
exports.updateApi = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const updatedApi = await Api.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        data: {
          api: updatedApi,
        },
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(401, "You are not allowed!"));
  }
};
exports.deleteApi = async (req, res, next) => {
  if (req.user.isAdmin) {
    try {
      const deleteApi = await Api.findByIdAndDelete(req.params.id);
      res.status(200).json({
        data: {
          api: deleteApi,
        },
      });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(401, "You are not allowed!"));
  }
};
