import * as apiFetcher from '../utils/api-fetcher';

export const getShutters = () => {
    return apiFetcher.get('/api/shutter');
};