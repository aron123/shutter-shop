import { GET_SHUTTERS } from '../constants/ShutterConstants';
import ShutterShopDispatcher from '../dispatcher/ShutterShopDispatcher';

class ShutterActions {

    getShutters () {
        ShutterShopDispatcher.handleViewAction({
            actionType: GET_SHUTTERS,
            payload: null
        });
    }

}

export default new ShutterActions();