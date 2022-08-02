const cryptoJS = require("crypto-js");
const { validationResult } = require("express-validator");
const Apikey = require("../../models/ApiKey");
const { createError } = require("../../utils/error");
exports.createApiConfig = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(createError(401, "Please Enter Valid Crdentials"));
  }
  try {
    const apiKeyBody = {
      apiSlug: req.body.apiSlug,
      key: cryptoJS.AES.encrypt(
        req.body.key,
        process.env.SECRET_KEY
      ).toString(),
    };
    const apiKey = await Apikey.findOne({
      $and: [{ "keys.apiSlug": req.body.apiSlug }, { user: req.user.id }],
    });
    console.log(apiKey);
    if (apiKey) {
      return next(createError(400, "Data already Inserted"));
    }
    update = {
      $set: { user: req.user.id },
      $push: { keys: apiKeyBody },
    };
    const api = await Apikey.updateOne({ user: req.user.id }, update, {
      upsert: true,
    });
    // await Api.updateOne(
    //   { _id: apiKeyBody.apiId },
    //   { $push: { users: req.user.id } }
    // );
    // const newApiKey = new Apikey({...apiKeyBody,user:req.user._id});
    // await newApiKey.save();

    res.status(200).json({
      data: {
        ApiKey: api,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.getApiConfig = async (req, res, next) => {
  try {
    const api = await Apikey.findOne(
      {
        $and: [{ user: req.user.id }, { "keys.apiSlug": req.body.apiSlug }],
      },
      { keys: { $elemMatch: { apiSlug: req.body.apiSlug } } }
    );

    // const api = await Apikey.findOne({
    //   "keys.apiId": { $in: [req.body.apiId] },
    // });

    // const api = await Apikey.findOne({
    //   keys: { $elemMatch: { apiId: req.body.apiId } },
    // });

    //   { user: req.user.id, "keys.apiId": req.body.apiId },
    //   { "keys.key": 1, _id: 0 }
    // );

    res.status(200).json({
      data: {
        ApiKey: api,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteApiConfig = async (req, res, next) => {
  try {
    const apiKeyBody = {
      apiSlug: req.body.apiSlug,
    };
    update = {
      $pull: { keys: apiKeyBody },
    };
    await Apikey.updateOne({ user: req.user.id }, update);
    // const newApiKey = new Apikey({...apiKeyBody,user:req.user._id});
    // await newApiKey.save();

    res.status(200).json({
      data: {
        message: "Api Key deleted",
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
