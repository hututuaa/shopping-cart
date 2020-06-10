import { getProductsData } from '../Axios'
export default {
    namespace: 'sortProducts',
    state: {
        sortData: [],//原始数据
        defaultData: [],
        chooseValue: "Default",
        selectResult: [],
        clickSize: [],//去重之后尺码对应的id
        // cancelSize:[],
        // sumSizeId: [],
        // staticSize:[]//没有去重的尺码对应的id
    },
    effects: {
        *sort({ payload }, { put }) {
            const _chooseValue = payload.value;
            yield put({
                type: "handleSort",
                payload: { _chooseValue }
            });
        },
        *selectSize({ payload }, { put }) {
            const {_newResult,clickSize} = payload;
            yield put({
                type: "chooseSize",
                payload: { _newResult,clickSize}
            });
        }


    },
    reducers: {
        chooseSize: (state, { payload: {  _newResult,clickSize} }) => {
            return {
                ...state,
                sortData: _newResult,
                clickSize:clickSize,
            };
        },
        handleSort: (state, { payload: { _chooseValue } }) => {
            const _newResult = state.sortData;
            return {
                ...state,
                selectResult: (_chooseValue === "Default" ? _newResult : (_chooseValue === "H-t-L" ? (_newResult.sort((a, b) => { return b.price - a.price })) : (_newResult.sort((a, b) => { return a.price - b.price })))),
            };
        },
    }
}

