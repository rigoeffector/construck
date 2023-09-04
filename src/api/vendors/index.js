/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export const vendorsApi = {
    vendors: {
        list: (data) => request('GET', `api/v1/asset-mgmt/drivers/all`, data, true),
        create: (data) => request('POST', `api/v1/asset-mgmt/drivers`, data, true),
        // update: (data) => request('POST', `entity/instance/update`, data, true),
        delete: (data) => request('DELETE', `api/v1/asset-mgmt/drivers/`, data, true),
        requestAsset : (data) => request('POST', `api/v1/asset-mgmt/asset-requests/submit`, data, true),
    }
};
