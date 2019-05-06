import { GET_STATISTICS } from '../constants/StatisticsConstants';
import ShutterShopDispatcher from '../dispatcher/ShutterShopDispatcher';

class StatisticsActions {

    getStatistics () {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_STATISTICS,
            payload: null
        });
    }

}

export default new StatisticsActions();
