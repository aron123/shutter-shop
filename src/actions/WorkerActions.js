import { GET_WORKERS, GET_WORKER_BY_ID } from '../constants/WorkerConstants';
import ShutterShopDispatcher from '../dispatcher/ShutterShopDispatcher';

class WorkerActions {
    getWorkers () {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_WORKERS,
            payload: null
        });
    }

    getWorkerById (id) {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_WORKER_BY_ID,
            payload: id
        });
    }
}

export default new WorkerActions();
