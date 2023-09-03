import {call, delay, put, takeLatest} from 'redux-saga/effects';

import {error, loading, success} from '../../actions/common';

import {
    CREATE_INTERNAL_ASSET_LOADING,
    CREATE_INTERNAL_ASSET_ERROR,
    CREATE_INTERNAL_ASSET_RESET,
    CREATE_INTERNAL_ASSET_REQUEST,
    CREATE_INTERNAL_ASSET_SUCCESS,
    GET_INTERNAL_ASSETS_LIST_REQUEST
} from '../../reducers/product/constant';
import {productApi} from '../../api/product';
import {listInternalAssetsRequestSaga} from './read';

export function* createInternalAssetRequestSaga(action) {
    try {
        yield put(loading(CREATE_INTERNAL_ASSET_LOADING, {loading: true}));
        const {payload} = action;
        const response = yield call(productApi.products.create, {...payload});
        if (response && response.status === 201) {
            yield put(success(CREATE_INTERNAL_ASSET_SUCCESS, response));
            yield* listInternalAssetsRequestSaga({
                type: GET_INTERNAL_ASSETS_LIST_REQUEST,
                payload: {
                    name: '',
                    status: ''
                }
            });
            yield delay(2000);
            yield put({type: CREATE_INTERNAL_ASSET_RESET});
        } else {
            yield put(error(CREATE_INTERNAL_ASSET_ERROR, response));
            yield delay(2000);
            yield put({type: CREATE_INTERNAL_ASSET_RESET});
        }
    } catch (err) {
        yield put(error(CREATE_INTERNAL_ASSET_ERROR, err));
        yield delay(2000);
        yield put({type: CREATE_INTERNAL_ASSET_RESET});
    }
}

export function* watchCreateInternalAssetData() {
    yield takeLatest(CREATE_INTERNAL_ASSET_REQUEST, createInternalAssetRequestSaga);
}
