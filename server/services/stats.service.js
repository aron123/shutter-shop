const repository = require('../repositories/stats.repository');

const getSumOfOrders = () => {
    return repository.getSumOfOrders();
}

const getSumOfNotPaidOrders = () => {
    return repository.getSumOfNotPaidOrders();
}

const getSumOfNotAssembledOrders = () => {
    return repository.getSumOfNotAssembledOrders();
}

const getAvgOrderPrice = async () => {
    return await repository.getAvgOrderPrice();
}

const getTop5CustomerBySpentMoney = async () => {
    return await repository.getTop5CustomerBySpentMoney();
}

const getTop5CustomerByOrderCount = async () => {
    return await repository.getTop5CustomerByOrderCount();
}

const getTop5WorkerByInstallationCount = async () => {
    return await repository.getTop5WorkerByInstallationCount();
}

module.exports = {
    getSumOfOrders,
    getSumOfNotPaidOrders,
    getSumOfNotAssembledOrders,
    getAvgOrderPrice,
    getTop5CustomerBySpentMoney,
    getTop5CustomerByOrderCount,
    getTop5WorkerByInstallationCount
};