const Stat = require("../../models/Stat");
const mongoose = require("mongoose");
const ApiKeys = require("../../models/ApiKey");
const NotionApiKey = require("../../models/NotionKey");
const Omdb = require("../../models/Omdb");
const User = require("../../models/User");
exports.getStats = async (req, res, next) => {
  try {
    const keys = await ApiKeys.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $project: { total: { $size: "$keys" } } },
    ]);
    const integrations = await NotionApiKey.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $project: { total: { $size: "$credentials" } } },
    ]);
    const active = await User.aggregate([
      {
        $project: {
          age: {
            $divide: [
              {
                $subtract: [new Date(), "$createdAt"],
              },
              1000 * 60 * 60 * 24 * 30, // number of milliseconds in a month
            ],
          },
        },
      },
    ]);
    // const active = await User.aggregate([
    //   {
    //     $project: {
    //       age: {
    //         $divide: [
    //           { $subtract: [new Date(), "$createdAt"] },
    //           365 * 24 * 60 * 60 * 10000,
    //         ],
    //       },
    //     },
    //   },
    // ]);

    res.status(200).json({
      data: {
        integrations: integrations[0] || 0,

        keys: keys[0] || 0,
        active: active[0] || 0,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
