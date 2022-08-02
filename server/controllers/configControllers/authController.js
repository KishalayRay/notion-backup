const cryptoJS = require("crypto-js");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const stripe = require("../../helpers/stripe");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const { createError } = require("../../utils/error");
const { registerEmailParams } = require("../../helpers/email");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  sercretKeyId: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const ses = new AWS.SES({ apiVersion: "2010-12b-01" });
exports.userRegister = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return next(createError(401, "Please Enter Valid Crdentials"));
    }
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return next(createError(401, "Email already exists"));
    }

    const token = jwt.sign(
      { username, email, password },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );
    const params = registerEmailParams(email, token);

    const sendEmail = async () => {
      try {
        const data = await ses.sendEmail(params).promise();
        console.log(`email submitted to SES`, data);
        res.status(200).send("Email has been sent to complete Registration");
      } catch (e) {
        console.log(e);
        return next(
          createError(401, " We could not verify your email, Please try again")
        );
      }
    };
    sendEmail();
  } catch (error) {
    next(error);
  }
};
exports.registerActivate = async (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(401, " Email expired, Try again!"));
    }
    const { username, email, password } = jwt.decode(token);
    console.log(username, email, password);
    const hashedPassword = cryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    );

    const saveUser = async () => {
      try {
        const customer = await stripe.customers.create({
          email,
        });
        console.log(customer.id);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          stripeCustomerId: customer.id,
        });

        await newUser.save();
        res.status(200).json({
          data: {
            user: newUser,
            stripeCustomerId: customer.id,
          },
        });
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    };
    saveUser();
  });
};
exports.userLogin = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(createError(401, "Please Enter Valid Crdentials"));
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(401, "Invalid Credentials"));
    }
    const decryptKey = cryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const originalPassword = decryptKey.toString(cryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return next(createError(401, "Invalid Credentials"));
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { password, username, email, stripeCustomerId, ...info } = user._doc;
    res.status(200).json({
      data: {
        user: info,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findOne(
      { _id: req.user.id },
      { username: 1, email: 1 }
    );
    res.status(200).json({
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
