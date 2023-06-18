/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export const productApi = {
    products: {
        create: (data) => request('POST', `entity/save`, data, true),
        list: (data) => request('POST', `entity/read/data`, data, true)
    },

    categories: {
        create: (data) => request('POST', `entity/save`, data, true),
        delete: (data) => request('POST', `entity/save`, data, true),
        update: (data) => request('POST', `entity/save`, data, true),
        list: (data) => request('POST', `entity/save`, data, true)
    }
};
