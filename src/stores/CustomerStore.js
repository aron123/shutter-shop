import * as apiFetcher from '../utils/api-fetcher';

export const getCustomers = () => {
    return apiFetcher.get('/api/customer');
};
