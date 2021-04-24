const mongoose = require('mongoose');
const http = require('http');

// config should be imported before importing any other file
const config = require('./src/config');
const app = require('./src/app');

const server = http.Server(app);

// plugin global promise in mongoose
mongoose.Promise = global.Promise;

// connect to mongo db
mongoose.connect(config.mongoURI, {
  keepAlive: 1,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoURI}`);
});

mongoose.connection.on('connected', () => {
  if (config.env === 'development') {
    console.log(`CONNECTED to database: successfully`);
  }
});

//opens a port if the envirnoment is not test
if (config.env !== 'test') {
  // listen on port config.port
  server.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
  });
}
