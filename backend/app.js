const express = require('express');
// post data from client to server DB through bodyparser
const bodyParser = require("body-parser");

const Mongoose = require("mongoose");

// table
const Post = require('./models/post');

const app = express();

// connection to Mongoose db() using username and password
Mongoose.connect("mongodb+srv://karthiklnagar:8PcIMBOcSYGVg340@cluster0-nwump.mongodb.net/test?retryWrites=true", { useNewUrlParser: true })
// .then(() => {
//   console.log("Connected to Database");
// })
// .catch(() => {
//   console.log("connection failed");
// });

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
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});


app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id:"123456",
      title:"First server side post",
      content:"This is coming from the server"
    },
    {
      id:"123457",
      title:"Second server side post",
      content:"This is coming from the server!!!"
    }
  ]
  res.status(200).json({
    message:"Posts Fetched Successfully",
    posts: posts
  })
});

module.exports = app;
