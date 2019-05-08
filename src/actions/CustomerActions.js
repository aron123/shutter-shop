import {
    GET_CUSTOMERS,
    GET_CUSTOMER_BY_ID,
    REGISTER_CUSTOMER,
    INITIALIZE_STORE,
    CHANGE_SELECTED_CUSTOMER
} from '../constants/CustomerConstants';
import ShutterShopDispatcher from '../dispatcher/ShutterShopDispatcher';

class CustomerActions {
    getCustomers () {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_CUSTOMERS,
            payload: null
        });
    }

    getCustomerById (id) {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_CUSTOMER_BY_ID,
            payload: id
        });
    }

    registerCustomer (customer) {
        ShutterShopDispatcher.handleViewAction({
            actionType: REGISTER_CUSTOMER,
            payload: customer
        });
    }

    initializeCustomerStore () {
        ShutterShopDispatcher.handleViewAction({
            actionType: INITIALIZE_STORE,
            payload: null
        });
    }

    changeSelectedCustomer (customer) {
        ShutterShopDispatcher.handleViewAction({
            actionType: CHANGE_SELECTED_CUSTOMER,
            payload: customer
        });
    }
}

export default new CustomerActions();
