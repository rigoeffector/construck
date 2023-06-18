/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export  const productApi = {
    get: {
        listProducts: (data) => request('POST', `entity/read/data`, data, true)
    },
    create: {
        product: (data) => request('POST', `entity/save`, data, true)
    }
};
