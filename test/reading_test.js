const assert = require('assert');
const User = require('../src/userSchema');

describe('Reading users out of the database', () => {
  let joe;
  // Creating an instance of User with the name Joe.
  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('finds all users with a name of Joe', done => {
    // This was an example how the ObjectId wrapper may cause some confusion when comparing by IDs.
    User.find({ name: 'Joe' }).then(users => {
      assert(users[0].id.toString() === joe._id.toString());
      done();
    });
  });

  it('find a user with a particular id', done => {
    // This was a basic example of using the .findOne method.
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
