import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';


import {vendorsApi} from '../../api/vendors';

import { INDIVIDUAL_REQUEST_ASSET_REQUEST,INDIVIDUAL_REQUEST_ASSET_ERROR,INDIVIDUAL_REQUEST_ASSET_LOADING,INDIVIDUAL_REQUEST_ASSET_SUCCESS,INDIVIDUAL_REQUEST_ASSET_RESET, } from '../../reducers/company/constant';


export function* createIndividualAssetRequestSaga(action) {
    try {
        yield put(loading(INDIVIDUAL_REQUEST_ASSET_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(vendorsApi.vendors.requestAsset, {...payload});
        if (response && response.status === 201) {
            yield put(success(INDIVIDUAL_REQUEST_ASSET_SUCCESS, response));
           
            yield delay(2000);
            yield put({type: INDIVIDUAL_REQUEST_ASSET_RESET});
        } else {
            yield put(error(INDIVIDUAL_REQUEST_ASSET_ERROR, response));
            yield delay(2000);
            yield put({type: INDIVIDUAL_REQUEST_ASSET_RESET});
        }
    } catch (err) {
        yield put(error(INDIVIDUAL_REQUEST_ASSET_ERROR, err));
        yield delay(2000);
        yield put({type: INDIVIDUAL_REQUEST_ASSET_RESET});
    }
}

export function* watchIndividualRequestAssetData() {
    yield takeLatest(INDIVIDUAL_REQUEST_ASSET_REQUEST, createIndividualAssetRequestSaga);
}
