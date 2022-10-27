const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cron = require("node-cron");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT;
const HOST = "0.0.0.0";

//config Routes
app.use(helmet());

app.use(cookieParser());
app.use(cors({ credentials: true, origin: true })); //http://localhost:8080
const authRoute = require("./routes/configRoutes/authRoute");
const apiListRoute = require("./routes/configRoutes/apiListRoute");
const apiConfigRoute = require("./routes/configRoutes/apiConfigRoute");
const notionConfigRoute = require("./routes/configRoutes/notionConfigRoute");
const statRoute = require("./routes/configRoutes/statRoute");
const subs = require("./routes/stripeRoute/subsRoute");

//dataApi routes
const omdbApi = require("./routes/dataApiRoutes/omdbApiRoute");
const spoonacularApi = require("./routes/dataApiRoutes/spoonacularApiRoute");
const stockDataApi = require("./routes/dataApiRoutes/stockDataApiRoute");
const calendarificApi = require("./routes/dataApiRoutes/calendarificApiRoute");
const theNewsApi = require("./routes/dataApiRoutes/theNewsApiRoute");
const googleBooksApi = require("./routes/dataApiRoutes/googlebooksApiRoute");
const caloriesBurnedApi = require("./routes/dataApiRoutes/caloriesburnedApiRoute");
const googleJobsApi = require("./routes/dataApiRoutes/googleJobsApiRoute");
const googleKeyword = require("./routes/dataApiRoutes/googleKeywordApiRoute");
const bigPictureApi = require("./routes/dataApiRoutes/bigPictureApiRoute");
const hunterApi = require("./routes/dataApiRoutes/hunterApiRoute");
const coinRankingApi = require("./routes/dataApiRoutes/coinRankingApiRoute");
const triposoApi = require("./routes/dataApiRoutes/triposoApiRoute");
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
app.use("/api/v1/stat", statRoute);

app.use("/api/v1/omdb", omdbApi);
app.use("/api/v1/spoonacular", spoonacularApi);
app.use("/api/v1/stockdata", stockDataApi);
app.use("/api/v1/calendarific", calendarificApi);
app.use("/api/v1/thenewsapi", theNewsApi);
app.use("/api/v1/googlebooks", googleBooksApi);
app.use("/api/v1/caloriesburned", caloriesBurnedApi);
app.use("/api/v1/googlejobs", googleJobsApi);
app.use("/api/v1/googlekeyword", googleKeyword);
app.use("/api/v1/bigpicture", bigPictureApi);
app.use("/api/v1/hunter", hunterApi);
app.use("/api/v1/coinranking", coinRankingApi);
app.use("/api/v1/triposo", triposoApi);
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

app.listen(PORT, HOST, () => {
  console.log(`listening from port no ${PORT}`);
});
