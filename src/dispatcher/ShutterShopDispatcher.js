import { Dispatcher } from 'flux';

import StatisticsCallbacks from './callbacks/StatisticsCallbacks';
import CustomerCallbacks from './callbacks/CustomerCallbacks';
import WorkerCallbacks from './callbacks/WorkerCallbacks';
import ShutterCallbacks from './callbacks/ShutterCallbacks';
import OrderCallbacks from './callbacks/OrderCallbacks';

class ShutterShopDispatcher extends Dispatcher {
    handleViewAction (action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            payload: action
        });
    }
}

const dispatcher = new ShutterShopDispatcher();

dispatcher.register(StatisticsCallbacks.bind(this));
dispatcher.register(CustomerCallbacks.bind(this));
dispatcher.register(WorkerCallbacks.bind(this));
dispatcher.register(ShutterCallbacks.bind(this));
dispatcher.register(OrderCallbacks.bind(this));

export default dispatcher;
