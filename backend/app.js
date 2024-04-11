const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();

mongoose.connect("mongodb+srv://akd6882:wVQiYI7rpCR0CLuv@akd6882.nhayi2j.mongodb.net/?retryWrites=true&w=majority&appName=akd6882")
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  // const post = req.body;
  const post = new Post({
    title: req.body.title,
    content:req.body.content
  });
  console.log(post);
  post.save().then((createdPost) => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
    Post.find().then((documents) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/post/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id}).then((result) => {
    console.log(result)
    res.status(200).json({
      message: "Post deleted!"
    });
  });
});

module.exports = app;
