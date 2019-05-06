import EventEmitter from 'events'

class StatisticsStore extends EventEmitter {

    _statistics = {
        top5CustomerBySpendings: [],
        top5CustomerByOrderCount: [],
        top5WorkerByInstallCount: [],
        ordersSum: 0,
        notPaidOrdersSum: 0,
        notAssembledOrdersSum: 0,
        orderPriceAvg: 0
    };

    emitChange () {
        this.emit('change');
    }

    addChangeListener (callback) {
        this.on('change', callback);
    }

    removeChangeListener (callback) {
        this.removeListener('change', callback);
    }
}

export default new StatisticsStore();
