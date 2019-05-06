import { GET_WORKERS, GET_WORKER_BY_ID } from '../../constants/WorkerConstants';
import * as apiFetcher from '../../utils/api-fetcher';
import WorkerStore from '../../stores/WorkerStore';

const getWorkers = () => {
    apiFetcher.get('/api/employee')
        .then(employees => {
            WorkerStore._workers = employees;
            WorkerStore.emitChange();
        });
};

const getWorkerById = (id) => {
    apiFetcher.get(`/api/employee/${id}`)
        .then(employee => {
            WorkerStore._worker = employee;
            WorkerStore.emitChange();
        });
};

export default function (data) {
    switch (data.payload.actionType) {
        case GET_WORKERS:
            getWorkers();
            break;
        case GET_WORKER_BY_ID:
            getWorkerById(data.payload.payload);
            break;
        default:
            break;
    };
};
