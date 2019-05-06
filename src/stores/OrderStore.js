import EventEmitter from 'events'

class OrderStore extends EventEmitter {

    _orders = [];
    _filteredOrders = [];
    _isOrderCreated = null;

    reset () {
        _isOrderCreated = null;
    }

    setOrderPaid (orderId) {
        _orders.map(order => {
            if (order.id === orderId) {
                order.invoicePaid = true;
            }
        });

        _filteredOrders.map(order => {
            if (order.id === orderId) {
                order.invoicePaid = true;
            }
        });
    }

    setOrderAssembled (orderId) {
        _orders.map(order => {
            if (order.id === orderId) {
                order.assembled = true;
            }
        });

        _filteredOrders.map(order => {
            if (order.id === orderId) {
                order.assembled = true;
            }
        });
    }

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

export default new OrderStore();
