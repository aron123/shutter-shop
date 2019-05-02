import * as apiFetcher from '../utils/api-fetcher';

export const getAllWorkers = () => {
    return apiFetcher.get('/api/employee');
}

export const getWorkerById = (workerId) => {
    return apiFetcher.get(`/api/employee/${workerId}`);
};
