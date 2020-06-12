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
            const {_products} = payload
            return {
                ...state,
                cartList: [..._products],
            };
        },
    }
}