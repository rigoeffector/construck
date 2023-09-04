

/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export const invoiceApi = {
    invoice: {
        list: (data) => request('GET', `api/v1/asset-mgmt/invoice/all`, data, true),
        create: (data) => request('POST', `api/v1/asset-mgmt/invoice/create`, data, true),
        updateStatus : (data) => request('PUT', `api/v1/asset-mgmt/invoice/${data.id}/status/${data.status}`, data, true),
    }
};
