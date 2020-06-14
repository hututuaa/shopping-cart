import { getProductsData } from '../Axios'
export default {
    namespace: 'products',
    state: {
        resData: [],
        sortData: [],//原始数据
        defaultData: [],
        chooseValue: "D-S",
        selectResult: [],
        clickSize: [],//选中的尺码
    },
    effects: {
        *query({ payload }, { call, put }) {
            const data = yield call(getProductsData, payload);
            if(data.status !== '200'){
                window.alert("数据请求失败,请稍等。。。。");
            }
        
            yield put({
                type: "setProducts",
                payload: data.data.products
            });


        },
        *sort({ payload }, { put }) {
            const _chooseValue = payload.value;
            console.log("11_chooseValue", _chooseValue)
            yield put({
                type: "handleSort",
                payload: { _chooseValue }
            });
        },
        *selectSize({ payload }, { select, put }) {
            const stateArr = yield select(state => state);
            const { resData, clickSize } = stateArr.products
            let newResultId = [];
            let _newResult = [];
            let filterResult = [];
            const { chooseStyle,chooseSize } = payload;
            const newProducts = resData;
            newProducts.forEach(item => {
                if (item.availableSizes.indexOf(chooseSize) > -1) {
                    newResultId.push(item.id)
                    return item.id
                }
            });
            if (chooseStyle.color === "white") {
                chooseStyle.background = 'white';
                chooseStyle.color = '#666';
                //取消选中的尺码
                clickSize.splice(clickSize.findIndex(v => v === chooseSize), 1)
                //由选中的尺码从全部的数据中去筛选取值
                newProducts.forEach(item => {
                    clickSize.findIndex(_item => {
                        if (item.availableSizes.indexOf(_item) > -1) {
                            _newResult.push(item)
                        }
                        return _newResult
                    })

                });
                function unique(arr) {
                    return Array.from(new Set(arr))
                }

                _newResult = unique(_newResult)
                // dispatch({
                //     type: 'products/selectSize',
                //     payload: { _newResult: _newResult, clickSize: clickSize, sumProducts: newProducts },

                // })
            } else {
                //增加选中的尺码
                clickSize.push(chooseSize);
                chooseStyle.background = '#1a94bc';
                chooseStyle.color = "white";
                //拿到所有的尺码对应的数据（未去重）
                newProducts.forEach(item => {
                    clickSize.forEach(_item => {
                        if (item.availableSizes.indexOf(_item) > -1) {
                            filterResult.push(item)
                        }
                    })

                });
                //去重
                function unique(arr) {
                    return Array.from(new Set(arr))
                }
                _newResult = unique(filterResult)
                // dispatch({
                //     type: 'products/selectSize',
                //     payload: {
                //         _newResult: _newResult,
                //         clickSize: clickSize,
                //     },

                // })
            }
            // const { _newResult, clickSize, sumProducts } = payload;
            yield put({
                type: "chooseSize",
                payload: { _newResult, clickSize, newProducts }
            });
        }
    },
    reducers: {
        setProducts: (state, { payload }) => {
            return {
                ...state,
                resData: payload
            };
        },
        chooseSize: (state, { payload: { _newResult, clickSize } }) => {
            return {
                ...state,
                sortData: _newResult,
                clickSize: clickSize,

            };
        },
        handleSort: (state, { payload: { _chooseValue } }) => {
            let { sortData } = state;
            return {
                ...state,
                chooseValue: _chooseValue,
                selectResult: (_chooseValue === "D-S" ? sortData : (_chooseValue === "H-t-L" ? (sortData.sort((a, b) => { return b.price - a.price })) : (sortData.sort((a, b) => { return a.price - b.price })))),

            };
        },
    }
}