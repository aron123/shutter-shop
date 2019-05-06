import {
    GET_ORDERS,
    GET_ORDERS_BY_CUSTOMER,
    CREATE_ORDER,
    PAY_ORDER,
    ASSEMBLE_ORDER
} from '../constants/OrderConstants';
import ShutterShopDispatcher from '../dispatcher/ShutterShopDispatcher';

class OrderActions {
    getOrders () {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_ORDERS,
            payload: null
        });
    }

    getOrdersByCustomer (customerId) {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_ORDERS_BY_CUSTOMER,
            payload: customerId
        });
    }

    createOrder (order) {
        ShutterShopDispatcher.handleViewAction({
            actionType: CREATE_ORDER,
            payload: order
        });
    }

    payOrder (orderId) {
        ShutterShopDispatcher.handleViewAction({
            actionType: PAY_ORDER,
            payload: orderId
        });
    }

    assembleOrder (orderId) {
        ShutterShopDispatcher.handleViewAction({
            actionType: ASSEMBLE_ORDER,
            payload: orderId
        });
    }
}

export default new OrderActions();
