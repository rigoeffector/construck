import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {productApi} from '../../../api/product';

import {
    UPDATE_EXTERNAL_ASSET_STATUS_LOADING,
    UPDATE_EXTERNAL_ASSET_STATUS_ERROR,
    UPDATE_EXTERNAL_ASSET_STATUS_RESET,
    UPDATE_EXTERNAL_ASSET_STATUS_SUCCESS,
    GET_EXTERNAL_ASSETS_LIST_REQUEST,
    UPDATE_EXTERNAL_ASSET_STATUS_REQUEST
} from '../../../reducers/product/external/constant';
import {listExternallAssetsRequestSaga} from './read';

export function* updateExternalAssetStatusRequestSaga(action) {
    try {
        yield put(loading(UPDATE_EXTERNAL_ASSET_STATUS_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.externalAssets.delete, {...payload});
        if (response && response.status === 201) {
            yield put(success(UPDATE_EXTERNAL_ASSET_STATUS_SUCCESS, response));
            yield* listExternallAssetsRequestSaga({
                type: GET_EXTERNAL_ASSETS_LIST_REQUEST
            });
            yield delay(2000);
            yield put({type: UPDATE_EXTERNAL_ASSET_STATUS_RESET});
        } else {
            yield put(error(UPDATE_EXTERNAL_ASSET_STATUS_ERROR, response));
            yield delay(2000);
            yield put({type: UPDATE_EXTERNAL_ASSET_STATUS_RESET});
        }
    } catch (err) {
        yield put(error(UPDATE_EXTERNAL_ASSET_STATUS_ERROR, err));
        yield delay(2000);
        yield put({type: UPDATE_EXTERNAL_ASSET_STATUS_RESET});
    }
}

export function* watchUpdateExternalAssetStatusData() {
    yield takeLatest(UPDATE_EXTERNAL_ASSET_STATUS_REQUEST, updateExternalAssetStatusRequestSaga);
}
