import { getProductsData } from '../Axios'
export default {
    namespace: 'sortProducts',
    state: {
        sortData: [],//原始数据
        defaultData: [],
        chooseValue: "Default",
        selectResult: [],
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
            const _newResult = payload._newResult;
            yield put({
                type: "chooseSize",
                payload: { _newResult }
            });
        }


    },
    reducers: {
        chooseSize: (state, { payload: { _newResult } }) => {
            return {
                ...state,
                sortData: _newResult,
            };
        },
        handleSort: (state, { payload: { _chooseValue } }) => {
            const _newResult = state.sortData;
            console.log(_newResult, "123")
            return {
                ...state,
                selectResult: (_chooseValue === "Default" ? _newResult : (_chooseValue === "H-t-L" ? (_newResult.sort((a, b) => { return b.price - a.price })) : (_newResult.sort((a, b) => { return a.price - b.price })))),
            };
        },
    }
}

