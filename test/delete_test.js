const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', done => {
    // Remove this specific User instance of Joe.
    joe
      .remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', done => {
    // Search all Users and remove any that have the value Joe set as it's name.
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndRemove', done => {
    // Search all Users for certian criterea and remove the first record found with that criterea.
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', done => {
    // Search all Users for a specific ID and remove it.
    User.findByIdAndRemove(joe._id)
    .then(() => User.findOne({ name: 'Joe' }))
    .then(user => {
      assert(user === null);
      done();
    });
  });
});
