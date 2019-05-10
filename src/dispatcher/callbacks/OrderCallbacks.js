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
} from '../../constants/OrderConstants';
import * as apiFetcher from '../../utils/api-fetcher';
import OrderStore from '../../stores/OrderStore';

const getOrders = () => {
    apiFetcher.get('/api/order')
        .then(orders => {
            OrderStore._orders = orders;
            OrderStore.emitChange();
        });
};

const getOrdersByCustomer = (customerId) => {
    apiFetcher.get(`/api/order/customer/${customerId}`)
        .then(orders => {
            OrderStore._filteredOrders = orders;
            OrderStore.emitChange();
        });
};

const createOrder = (order) => {
    apiFetcher.post('/api/order', order)
        .then(res => {
            OrderStore._isOrderCreated = true;
            OrderStore.emitChange();
        });
};

const payOrder = (orderId) => {
    apiFetcher.post(`/api/order/${orderId}/pay`)
        .then(() => {
            OrderStore.setOrderPaid(orderId);
            OrderStore.emitChange();
        });
};

const assembleOrder = (orderId) => {
    apiFetcher.post(`/api/order/${orderId}/assemble`)
        .then(() => {
            OrderStore.setOrderAssembled(orderId);
            OrderStore.emitChange();
        });
};

const initializeOrder = () => {
    OrderStore._orderToCreate = {
        customerId: null,
        items: [ new OrderStore.DefaultOrderItem() ]
    };
    OrderStore._isOrderCreated = null;
    OrderStore.emitChange();
};

const addDefaultItemToCart = () => {
    OrderStore._orderToCreate.items.push(new OrderStore.DefaultOrderItem());
    OrderStore.emitChange();
};

const changeOrderItem = (options) => {
    const index = options.index;
    const itemToSave = options.item;

    OrderStore._orderToCreate.items[index] = itemToSave;

    OrderStore.emitChange();
}

const changeOrder = (order) => {
    OrderStore._orderToCreate = order;
    OrderStore.emitChange();
};

const changeCustomer = (customerId) => {
    OrderStore._orderToCreate.customerId = customerId;
    OrderStore.emitChange();
};

const changeInstallation = (options) => {
    apiFetcher.post(`/api/order/${options.orderId}/installation`, {
        installationTime: options.installationTime,
        installer: options.installer
    })
        .then(() => {
            OrderStore._orders.map(order => {
                if (order.id === options.orderId) {
                    order.installationTime = options.installationTime.toISOString();
                    order.installer = options.installer;
                }

                return order;
            })

            OrderStore.emitChange();
        });
};

const changeInvoice = (options) => {
    apiFetcher.post(`/api/order/${options.orderId}/invoice`, {
        totalPrice: options.totalPrice,
        invoicePaid: false
    })
        .then(() => {
            OrderStore._orders.map(order => {
                if (order.id === options.orderId) {
                    order.totalPrice = options.totalPrice;
                    order.invoicePaid = false;
                }

                return order;
            })

            OrderStore.emitChange();
        });
};

const resetFilteredOrders = () => {
    OrderStore._filteredOrders = [];
    OrderStore.emitChange();
};

export default function (data) {
    switch (data.payload.actionType) {
        case GET_ORDERS:
            getOrders();
            break;
        case GET_ORDERS_BY_CUSTOMER:
            getOrdersByCustomer(data.payload.payload);
            break;
        case CREATE_ORDER:
            createOrder(data.payload.payload);
            break;
        case PAY_ORDER:
            payOrder(data.payload.payload);
            break;
        case ASSEMBLE_ORDER:
            assembleOrder(data.payload.payload);
            break;
        case INITIALIZE_ORDER:
            initializeOrder();
            break;
        case ADD_DEFAULT_ITEM_TO_CART:
            addDefaultItemToCart();
            break;
        case CHANGE_ORDER_ITEM:
            changeOrderItem(data.payload.payload);
            break;
        case CHANGE_ORDER:
            changeOrder(data.payload.payload);
            break;
        case CHANGE_CUSTOMER:
            changeCustomer(data.payload.payload);
            break;
        case CHANGE_INSTALLATION:
            changeInstallation(data.payload.payload);
            break;
        case CHANGE_INVOICE:
            changeInvoice(data.payload.payload);
            break;
        case RESET_FILTERED_ORDERS:
            resetFilteredOrders();
            break;
        default:
            break;
    };
};
