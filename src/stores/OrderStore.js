import * as apiFetcher from '../utils/api-fetcher';

export const getOrders = () => {
    return apiFetcher.get('/api/order');
};

export const getOrderByCustomer = (customerId) => {
    return apiFetcher.get(`/api/order/customer/${customerId}`);
};

export const createOrder = (order) => {
    return apiFetcher.post('/api/order', order);
}

export const payOrder = (orderId) => {
    return apiFetcher.post(`/api/order/${orderId}/pay`);
};
