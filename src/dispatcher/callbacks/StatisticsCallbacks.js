import * as apiFetcher from '../../utils/api-fetcher';
import { GET_STATISTICS } from '../../constants/StatisticsConstants';
import StatisticsStore from '../../stores/StatisticsStore';

/**
 * Transforms data to structure that react-d3-components module waits.
 */
const transformData = (raw) => {
    let data = {
        values: []
    };

    for (const item of raw) {
        data.values.push({
            x: item.label,
            y: item.value
        });
    }

    return data;
}

const getStatistics = () => {
    apiFetcher.get('/api/stats')
        .then(data => {
            StatisticsStore._statistics = {
                top5CustomerBySpendings: transformData(data.top5CustomerBySpentMoney),
                top5CustomerByOrderCount: transformData(data.top5CustomerByOrderCount),
                top5WorkerByInstallCount: transformData(data.top5WorkerByInstallationCount),
                ordersSum: data.ordersSum,
                notPaidOrdersSum: data.notPaidOrdersSum,
                notAssembledOrdersSum: data.notAssembledOrdersSum,
                orderPriceAvg: data.orderPriceAvg
            };

            StatisticsStore.emitChange();
        });
};

export default function (data) {
    switch (data.payload.actionType) {
        case GET_STATISTICS:
            getStatistics();
            break;
        default:
            break;
    };
};
