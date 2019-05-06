import { GET_SHUTTERS } from '../../constants/ShutterConstants';
import * as apiFetcher from '../../utils/api-fetcher';
import ShutterStore from '../../stores/ShutterStore';

const getShutters = () => {
    apiFetcher.get('/api/shutter')
        .then(shutters => {
            ShutterStore._shutters = shutters;
            ShutterStore.emitChange();
        });
};

export default function (data) {
    switch (data.payload.actionType) {
        case GET_SHUTTERS:
            getShutters();
            break;
        default:
            break;
    };
};
