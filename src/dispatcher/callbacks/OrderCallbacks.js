import {
    GET_ORDERS,
    GET_ORDERS_BY_CUSTOMER,
    CREATE_ORDER,
    PAY_ORDER,
    ASSEMBLE_ORDER
} from '../constants/OrderConstants';
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
        default:
            break;
    };
};