const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  author: String,
  main_content: String,
  tags: Array
});

module.exports = PostSchema;