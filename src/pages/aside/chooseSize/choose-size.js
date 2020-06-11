import React from 'react';
import './choose-size.css'
import { connect } from 'dva'
class ChooseSize extends React.Component {
    // state = {
    //     size: []
    // }
    select = (e) => {
        const { products, dispatch, sortProducts } = this.props;
        const chooseStyle = e.target.style;
        const chooseSize = e.target.innerText;
        const clickSize = sortProducts.clickSize;
        let newResultId = [];
        let _newResult = [];
        let filterResult = [];
        const newProducts = products.resData;
        newProducts.forEach(item => {
            if (item.availableSizes.indexOf(chooseSize) > -1) {
                newResultId.push(item.id)
                return item.id
            }
        });
        if (chooseStyle.color === "white") {
            chooseStyle.background = '#ccc';
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
            dispatch({
                type: 'sortProducts/selectSize',
                payload: { _newResult: _newResult, clickSize: clickSize, sumProducts: newProducts },

            })
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
            dispatch({
                type: 'sortProducts/selectSize',
                payload: {
                    _newResult: _newResult,
                    clickSize: clickSize,
                    // sumProducts: newProducts
                },

            })
        }


    }
    render() {
        const newSize = [];
        const sizeList = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];
        for (let i = 0; i < 7; i++) {
            newSize.push(<li onClick={this.select} key={i}>{sizeList[i]}</li>);
        }

        return (
            <div className="sizeBox">
                <h1>Sizes:</h1>
                <ul >
                    {newSize}
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(ChooseSize);