const collection = require('../utils/database').getDatabase().collection('orders');
const customerRepository = require('./customer.repository');
const employeeRepository = require('./employee.repository');

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
                value: { $sum: '$totalPrice' } //spent money
            }
        },
        {
            $sort: {
                value: -1
            }
        },
        { $limit: 5 }
    ]).toArray();

    for (let item of results) {
        const customer = await customerRepository.getCustomerById(item._id);
        item.label = `${customer.name} - ${item.value} $`;
    }

    return results;
}

const getTop5CustomerByOrderCount = async () => {
    const results = await collection.aggregate([
        {
            $group: {
                _id: '$customerId',
                value: { $sum: 1 } //order count 
            }
        },
        {
            $sort: {
                value: -1
            }
        },
        { $limit: 5 }
    ]).toArray();

    for (let item of results) {
        const customer = await customerRepository.getCustomerById(item._id);
        item.label = `${customer.name} - ${item.value} orders`;
    }

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
                value: { $sum: 1 } // installation count
            }
        },
        {
            $sort: {
                value: -1
            }
        },
        { $limit: 5 }
    ]).toArray();

    for (let item of results) {
        const worker = await employeeRepository.getEmployeeById(item._id);
        item.label = worker.name;
    }

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