const ObjectId = require('mongodb').ObjectId;

const collection = require('../utils/database').getDatabase().collection('shutters');

const getAllShutters = () => {
    return collection.find().toArray();
}

const getShutterById = (id) => {
    return collection.findOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllShutters,
    getShutterById
};
