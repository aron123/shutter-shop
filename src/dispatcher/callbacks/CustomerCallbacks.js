import { GET_CUSTOMERS, GET_CUSTOMER_BY_ID, REGISTER_CUSTOMER } from '../../constants/CustomerConstants';
import * as apiFetcher from '../../utils/api-fetcher';
import CustomerStore from '../../stores/CustomerStore';

const getCustomers = () => {
    apiFetcher.get('/api/customer')
        .then(customers => {
            CustomerStore._customers = customers;
            CustomerStore.emitChange();
        });
};

const getCustomerById = (id) => {
    apiFetcher.get(`/api/customer/${id}`)
        .then(customer => {
            CustomerStore._customer = customer;
            CustomerStore.emitChange();
        });
};

const registerCustomer = (customer) => {
    apiFetcher.post('/api/customer', customer)
        .then(res => {
            CustomerStore._isSaveSucceeded = true
            CustomerStore.emitChange();
        });
};

export default function (data) {
    switch (data.payload.actionType) {
        case GET_CUSTOMERS:
            getCustomers();
            break;
        case GET_CUSTOMER_BY_ID:
            getCustomerById(data.payload.payload);
            break;
        case REGISTER_CUSTOMER:
            registerCustomer(data.payload.payload);
            break;
        default:
            break;
    };
};
