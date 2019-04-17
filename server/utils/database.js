const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config/database'); 

const connectionUrl = `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.databaseName}`;

let connection;

const connectDb = function () {
    return new Promise ((resolve, reject) => {
        MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, db) => {
            if (err) {
                return reject(err);
            }

            connection = db;
            return resolve(db);
        });
    });
}

const getDatabase = () => connection.db();

module.exports = {
    connectDb, 
    getDatabase
};