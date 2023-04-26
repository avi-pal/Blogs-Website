//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");
// require("dotenv").config();

// let alert = require("alert");
const uri = process.env.DB;
mongoose
  .connect(
    "mongodb+srv://admin_avirup:0rug5n3zPlfNfzod@cluster0.rwwzv.mongodb.net/blogpost",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("successfully connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
const postSchema = {
  title: String,
  content: String,
  date: String,
};
const Post = new mongoose.model("Post", postSchema);
const keySchema = {
  akey: String,
};
const Acckey = new mongoose.model("Acckey", keySchema);

const homeStartingContent = "";
const aboutContent =
  "This is the project of Avirup Pal, 3rd Year,GNIT. This ia a Journal  Blog where you can add blog posts";
const contactContent =
  "Contact admin at avirup150@gmail.com, to add your Blog Post goto /compose P.S.- don't hurry, u need";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// var posts = [];

app.get("/", (req, res) => {
  Post.find({}).then((foundItems) => {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: foundItems,
    });
  });
});
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});
app.get("/compose", (req, res) => {
  res.render("compose");
});
app.post("/compose", (req, res) => {
  // console.log(req.body.postTitle);
  // console.log(req.body.postBody);
  var keykey = req.body.Accesskey;
  var day = date.getDate();
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    date: day,
  };
  // posts.push(post);
  //console.log(posts);

  //////////db
  // console.log(keykey);
  // console.log(Acckey);
  Acckey.find({ akey: keykey })
    .populate()
    .then(function (result) {
      // console.log(result);
      // console.log(result.length);
      if (result.length > 0) {
        const postdb = new Post({
          title: post.title,
          content: post.content,
          date: post.date,
        });
        postdb
          .save()
          .then(() => {
            console.log("successfully added post to database");
          })
          .catch((err) => {
            console.log(err);
          });
        setTimeout(() => {
          res.redirect("/success");
        }, "2000");
      } else {
        console.log("authentication failed");
        setTimeout(() => {
          res.redirect("/failure");
        }, "2000");
      }
    });
});

app.get("/posts/:id", (req, res) => {
  //var requestedTitle = req.params.postName;
  var postId = req.params.id;
  // posts.forEach(function (post) {
  //   var storedTitle = post.title;
  //   if (_.lowerCase(requestedTitle) === _.lowerCase(storedTitle)) {
  //     res.render("post", { title: post.title, content: post.content });
  //   }
  // });
  Post.findById(postId).then((foundPost) => {
    res.render("post", { title: foundPost.title, content: foundPost.content });
  });
});

app.get("/delete/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/failure", (req, res) => {
  res.render("failure");
});
app.get("/success", (req, res) => {
  res.render("success");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
