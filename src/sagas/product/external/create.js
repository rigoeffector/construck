import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../../actions/common';

import {productApi} from '../../../api/product';

import {
    CREATE_EXTERNAL_ASSET_LOADING,
    CREATE_EXTERNAL_ASSET_ERROR,
    CREATE_EXTERNAL_ASSET_RESET,
    CREATE_EXTERNAL_ASSET_SUCCESS,
    GET_EXTERNAL_ASSETS_LIST_REQUEST,
    CREATE_EXTERNAL_ASSET_REQUEST
} from '../../../reducers/product/external/constant';
import {listExternallAssetsRequestSaga} from './read';

export function* createExternalAssetRequestSaga(action) {
    try {
        yield put(loading(CREATE_EXTERNAL_ASSET_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.externalAssets.create, {...payload});
        if (response && response.status === 201) {
            yield put(success(CREATE_EXTERNAL_ASSET_SUCCESS, response));
            yield* listExternallAssetsRequestSaga({
                type: GET_EXTERNAL_ASSETS_LIST_REQUEST
            });
            yield delay(2000);
            yield put({type: CREATE_EXTERNAL_ASSET_RESET});
        } else {
            yield put(error(CREATE_EXTERNAL_ASSET_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_EXTERNAL_ASSET_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_EXTERNAL_ASSET_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_EXTERNAL_ASSET_RESET});
    }
}

export function* watchCreateExternalAssetData() {
    yield takeLatest(CREATE_EXTERNAL_ASSET_REQUEST, createExternalAssetRequestSaga);
}
