const cryptoJS = require("crypto-js");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const stripe = require("../../helpers/stripe");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const _ = require("lodash");
const { createError } = require("../../utils/error");
const {
  registerEmailParams,   
  forgotPasswordParams,
} = require("../../helpers/email");

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
      return next(createError(401, "Please Enter Valid Credentials"));
    }
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return next(createError(401, "Email already exists"));
    }

    const token = jwt.sign(
      { username, email, password },
      process.env.JWT_ACCESSTOKEN_SECRET_KEY,
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
  jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET_KEY, (err, user) => {
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
        return next(
          createError(401, " We could not verify your email, Please try again")
        );
      }
    };
    saveUser();
  });
};
exports.userLogin = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(createError(401, "Please Enter Valid Credentials"));
  }
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(createError(401, "Email doesn't exists"));
    }
    const decryptKey = cryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );
    const originalPassword = decryptKey.toString(cryptoJS.enc.Utf8);
    if (originalPassword !== req.body.password) {
      return next(createError(401, "Incorrect Password"));
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESSTOKEN_SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );
    const refreshToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,

      maxAge: 1000 * 60 * 60 * 24,
    });
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
exports.refreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return next(createError(400, "No token provided"));
  }
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    (err, user) => {
      if (err) {
        return next(createError(400, "No token provided"));
      }
      const accessToken = jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_ACCESSTOKEN_SECRET_KEY,
        {
          expiresIn: "5m",
        }
      );
      res.status(200).json({
        data: {
          isAdmin: user.isAdmin,
          accessToken,
        },
      });
    }
  );
};
exports.logout = async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.clearCookie("jwt", { httpOnly: true });
    return next(createError(400, "No token provided"));
  }
  res.clearCookie("jwt", { httpOnly: true });
  res.status(200).json({
    data: {
      message: "Logout Successfully",
    },
  });
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(createError(400, "Email doesn't exists"));
  }
  const token = jwt.sign(
    { name: user.username },
    process.env.JWT_RESET_PASSWORD,
    {
      expiresIn: "10m",
    }
  );
  const params = forgotPasswordParams(email, token);
  await User.updateOne(
    { email: email },
    { $set: { resetPasswordLink: token } }
  );
  const sendEmail = async () => {
    try {
      const data = await ses.sendEmail(params).promise();
      console.log(`email submitted to SES`, data);
      res
        .status(200)
        .send(`Email has been sent to ${email}. Click to reset your Password`);
    } catch (e) {
      console.log(e);
      return next(
        createError(401, " We could not verify your email, Please try again")
      );
    }
  };
  sendEmail();
};
exports.resetPassword = async (req, res, next) => {
  const { resetPasswordLink, newPassword } = req.body;
  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      async (error, data) => {
        if (error) {
          return next(createError(400, "Link expired, Please try again"));
        }
        User.findOne({ resetPasswordLink }).exec((err, user) => {
          if (err || !user) {
            return next(
              createError(400, "Something went wrong, Please try again")
            );
          }

          const updatedFields = {
            password: cryptoJS.AES.encrypt(newPassword, process.env.SECRET_KEY),
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return next(
                createError(400, "Something went wrong, Please try again")
              );
            }

            res.json({
              data: {
                message: `Great! Now you can login with your new password`,
              },
            });
          });
        });
      }
    );
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
