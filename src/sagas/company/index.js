import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';


import {vendorsApi} from '../../api/vendors';

import { COMPANY_REQUEST_ASSET_REQUEST,COMPANY_REQUEST_ASSET_ERROR,COMPANY_REQUEST_ASSET_LOADING,COMPANY_REQUEST_ASSET_SUCCESS,COMPANY_REQUEST_ASSET_RESET, } from '../../reducers/company/constant';


export function* createCompanyAssetRequestSaga(action) {
    try {
        yield put(loading(COMPANY_REQUEST_ASSET_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.requestAsset, {...payload});
        if (response && response.status === 201) {
            yield put(success(COMPANY_REQUEST_ASSET_SUCCESS, response));
           
            yield delay(2000);
            yield put({type: COMPANY_REQUEST_ASSET_RESET});
        } else {
            yield put(error(COMPANY_REQUEST_ASSET_ERROR, response));
            yield delay(2000);
            yield put({type: COMPANY_REQUEST_ASSET_RESET});
        }
    } catch (err) {
        yield put(error(COMPANY_REQUEST_ASSET_ERROR, err));
        yield delay(2000);
        yield put({type: COMPANY_REQUEST_ASSET_RESET});
    }
}

export function* watchCompanyRequestAssetData() {
    yield takeLatest(COMPANY_REQUEST_ASSET_REQUEST, createCompanyAssetRequestSaga);
}
