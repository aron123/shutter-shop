const collection = require('../utils/database').getDatabase().collection('orders');

const getSumOfOrders = () => {
    return collection.countDocuments();
}

const getSumOfNotPaidOrders = () => {
    return collection.countDocuments({ invoicePaid: false });
}

const getSumOfNotAssembledOrders = () => {
    return collection.countDocuments({ assembled: false });
}

const getAvgOrderPrice = async () => {
    const results = await collection.aggregate([
        {
            $group: {
                _id: null,
                avg: { $avg: '$totalPrice' }
            }
        }
    ]).toArray();

    return results[0].avg;
}

const getTop5CustomerBySpentMoney = async () => {
    const results = await collection.aggregate([
        {
            $group: {
                _id: '$customerId',
                spentMoney: { $sum: '$totalPrice' }
            }
        },
        {
            $sort: {
                spentMoney: -1
            }
        },
        { $limit: 5 }
    ]).toArray();

    return results;
}

const getTop5CustomerByOrderCount = async () => {
    const results = await collection.aggregate([
        {
            $group: {
                _id: '$customerId',
                orderCount: { $sum: 1 }
            }
        },
        {
            $sort: {
                orderCount: -1
            }
        },
        { $limit: 5 }
    ]).toArray();

    return results;
}

const getTop5WorkerByInstallationCount = async () => {
    const results = await collection.aggregate([
        {
            $match: {
                installer: { $ne: null }
            }   
        },
        {
            $group: {
                _id: '$installer',
                installCount: { $sum: 1 }
            }
        },
        {
            $sort: {
                installCount: -1
            }
        },
        { $limit: 5 }
    ]).toArray();

    return results;
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