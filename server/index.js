const bodyParser = require('body-parser');
const serverConfig = require('./config/server');
const database = require('./utils/database');
const express = require('express');
const app = express();

database.connectDb()
    .then(() => {
        console.log('Successfully connected to MongoDB.')

        // set up body parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        // set up api routes
        const apiRouter = express.Router();
        apiRouter.use('/order', require('./routes/order.routes'));
        app.use('/api', apiRouter);

        // serve static content in production
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static('build'));
        }

        // start server
        app.listen(serverConfig.port, serverConfig.host, () => {
            console.log(`Server is listening on ${serverConfig.host}:${serverConfig.port} ...`);
        });
    })
    .catch(err => {
        console.error(err);
    });

