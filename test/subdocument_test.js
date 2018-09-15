const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('can create a subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [
        {
          title: 'Joe\'s First Post',
          author: 'Joe',
          main_content: 'This is my first post.',
          tags: ['mongo','backend', 'developer']
        }
      ]
    });
    joe.save()
    .then(() => User.findOne({ name: 'Joe'}))
    .then( user => {
      assert(user.posts[0].title === 'Joe\'s First Post');
      done();
    });
  });
});
