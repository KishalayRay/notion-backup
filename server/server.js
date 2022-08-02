const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const cron = require("node-cron");
const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config({ path: ".env" });

//config Routes
app.use(helmet());
app.use(cors());

const authRoute = require("./routes/configRoutes/authRoute");
const apiListRoute = require("./routes/configRoutes/apiListRoute");
const apiConfigRoute = require("./routes/configRoutes/apiConfigRoute");
const notionConfigRoute = require("./routes/configRoutes/notionConfigRoute");

const subs = require("./routes/stripeRoute/subsRoute");

//dataApi routes
const omdbApi = require("./routes/dataApiRoutes/omdbApiRoute");
const stockDataApi = require("./routes/dataApiRoutes/stockDataApiRoute");
const calendarificApi = require("./routes/dataApiRoutes/calendarificApiRoute");
//cron jobs
const {
  stockdataUpdate,
} = require("./controllers/updateApiDataController/stockDataApiUpdate");
const DB = process.env.MONGO_URI.replace("<password>", process.env.PASSWORD);
//const DB = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB, { autoIndex: false });
    console.log(`connetion succesful ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/apilist", apiListRoute);
app.use("/api/v1/apiconfig", apiConfigRoute);
app.use("/api/v1/notionconfig", notionConfigRoute);

app.use("/api/v1/omdb", omdbApi);
app.use("/api/v1/stockdata", stockDataApi);
app.use("/api/v1/calendarific", calendarificApi);

app.use("/api/v1/subs", subs);

// cron.schedule("1 * 0 * * *", function () {
//   console.log("running");
//   stockdataUpdate();
// });

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`listening from port no ${PORT}`);
});
