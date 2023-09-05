/* eslint-disable import/no-anonymous-default-export */
import request from '../request';

export const productApi = {
    products: {
        create: (data) => request('POST', `api/v1/asset-mgmt/assets`, data, true),
        delete: (data) => request('DELETE', `api/v1/asset-mgmt/assets/${data.id}`, data, true),
        changeStatus: (data) => request('PUT', `api/v1/asset-mgmt/assets/${data.id}/status/${data.status}`, data, true),
        update: (data) => request('PUT', `entity/instance/update`, data, true),
        listInternal: (data) => request('GET', `api/v1/asset-mgmt/assets?status=${data.status}&name=${data.name}`, data, true),
        viewRequests: (data) => request('GET', `api/v1/asset-mgmt/asset-requests/all?requestStatus=${data.status || ''}`, data, true),
        viewAssetTypes: (data) => request('GET', 'api/v1/asset-mgmt/assets/all', data, true)
    },
    externalAssets: {
        create: (data) => request('POST', `api/v1/asset-mgmt/external-assets`, data, true),
        delete: (data) => request('DELETE', `api/v1/asset-mgmt/external-assets/${data.id}`, data, true),
        changeStatus: (data) => request('PUT', `api/v1/asset-mgmt/assets/${data.id}/status/${data.status}`, data, true),
        update: (data) => request('PUT', `entity/instance/update`, data, true),
        listExternal: (data) => request('GET', `api/v1/asset-mgmt/external-assets/all`, data, true)
    },

    categories: {
        create: (data) => request('POST', `entity/save`, data, true),
        delete: (data) => request('POST', `entity/instance/delete`, data, true),
        update: (data) => request('POST', `entity/instance/update`, data, true),
        list: (data) => request('POST', `entity/read/data`, data, true)
    }
};
