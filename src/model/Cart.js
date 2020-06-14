export default {
    namespace: "cartProducts",
    state: {
        cartList: [],
        count: 0,
        sumPrice: 0,
        check: false,


    },
    effects: {
        *cart({ payload }, { select, put }) {
            const { _products } = payload;
            yield put({
                type: "handleCart",
                payload: {
                    _products
                }
            })

            yield put({
                type: "checkoutProducts",
            });

        },
        *checking({ payload }, { put }) {
            yield put({
                type: "handleCheck",
                payload: payload
            });
        },
        *setStorage({ payload }, { select, put }) {
            const storage = window.localStorage
            //从state拿到数据
            const stateArr = yield select(state => state)
            let { cartList, count, sumPrice } = stateArr.cartProducts;
            let data = JSON.stringify(cartList)
            let _count = count
            // let _subTotal = cartProducts.subTotal
            let _sumPrice = sumPrice
            storage.setItem("data", data)
            storage.setItem("count", _count)
            // storage.setItem("subTotal", _subTotal)
            storage.setItem("sumPrice", _sumPrice)
            yield put({
                type: "_setStorage",
                payload: {
                    data: JSON.parse(window.localStorage.data),
                    _count: window.localStorage.count,
                    // _subTotal: window.localStorage.subTotal,
                    _sumPrice: window.localStorage.sumPrice
                }
            });
        },
        *add({ payload }, { put }) {
            const { id, quantity, size } = payload;
            yield put({
                type: "addCount",
                payload: {
                    id,
                    quantity,
                    size
                }
            })
            yield put({
                type: 'subTotal',
            })

        },
        *delete({ payload }, { put }) {
            const { id, quantity, size } = payload;
            yield put({
                type: "minusCount",
                payload: {
                    id,
                    quantity,
                    size
                }
            });
            yield put({
                type: 'subTotal',
            })
        },
        *remove({ payload }, { put }) {
            const { id, size, quantity } = payload;

            yield put({
                type: "handleRemove",
                payload: {
                    id,
                    size,
                    quantity
                }
            })

            yield put({
                type: 'subTotal',
            })
        },
        *checked({ payload }, { put }) {

            yield put({
                type: "handleChecked",
                payload: payload
            })
            yield put({
                type: "removeCart",
                // payload: payload
            })
        }
    },
    reducers: {
        handleCart: (state, { payload }) => {
            const { _products } = payload
            return {
                ...state,
                cartList: [..._products],
            };
        },
        checkoutProducts: (state) => {
            const { cartList } = state
            let __checkPrice = 0;
            let __checkOut = 0;
            cartList.forEach(item => {
                __checkOut += item.quantity;
            })
            cartList.forEach(item => {
                __checkPrice += item.price * item.quantity
            })
            return {
                ...state,
                count: __checkOut,
                sumPrice: __checkPrice

            }
        },
        handleCheck: (state, { payload }) => {
            return {
                ...state,
                check: payload

            }
        },
        _setStorage: (state, { payload }) => {
            const { data, _count, _subTotal, _sumPrice } = payload;
            return {
                ...state,
                cartList: data,
                count: _count,
                sumPrice: _sumPrice,
                subTotal: _subTotal,
            }
        },
        addCount: (state, { payload }) => {
            const { id, quantity, size } = payload;
            const { cartList } = state
            let count = 0;
            cartList.forEach(item => {
                if (item.id === id && item.size === size) {
                    item.quantity = quantity;
                }
                count += item.quantity
            })
            return {
                ...state,
                cartList: cartList,
                count: count

            }
        },
        minusCount: (state, { payload }) => {
            const { id, quantity, size } = payload;
            const { cartList } = state
            let count = 0
            cartList.forEach(item => {
                if (item.id === id && item.size === size) {
                    item.quantity = quantity;
                    if (item.quantity <= 0) {
                        cartList.splice(cartList.findIndex((v) => { return v.id === id && v.size === size }), 1)
                    }
                }
                count += item.quantity
            })
            return {
                ...state,
                cartList: cartList,
                count: count,
            }
        },
        handleRemove(state, { payload }) {
            const { cartList } = state;
            const { id, size, quantity } = payload;
            let count = 0
            cartList.forEach(item => {
                if (item.id === id && item.size === size) {
                    item.quantity = quantity
                    cartList.splice(cartList.findIndex(item => item.id === id), 1)
                }
            })
            cartList.forEach(item => {
                count += item.quantity
            })
            return {
                ...state,
                cartList: cartList,
                count: count
            }
        },
        subTotal: (state) => {
            let subTotal = 0
            state.cartList.forEach(item => {
                subTotal = subTotal + item.price * item.quantity
            })
            return {
                ...state,
                sumPrice: subTotal
            }
        },
        handleChecked: (state, { payload }) => {
            return {
                ...state,
                check: payload
            }
        },
        removeCart: (state) => {
            return {
                ...state,
                cartList: [],
                count: 0,
                sumPrice: 0,
            }
        }

    },
}