/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const vendorsApi = {
    get: {
        listVendors: (data) => request('POST', `entity/read/data`, data, true)
    },
    create: {
        vendor: (data) => request('POST', `entity/save`, data, true)
    }
};
