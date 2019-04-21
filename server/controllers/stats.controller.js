const repository = require('../repositories/stats.repository');
const handlers = require('./shared/response.handlers');

const getStats = async (req, res) => {
    try {
        const ordersSum = await repository.getSumOfOrders();
        const notPaidOrdersSum = await repository.getSumOfNotPaidOrders();
        const notAssembledOrdersSum = await repository.getSumOfNotAssembledOrders();
        const orderPriceAvg = await repository.getAvgOrderPrice();
        const top5CustomerBySpentMoney = await repository.getTop5CustomerBySpentMoney();
        const top5CustomerByOrderCount = await repository.getTop5CustomerByOrderCount();
        const top5WorkerByInstallationCount = await repository.getTop5WorkerByInstallationCount();
        
        handlers.sendSuccessResponse(res, {
            ordersSum,
            notPaidOrdersSum,
            notAssembledOrdersSum,
            orderPriceAvg,
            top5CustomerBySpentMoney,
            top5CustomerByOrderCount,
            top5WorkerByInstallationCount
        });
    } catch (err) {
        console.error(err);
        handlers.sendErrorResponse(res);
    }
};

module.exports = {
    getStats
};