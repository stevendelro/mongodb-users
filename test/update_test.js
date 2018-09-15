const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save().then(() => done());
  });

  // Helper function created to keep things DRY.
  function assertName(promise, done) {
    promise.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
  }

  // This first "it" function will NOT use the helper function in
  // order to comment over the complete process.
  it('will update a model intance by using set and save', done => {
    // Here, we're going to change Joe's name property to Alex.
    joe.set('name', 'Alex');

    // Now we must save it in order for the change to persist.
    joe
      .save()
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

  // From here downwards we will use the assertName helper function.
  it('will update a model intance by using .update()', done => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('will update a modal class', done => {
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('will findOneAndUpdate a modal class', done => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('will findByIdAndUpdate a modal class', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  // Here, we are experimenting with the $inc Update Operator.
  xit('will increment a users postCount by 1', done => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
