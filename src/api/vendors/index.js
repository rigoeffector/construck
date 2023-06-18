/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export const vendorsApi = {
    vendors: {
        list: (data) => request('POST', `entity/read/data`, data, true),
        create: (data) => request('POST', `entity/save`, data, true),
        update: (data) => request('POST', `entity/instance/update`, data, true),
        delete: (data) => request('POST', `entity/instance/delete`, data, true)
    }
};
