// import {getProductsData} from '../Axios'
export default {
    namespace: "cartProducts",
    state: {
        cartList: [],
        count: 0,
        sumPrice: 0,
        check:null,
    },
    effects: {
        *cart({ payload }, { put }) {
            const { _products } = payload;
            yield put({
                type: "handleCart",
                payload: {
                    _products
                }
            });
        },
        *checkOut(payload, { put }) {
            yield put({
                type: "checkoutProducts",
            });
        },
        *checking({payload},{put}){
            yield put({
                type: "handleCheck",
                payload: payload
            });
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
            let checkPrice = [];
            let checkOut = cartList.map(item => {
                return item.quantity += 1;
            })
            checkPrice = cartList.map(item => {
                return checkPrice += item.price * item.quantity
            })
            console.log("checkOut", checkOut[0])
            console.log("checkPrice", (checkPrice[0]))
            return {
                ...state,
                count: checkOut[0],
                sumPrice: checkPrice[0]

            }
        },
        handleCheck:(state,{payload})=>{
          return{
              ...state,
              check:payload

          }

        }
    }
}