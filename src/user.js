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
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost'
    }
  ]
});

/**
 * When creating a virtual type/property, you must use a
 * standard function block within the ES6 getter. This enables
 * us to use the "this" keyword. Fat arrow functions will not
 * allow the correct reference to the "this" keyword.
 *
 * A fat arrow function would reference "this" to be this entire
 * document, and not the scope in which we intend for "this" to
 * be used, in this case, within the scope of the virtual type.
 */
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
