const ObjectId = require('mongodb').ObjectId;

const collection = require('../utils/database').getDatabase().collection('employees');

const getAllEmployees = () => {
    return collection.find().toArray();
};

const getEmployeeById = (id) => {
    return collection.findOne({ _id: new ObjectId(id) });
};

module.exports = {
    getAllEmployees,
    getEmployeeById
};