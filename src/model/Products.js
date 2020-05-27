import {getProductsData} from '../Axios'
export default {
    namespace: 'products',
    state: {
        resData: []
    },
    effect: {
        *query({ payload }, { call, put }) {
            const {res} = yield call(getProductsData);

            yield put({
                type: "setProducts",
                data: res.data.products
            });


        }
    },
    reducer: {
        setProducts: (state, { payload }) => {
            return {
                ...state,
                resData: payload.data
            };
        },
    }
}