const mongoose = require('mongoose');

before(done => {
  mongoose.connect(
    'mongodb://localhost/userSchemas_test',
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', error => {
      console.warn('Warning: ', error);
    });
});

// This will wipe the database beforeEach test.
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
