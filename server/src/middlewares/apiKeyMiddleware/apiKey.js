const axios = require("axios");
const apiKeyMiddleware = async (req, res, next) => {
  if (req.body.apiSlug === "Omdb") {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=${req.body.key}&s=joker`
      );
      console.log(response.data.response, "dtata");
      if (!response.data.Response) {
        return;
      }
      next();
    } catch (e) {
      console.log(e);
    }
  }
};
module.exports = apiKeyMiddleware;
