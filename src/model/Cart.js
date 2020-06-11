export default {
    namespace: "cartProducts",
    state: {
        cartList: []
    },
    effects: {
        *cart({ payload }, {  put }) {
            const { _products } = payload;
            yield put({
                type: "handleCart",
                payload: {
                    _products
                }
            });


        }
    },
    reducers: {
        handleCart: (state, { payload }) => {
            return {
                ...state,
                cartList: payload._products,
            };
        },
    }
}