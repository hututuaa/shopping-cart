export default {
    namespace: 'sortProducts',
    state: {
        sortData: [],//原始数据
        defaultData: [],
        chooseValue: "D-S",
        selectResult: [],
        clickSize: [],//选中的尺码
        // sumData:[]
    },
    effects: {
        *sort({ payload }, { put }) {
            const _chooseValue = payload.value;
            console.log("11_chooseValue", _chooseValue)
            yield put({
                type: "handleSort",
                payload: { _chooseValue }
            });
        },
        *selectSize({ payload }, { put }) {
            const { _newResult, clickSize, sumProducts } = payload;
            yield put({
                type: "chooseSize",
                payload: { _newResult, clickSize, sumProducts }
            });
        }


    },
    reducers: {
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

