const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('Updating a model intance by using set and save', done => {
    // Here, we're going to change Joe's name property to Alex.
    joe.set('name', 'Alex');

    // Now we must save it in order for the change to persist.
    joe.save()
      /**
       * When passing in an empty object to the .find method,
       * we are essentially saying that there is no specific
       * criterea to look for, just return an array of all User
       * instances.
       */
      .then(() => User.find({}))
      .then(users => {
        // There should only be one item in the array.
        assert(users.length === 1);

        // That one item must now have the value 'Alex' set as it's name.
        assert(users[0].name === 'Alex');
        done();
      });
  });
});
