const mongoose = require('mongoose');
const PostSchema = require('./postSchema');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than two characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number,
  posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
