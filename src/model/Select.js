import { getProductsData } from '../Axios'
export default {
    namespace: 'sortProducts',
    state: {
        sortData: [],
        defaultData: [],
        chooseValue: "Default",
        selectResult: [],
    },
    effects: {
        *sort({ payload }, { call, put }) {
            const data = yield call(getProductsData, payload);
            const _sortData = data.data.products;
            const _chooseValue = payload.value;
            const _chooseSize = payload.chooseSize;
            const flag = payload.flag;
            let newResultId = [];
            _sortData.forEach(item => {
                if (item.availableSizes.indexOf(_chooseSize) > -1) {
                    newResultId.push(item.id)
                    return item.id
                }
            });
            console.log(newResultId, "id")
  
            const _newResult = _sortData.filter((item => {
                if (newResultId.indexOf(item.id) !== -1) {
                    return _sortData.push(item)
                }
                //    return  item

            }))
            yield put({
                type: "handleSort",
                payload: { _newResult, _chooseValue }
            });

        },

    },
    reducers: {
        handleSort: (state, { payload: { _newResult, _chooseValue } }) => {
            return {
                ...state,
                sortData: (_chooseValue === "Default" ? _newResult : (_chooseValue === "H-t-L" ? (_newResult.sort((a, b) => { return b.price - a.price })) : (_newResult.sort((a, b) => { return a.price - b.price })))),
            };
        },
    }
}