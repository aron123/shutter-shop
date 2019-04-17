const bodyParser = require('body-parser');
const serverConfig = require('./config/server');
const database = require('./utils/database');
const express = require('express');
const app = express();

// connect to mongo
database.connectDb()
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error(err));

// set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set up api routes
const apiRouter = express.Router();
// TODO: map routes to central router:
// apiRouter.use('/endpoint', require('./routes/endpoint'));
//
app.use('/api', apiRouter);

// start server
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`Server is listening on ${serverConfig.host}:${serverConfig.port} ...`);
});