const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', error => {
    console.warn('Warning: ', error);
  });

  // This will wipe the database beforeEach test.
  beforeEach( done => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });