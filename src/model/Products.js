import {getProductsData} from '../Axios'
export default {
    namespace: 'products',
    state: {
        resData: []
    },
    effects: {
        *query({ payload }, { call, put }) {
            const data = yield call(getProductsData,payload);
            yield put({
                type: "setProducts",
                payload:data.data.products
            });


        }
    },
    reducers: {
        setProducts: (state, { payload }) => {
            // console.log(payload,"payload")
            return {
                ...state,
                resData: payload
            };
        },
    }
}