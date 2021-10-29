const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const TweetSchema = require("./Tweet").TweetSchema;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/addTweet", (req, res) => {
  let postData = req.body;
  let Title = postData.Title;
  let Tweet = postData.Tweet;
  if (typeof Title == "string" && Title.length < 20) {
    res.send({ msg: "Error can't add titles less than 20 chars" });
    return;
  }
  if (typeof Tweet == "string" && Tweet.length > 50) {
    res.send({ msg: "Error can't add tweet more than 50 chars" });
    return;
  }

  TweetSchema.create(
    {
      Title,
      Tweet,
      createdAt: +new Date() / 1000,
    },
    function (err) {
      if (err) return res.send({ msg: "Error  adding new tweet", err });
      res.send({ msg: postData });
    }
  );
});
app.get("/tweet", (req, res) => {
  res.sendFile(path.resolve("addTweet.html"));
});
app.get("/tweet/:id", (req, res) => {
  let id = req.params.id;
  TweetSchema.find({ id: id }, function (err, tweets) {
    if (err) return res.send({ msg: "Error  updaeting  tweet", err });

    let TweetData = tweets[0];
    res.send(TweetData);
  });
});
app.post("/tweet/edit/:id", (req, res) => {
  let id = req.params.id;
  TweetSchema.find({ id: id }, function (err, tweets) {
    if (err) return res.send({ msg: "Error  updaeting  tweet", err });

    let TweetData = tweets[0];
    TweetSchema.save(
      {
        Title: TweetData.Title,
        Tweet: TweetData.Tweet,
      },
      function (err) {
        if (err) return res.send({ msg: "Error  updateing  tweet", err });
        res.send({ msg: TweetData });
      }
    );
  });
});
app.get("/tweet/delete/:id", (req, res) => {
  let id = req.params.id;

  TweetSchema.findOneAndRemove({ id: id }, function (err, _) {
    if (err) return res.send({ msg: "Error  deleting  tweet", err });

    res.send({ msg: "ok" });
  });

  req.redirect("/");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
