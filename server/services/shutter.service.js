const repository = require('../repositories/shutter.repository');

const getAllShutters = () => {
    return repository.getAllShutters();
};

const getShutterById = (id) => {
    return repository.getShutterById(id);
};

module.exports = {
    getAllShutters,
    getShutterById
};
