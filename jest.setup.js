const mongoose = require('mongoose');
const config = require('./src/config');

/** * Connect to the test database. */
const connectDB = async () => {
  await mongoose.connect(config.mongoURI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
};

/** * Drop database, close the connection and stop mongodb. */
const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

/** * Remove all the data for all db collections. */
const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

/** * Connect to a new in-memory database before running any tests. */

beforeAll(async () => await connectDB());

/** * Clear all test data after every test. */

afterEach(async () => await clearDatabase());

/** * Remove and close the db and server. */

afterAll(async () => await closeDatabase());