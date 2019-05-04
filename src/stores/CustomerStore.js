import * as apiFetcher from '../utils/api-fetcher';

export const getCustomers = () => {
    return apiFetcher.get('/api/customer');
};

export const getCustomerById = (id) => {
    return apiFetcher.get(`/api/customer/${id}`);
}

export const registerCustomer = (customer) => {
    return apiFetcher.post('/api/customer', customer);
}
