import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {productApi} from '../../../api/product';

import {
    DELETE_EXTERNAL_ASSET_LOADING,
    DELETE_EXTERNAL_ASSET_ERROR,
    DELETE_EXTERNAL_ASSET_RESET,
    DELETE_EXTERNAL_ASSET_SUCCESS,
    GET_EXTERNAL_ASSETS_LIST_REQUEST,
    DELETE_EXTERNAL_ASSET_REQUEST
} from '../../../reducers/product/external/constant';
import {listExternallAssetsRequestSaga} from './read';

export function* deleteExternalAssetRequestSaga(action) {
    try {
        yield put(loading(DELETE_EXTERNAL_ASSET_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.externalAssets.delete, {...payload});
        if (response && response.status === 201) {
            yield put(success(DELETE_EXTERNAL_ASSET_SUCCESS, response));
            yield* listExternallAssetsRequestSaga({
                type: GET_EXTERNAL_ASSETS_LIST_REQUEST
            });
            yield delay(2000);
            yield put({type: DELETE_EXTERNAL_ASSET_RESET});
        } else {
            yield put(error(DELETE_EXTERNAL_ASSET_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_EXTERNAL_ASSET_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_EXTERNAL_ASSET_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_EXTERNAL_ASSET_RESET});
    }
}

export function* watchDeleteExternalAssetData() {
    yield takeLatest(DELETE_EXTERNAL_ASSET_REQUEST, deleteExternalAssetRequestSaga);
}
