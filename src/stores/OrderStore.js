import EventEmitter from 'events'

class OrderStore extends EventEmitter {

    DefaultOrderItem = () => {
        return {
            pieces: 1,
            window: {
                width: 1,
                height: 1
            },
            shutter: ''
        };
    };

    _orders = [];
    _filteredOrders = [];
    _orderToCreate = {
        customerId: null,
        items: [ this.DefaultOrderItem() ]
    };
    _isOrderCreated = null;

    setOrderPaid (orderId) {
        this._orders.map(order => {
            if (order.id === orderId) {
                order.invoicePaid = true;
            }

            return order;
        });

        this._filteredOrders.map(order => {
            if (order.id === orderId) {
                order.invoicePaid = true;
            }

            return order;
        });
    }

    setOrderAssembled (orderId) {
        this._orders.map(order => {
            if (order.id === orderId) {
                order.assembled = true;
            }

            return order;
        });

        this._filteredOrders.map(order => {
            if (order.id === orderId) {
                order.assembled = true;
            }

            return order;
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
