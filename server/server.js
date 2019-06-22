require("dotenv").config();
const Twitter = require("twit");
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRE
});

function fetchTweets(req, res) {
  const params = { screen_name: req.query.name, count: 10 };
  client.get("statuses/user_timeline", params, function(error, data, response) {
    if (!error) {
      res.end(JSON.stringify(data));
    } else {
      throw Error(JSON.stringify(error));
    }
  });
}

app.use(cors());
app.use(function(req, res, next) {
  res.header("Content-Type", "application/json");
  next();
});

app.get("/v1/get", (req, res) => {
  fetchTweets(req, res);
});

app.listen(port);
console.log("Node server running on port " + port);
