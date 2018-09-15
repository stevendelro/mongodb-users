const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [
        {
          title: "Joe's First Post",
          author: 'Joe',
          main_content: 'This is my first post.',
          tags: ['mongo', 'backend', 'developer']
        }
      ]
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === "Joe's First Post");
        done();
      });
  });

  it('can add subdocuments to an existing record', done => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts.push({
          title: 'Second Post',
          author: 'Joe',
          main_content: 'This is my second post.',
          tags: ['react', 'node', 'express']
        });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'Second Post');
        done();
      });
  });

  it('can remove an existing subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });
    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
