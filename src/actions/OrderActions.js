import {
    GET_ORDERS,
    GET_ORDERS_BY_CUSTOMER,
    CREATE_ORDER,
    PAY_ORDER,
    ASSEMBLE_ORDER,
    INITIALIZE_ORDER,
    ADD_DEFAULT_ITEM_TO_CART,
    CHANGE_ORDER_ITEM,
    CHANGE_ORDER,
    CHANGE_CUSTOMER,
    CHANGE_INSTALLATION,
    CHANGE_INVOICE,
    RESET_FILTERED_ORDERS
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

    initializeOrder () {
        ShutterShopDispatcher.handleViewAction({
            actionType: INITIALIZE_ORDER,
            payload: null
        });
    }

    addDefaultItemToCart () {
        ShutterShopDispatcher.handleViewAction({
            actionType: ADD_DEFAULT_ITEM_TO_CART,
            payload: null
        });
    }

    changeOrderItem (options) {
        ShutterShopDispatcher.handleViewAction({
            actionType: CHANGE_ORDER_ITEM,
            payload: options
        });
    }

    changeOrder (order) {
        ShutterShopDispatcher.handleViewAction({
            actionType: CHANGE_ORDER,
            payload: order
        });
    }

    changeCustomer (customerId) {
        ShutterShopDispatcher.handleViewAction({
            actionType: CHANGE_CUSTOMER,
            payload: customerId
        });
    }

    changeInstallation (options) {
        ShutterShopDispatcher.handleViewAction({
            actionType: CHANGE_INSTALLATION,
            payload: options
        });
    }

    changeInvoice (options) {
        ShutterShopDispatcher.handleViewAction({
            actionType: CHANGE_INVOICE,
            payload: options
        });
    }

    resetFilteredOrders () {
        ShutterShopDispatcher.handleViewAction({
            actionType: RESET_FILTERED_ORDERS,
            payload: null
        });
    }
}

export default new OrderActions();
