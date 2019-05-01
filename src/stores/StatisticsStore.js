import * as apiFetcher from '../utils/api-fetcher';

export const getStatistics = () => {
    return apiFetcher.get('/api/stats');
};
