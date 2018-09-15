const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('will verify that postCount returns the correct postCount', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(joe.postCount === 1);
        done();
      });
  });
});
