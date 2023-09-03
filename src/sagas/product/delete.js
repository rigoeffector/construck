import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    DELETE_INTERNAL_ASSET_LOADING,
    DELETE_INTERNAL_ASSET_ERROR,
    DELETE_INTERNAL_ASSET_RESET,
    DELETE_INTERNAL_ASSET_REQUEST,
    DELETE_INTERNAL_ASSET_SUCCESS,
    GET_INTERNAL_ASSETS_LIST_REQUEST
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';
import {listInternalAssetsRequestSaga} from './read';

export function* deleteInternalAssetRequestSaga(action) {
    try {
        yield put(loading(DELETE_INTERNAL_ASSET_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.delete, {...payload});
        if (response && response.status === 202) {
            yield put(success(DELETE_INTERNAL_ASSET_SUCCESS, response));
            yield* listInternalAssetsRequestSaga({
                type: GET_INTERNAL_ASSETS_LIST_REQUEST,
                payload: {
                    name: '',
                    status: ''
                }
            });

            yield delay(2000);
            yield put({type: DELETE_INTERNAL_ASSET_RESET});
        } else {
            yield put(error(DELETE_INTERNAL_ASSET_ERROR, response));
            yield delay(2000);
            yield put({type: DELETE_INTERNAL_ASSET_RESET});
        }
    } catch (err) {
        yield put(error(DELETE_INTERNAL_ASSET_ERROR, err));
        yield delay(2000);
        yield put({type: DELETE_INTERNAL_ASSET_RESET});
    }
}

export function* watchDeleteInternalAssetData() {
    yield takeLatest(DELETE_INTERNAL_ASSET_REQUEST, deleteInternalAssetRequestSaga);
}
