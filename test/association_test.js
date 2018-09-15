const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yup, it really is.'
    });
    comment = new Comment({ content: 'Congrats on your post!' });
    /**
     * DEFINING ASSOCIATIONS:
     *
     * Below, when we push the entire blogPost model to joe.blogPosts,
     * Mongoose automatically looks for and uses the ObjectID
     * within that model, even though we literally gave it the
     * entire model.
     */

    joe.blogPosts.push(blogPost);

    /**
     * The same thing happens here as, blogPosts "has many" comments,
     * so add this comment to that list of many comments.
     */
    blogPost.comments.push(comment);

    /**
     * Similar magic is happening with the "has one"
     * relationship. Mongoose has setter's behind the scenes to
     * pluck out that particular ObjectId from the model.
     *
     * comments "has one" user, so explicitly reference that user.
     */
    comment.user = joe;

    /**
     * In order to .save() our associations to the database, we will
     * utilize ES6's native Promise.all() method to ensure all three
     * associations complete their saves before calling done().
     */

    Promise.all([joe.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it('saves a relation between a user and a blogPost', done => {
    User.findOne({ name: 'Joe' })
    .populate('blogPosts')
    .then( user => {
      assert(user.blogPosts[0].title === 'JS is Great')
      done();
    })
  });
});
