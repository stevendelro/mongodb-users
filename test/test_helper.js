const mongoose = require('mongoose');

before(done => {
  mongoose.connect(
    'mongodb://localhost/users_test',
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
  const { users, comments, blogPosts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogPosts.drop(() => {
        done();
      });
    });
  });
});
