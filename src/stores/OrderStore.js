import * as apiFetcher from '../utils/api-fetcher';

export const getOrders = () => {
    return apiFetcher.get('/api/order');
};

export const getOrderByCustomer = (customerId) => {
    return apiFetcher.get(`/api/order/customer/${customerId}`);
};
